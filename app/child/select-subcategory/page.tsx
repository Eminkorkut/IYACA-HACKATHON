'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Heart, ArrowLeft, Brain, BookOpen, Sparkles, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Subcategory {
    id: string
    title: string
    description: string
}

const subcategories: Record<string, Subcategory[]> = {
    psychological: [
        { id: 'stress-management', title: 'Stres ve Kaygı Yönetimi', description: 'Stresle başa çıkma teknikleri' },
        { id: 'self-confidence', title: 'Özgüven Geliştirme', description: 'Kendine güven kazanma' },
        { id: 'social-skills', title: 'Sosyal Beceriler', description: 'İletişim ve arkadaşlık becerileri' },
        { id: 'trauma-support', title: 'Travma Sonrası Destek', description: 'Zor deneyimlerle başa çıkma' },
        { id: 'emotional-support', title: 'Duygusal Destek', description: 'Duyguları anlama ve ifade etme' }
    ],
    educational: [
        { id: 'mathematics', title: 'Matematik', description: 'Sayılar, geometri, problem çözme' },
        { id: 'science', title: 'Fen Bilimleri', description: 'Fizik, kimya, biyoloji' },
        { id: 'turkish', title: 'Türkçe', description: 'Okuma, yazma, dil bilgisi' },
        { id: 'english', title: 'İngilizce', description: 'Konuşma, kelime, gramer' },
        { id: 'social-studies', title: 'Sosyal Bilgiler', description: 'Tarih, coğrafya, vatandaşlık' }
    ],
    activity: [
        { id: 'sports', title: 'Spor ve Fiziksel Aktivite', description: 'Hareket, oyun, spor' },
        { id: 'art', title: 'Sanat ve Resim', description: 'Çizim, boyama, yaratıcılık' },
        { id: 'music', title: 'Müzik ve Dans', description: 'Şarkı, dans, ritim' },
        { id: 'crafts', title: 'El Sanatları', description: 'Yaratıcı projeler, el işi' },
        { id: 'coding', title: 'Kodlama ve Teknoloji', description: 'Programlama, robotik, oyun yapımı' }
    ]
}

const categoryInfo: Record<string, { title: string; icon: any; color: string }> = {
    psychological: { title: 'Psikolojik Destek', icon: Brain, color: 'from-purple-500 to-purple-600' },
    educational: { title: 'Ders Desteği', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    activity: { title: 'Aktivite Desteği', icon: Sparkles, color: 'from-pink-500 to-pink-600' }
}

export default function SelectSubcategoryPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supportType = searchParams.get('type') as string
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

    useEffect(() => {
        // Check if support type is valid
        if (!supportType || !subcategories[supportType]) {
            router.push('/child/select-support')
        }
    }, [supportType, router])

    if (!supportType || !subcategories[supportType]) {
        return null
    }

    const category = categoryInfo[supportType]
    const CategoryIcon = category.icon
    const subs = subcategories[supportType]

    const handleSelectSubcategory = (subcategoryId: string) => {
        setSelectedSubcategory(subcategoryId)

        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedSubcategory', subcategoryId)
        }

        // Navigate to mentor selection after a short delay
        setTimeout(() => {
            router.push(`/child/support/${supportType}`)
        }, 500)
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <Heart className="h-8 w-8 text-pink-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
                                <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Ümit Köprüsü</span>
                            </Link>
                            <Link
                                href="/child/select-support"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 hover:text-white transition-all text-sm font-medium"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Geri</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-5xl mx-auto px-6 py-12">
                    {/* Header with category info */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-2xl`}>
                                <CategoryIcon className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            {category.title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Hangi konuda yardım almak istersin?
                        </p>
                    </div>

                    {/* Subcategory Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {subs.map((sub) => (
                            <div
                                key={sub.id}
                                onClick={() => handleSelectSubcategory(sub.id)}
                                className={`group relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedSubcategory === sub.id
                                    ? 'ring-4 ring-pink-500 shadow-2xl shadow-pink-500/50'
                                    : 'bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-pink-500/50'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-black text-white">{sub.title}</h3>
                                        {selectedSubcategory === sub.id && (
                                            <CheckCircle className="h-6 w-6 text-pink-500 flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm">{sub.description}</p>

                                    <button
                                        className={`w-full mt-4 py-2 rounded-xl font-bold transition-all text-sm ${selectedSubcategory === sub.id
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        {selectedSubcategory === sub.id ? 'Seçildi ✓' : 'Seç'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-6 text-center">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <span className="font-bold text-blue-400">İpucu:</span> Bir konu seç, sonra sana yardımcı olacak mentörü seçebilirsin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
