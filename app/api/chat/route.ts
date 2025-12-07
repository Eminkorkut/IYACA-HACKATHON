import { NextRequest, NextResponse } from 'next/server'
import { containsProfanity, getProfanityWarningMessage } from '@/utils/profanityFilter'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { message, conversationHistory } = body

        // Validate message
        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Geçersiz mesaj' },
                { status: 400 }
            )
        }

        // Check for profanity (server-side validation)
        if (containsProfanity(message)) {
            return NextResponse.json(
                { error: getProfanityWarningMessage(), isProfanity: true },
                { status: 400 }
            )
        }

        // Get Gemini API key from environment
        const apiKey = process.env.GEMINI_API_KEY

        if (!apiKey) {
            console.error('GEMINI_API_KEY not found in environment variables')
            // Return fallback response
            return NextResponse.json({
                response: 'Anlıyorum. Devam et, seni dinliyorum.',
                isFallback: true
            })
        }

        // Prepare conversation context
        const conversationContext = conversationHistory
            ? conversationHistory.map((msg: any) => ({
                role: msg.isOwn ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }))
            : []

        // Add current message
        conversationContext.push({
            role: 'user',
            parts: [{ text: message }]
        })

        // Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: conversationContext,
                    systemInstruction: {
                        parts: [{
                            text: `Sen bir çocuk destek platformunda gönüllü bir mentörsün. Görevin çocuklara duygusal destek sağlamak ve onları dinlemek.

KURALLAR:
1. Her zaman nazik, anlayışlı ve destekleyici ol
2. Çocuğun yaşına uygun basit bir dil kullan
3. Kısa ve öz cevaplar ver (maksimum 2-3 cümle)
4. Empati göster ve çocuğun duygularını doğrula
5. Asla yargılama, eleştirme veya suçlama
6. Profesyonel yardım gerektiren durumlarda (intihar, şiddet, istismar) çocuğu yetişkinlerle konuşmaya teşvik et
7. Sadece "Merhaba nasılsın?" gibi basit sorulara cevap ver
8. Çocuk hakaret ederse veya uygunsuz davranırsa nazikçe uyar

CEVAP TARZI:
- Sıcak ve samimi
- Destekleyici ve umut verici
- Çocuğun duygularını önemseyen
- Açık uçlu sorular soran (çocuğu konuşmaya teşvik eden)

Örnek iyi cevaplar:
- "Merhaba! İyiyim, sorduğun için teşekkürler. Sen nasılsın? Bugün nasıl geçti?"
- "Anlıyorum, bu gerçekten zor olmalı. Bana daha fazla anlatmak ister misin?"
- "Seninle konuşmak güzel. Ne hissediyorsun?"

Şimdi çocuğun mesajına uygun şekilde cevap ver.`
                        }]
                    },
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 200,
                    },
                    safetySettings: [
                        {
                            category: 'HARM_CATEGORY_HARASSMENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_HATE_SPEECH',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        }
                    ]
                }),
            }
        )

        if (!response.ok) {
            console.error('Gemini API error:', response.status, response.statusText)
            // Return fallback response
            return NextResponse.json({
                response: 'Anlıyorum. Devam et, seni dinliyorum.',
                isFallback: true
            })
        }

        const data = await response.json()

        // Extract response text
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (!aiResponse) {
            // Return fallback response
            return NextResponse.json({
                response: 'Anlıyorum. Devam et, seni dinliyorum.',
                isFallback: true
            })
        }

        return NextResponse.json({
            response: aiResponse,
            isFallback: false
        })

    } catch (error) {
        console.error('Chat API error:', error)
        // Return fallback response on error
        return NextResponse.json({
            response: 'Anlıyorum. Devam et, seni dinliyorum.',
            isFallback: true
        })
    }
}
