'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Send, AlertTriangle, Heart, Mic, Phone, PhoneOff, X, Volume2, VolumeX, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getAllAvatars, getAvatarEmoji } from '@/utils/avatarUtils'
import UserProfile from '@/components/UserProfile'
import { containsProfanity, getProfanityWarningMessage } from '@/utils/profanityFilter'

interface ChatMessageProps {
  message: string
  isOwn: boolean
}

const ChatMessage = ({ message, isOwn }: ChatMessageProps) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${isOwn
      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-br-none'
      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/20'
      }`}>
      <p className="text-sm md:text-base">{message}</p>
    </div>
  </div>
)

const TypingIndicator = () => (
  <div className="flex space-x-2">
    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
)

// Initial greeting messages from mentor
const GREETING_MESSAGES = [
  { id: 0, text: 'Merhaba! Nasılsın?', isOwn: false },
  { id: 1, text: 'Bugün sana nasıl yardımcı olabilirim?', isOwn: false },
]

export default function ChildInterface() {
  const router = useRouter()
  const [messageInput, setMessageInput] = useState('')
  const [showPanicModal, setShowPanicModal] = useState(false)
  const [showProfanityWarning, setShowProfanityWarning] = useState(false)
  const [isMentorTyping, setIsMentorTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [communicationMode, setCommunicationMode] = useState('message')
  const [isCallActive, setIsCallActive] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVolumeMuted, setIsVolumeMuted] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    // Get avatar from localStorage if exists
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedAvatar') || 'superman'
    }
    return 'superman'
  })
  const [showAvatarSelector, setShowAvatarSelector] = useState(() => {
    // Show avatar selector only if avatar is not selected yet
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('selectedAvatar')
    }
    return true
  })
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)
  const [isCheckingMentor, setIsCheckingMentor] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate memorable name with combination (e.g., "GüneşKaplanı", "AyFaresi")
  const [childName] = useState(() => {
    const firstParts = ['Güneş', 'Ay', 'Yıldız', 'Deniz', 'Bulut', 'Rüzgar', 'Gökkuşağı', 'Yıldırım', 'Kartal', 'Aslan', 'Kaplan', 'Ejder', 'Kelebek', 'Gül', 'Çiçek', 'Yaprak', 'Meşe', 'Çınar', 'Zeytin', 'Nar']
    const secondParts = ['Kaplanı', 'Faresi', 'Kedisi', 'Kuşu', 'Balığı', 'Yıldızı', 'Çiçeği', 'Ağacı', 'Bulutu', 'Rüzgarı', 'Denizi', 'Ayı', 'Güneşi', 'Yıldırımı', 'Kartalı', 'Aslanı', 'Ejderi', 'Kelebeği', 'Gülü', 'Çiçeği']
    const first = firstParts[Math.floor(Math.random() * firstParts.length)]
    const second = secondParts[Math.floor(Math.random() * secondParts.length)]
    return `${first}${second}`
  })

  // Initialize messages with greeting or load from localStorage
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages')
      if (savedMessages) {
        try {
          return JSON.parse(savedMessages)
        } catch (e) {
          console.error('Error parsing saved messages:', e)
        }
      }
    }
    // Return greeting messages if no saved messages
    return GREETING_MESSAGES
  })


  const avatars = getAllAvatars()

  const getAvatarEmojiById = (avatarId: string) => {
    return getAvatarEmoji(avatarId)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Check if mentor is selected, if not redirect to selection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supportType = localStorage.getItem('selectedSupportType')
      const subcategory = localStorage.getItem('selectedSubcategory')
      const mentorId = localStorage.getItem('selectedMentorId')

      if (!supportType) {
        // No support type selected, go to support selection
        router.push('/child/select-support')
      } else if (!subcategory) {
        // Support type selected but no subcategory, go to subcategory selection
        router.push(`/child/select-subcategory?type=${supportType}`)
      } else if (!mentorId) {
        // Subcategory selected but no mentor, go to mentor selection
        router.push(`/child/support/${supportType}`)
      } else {
        // All set, show dashboard
        setSelectedMentor(mentorId)
        setIsCheckingMentor(false)
      }
    }
  }, [router])

  // Call duration timer - Reset when call starts
  useEffect(() => {
    if (communicationMode === 'call' && !isCallActive) {
      setCallDuration(0) // Reset to 0 when call starts
      setIsCallActive(true)
    } else if (communicationMode !== 'call') {
      setIsCallActive(false)
      setCallDuration(0)
    }
  }, [communicationMode, isCallActive])

  // Call duration timer - Count up when call is active
  useEffect(() => {
    if (!isCallActive || communicationMode !== 'call') {
      setCallDuration(0)
      return
    }

    // Reset to 0 first, then start counting
    setCallDuration(0)

    // Start interval
    const interval = setInterval(() => {
      setCallDuration(prev => {
        // If somehow prev is not 0 on first run, reset it
        if (prev === 0) {
          return 1
        }
        return prev + 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isCallActive, communicationMode])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isMentorTyping])

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !isRecording) return

    // Check for profanity
    if (containsProfanity(messageInput)) {
      setShowProfanityWarning(true)
      setMessageInput('')
      return
    }

    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      isOwn: true
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setMessageInput('')

    // Show typing indicator
    setIsMentorTyping(true)

    try {
      // Call AI API for mentor response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage.text,
          conversationHistory: updatedMessages.slice(-10) // Send last 10 messages for context
        }),
      })

      const data = await response.json()

      if (response.ok && data.response) {
        // Add AI response to messages
        setTimeout(() => {
          setIsMentorTyping(false)
          setMessages((prev: typeof messages) => [...prev, {
            id: prev.length + 1,
            text: data.response,
            isOwn: false
          }])
        }, 500 + Math.random() * 1000) // Random delay for natural feel
      } else {
        // Fallback response if API fails
        setTimeout(() => {
          setIsMentorTyping(false)
          setMessages((prev: typeof messages) => [...prev, {
            id: prev.length + 1,
            text: 'Anlıyorum. Devam et, seni dinliyorum.',
            isOwn: false
          }])
        }, 1000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback response on error
      setTimeout(() => {
        setIsMentorTyping(false)
        setMessages((prev: typeof messages) => [...prev, {
          id: prev.length + 1,
          text: 'Anlıyorum. Devam et, seni dinliyorum.',
          isOwn: false
        }])
      }, 1000)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.75 && !isMentorTyping) {
        setIsMentorTyping(true)
        setTimeout(() => setIsMentorTyping(false), 2000 + Math.random() * 2000)
      }
    }, 12000)
    return () => clearInterval(interval)
  }, [isMentorTyping])

  // Additional effect for call mode activation (if needed)
  useEffect(() => {
    if (communicationMode === 'call' && !isCallActive) {
      setIsCallActive(true)
    }
  }, [communicationMode, isCallActive])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setCommunicationMode('message')
  }

  // Don't render if checking mentor or no mentor selected
  if (isCheckingMentor || !selectedMentor) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center space-x-3 group">
                <Heart className="h-8 w-8 text-pink-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
                <span className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Ümit Köprüsü</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-gray-300">
                  {childName}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/child/select-support"
                    className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 hover:text-purple-200 transition-all text-sm font-medium"
                  >
                    Destek Türünü Değiştir
                  </Link>
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Avatar Selector Modal */}
        {showAvatarSelector && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
            <div className="rounded-3xl p-8 max-w-2xl w-full shadow-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black mb-2">Süperkahramanını Seç! 🦸</h3>
                <p className="text-gray-400">Seni temsil edecek süperkahramanı seç</p>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 max-h-[500px] overflow-y-auto">
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => {
                      setSelectedAvatar(avatar.id)
                      // Save avatar to localStorage
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('selectedAvatar', avatar.id)
                      }
                      setShowAvatarSelector(false)
                      // Redirect to mentor selection page
                      setTimeout(() => {
                        router.push('/child/select-mentor')
                      }, 300)
                    }}
                    className={`p-4 rounded-2xl transition-all transform hover:scale-110 group ${selectedAvatar === avatar.id
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/50 border-2 border-white scale-110'
                      : 'bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40'
                      }`}
                  >
                    <div className="text-5xl mb-2 group-hover:scale-125 transition-transform">{avatar.emoji}</div>
                    <div className={`text-xs font-semibold ${selectedAvatar === avatar.id ? 'text-white' : 'text-gray-300'
                      }`}>
                      {avatar.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Gamified Header */}
          <div className="rounded-3xl p-8 mb-6 shadow-xl text-center bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl shadow-2xl shadow-pink-500/40">
                  {getAvatarEmojiById(selectedAvatar)}
                </div>
                <button
                  onClick={() => setShowAvatarSelector(true)}
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-110 transition-all shadow-lg flex items-center justify-center"
                  title="Avatar Değiştir"
                >
                  ✏️
                </button>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
            </div>
            <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Merhaba {childName}!</h2>
            <p className="text-gray-300 text-lg">Güvenli alanına hoş geldin. Burada özgürce konuşabilirsin. ❤️</p>
          </div>

          {/* Communication Mode Toggle */}
          <div className="flex gap-3 mb-6 justify-center">
            <button
              onClick={() => setCommunicationMode('message')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${communicationMode === 'message'
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                }`}
            >
              <Send className="h-5 w-5" />
              <span>Yazışma</span>
            </button>
            <button
              onClick={() => setCommunicationMode('call')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${communicationMode === 'call'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                }`}
            >
              <Phone className="h-5 w-5" />
              <span>Sesli Arama</span>
            </button>
          </div>

          {/* Chat or Call Area */}
          <div className="rounded-3xl overflow-hidden mb-6 min-h-[600px] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col">
            {communicationMode === 'call' ? (
              /* Voice Call Interface */
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-7xl shadow-2xl">
                    💜
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold">Gönüllü ile Görüşülüyor</h3>
                  <p className="text-gray-400 text-2xl font-mono">{formatTime(callDuration)}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full transition-all ${isMuted
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                      }`}
                  >
                    <Mic className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsVolumeMuted(!isVolumeMuted)}
                    className={`p-4 rounded-full transition-all ${isVolumeMuted
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                      }`}
                  >
                    {isVolumeMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </button>
                  <button
                    onClick={handleEndCall}
                    className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all hover:scale-110"
                  >
                    <PhoneOff className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                          <Heart className="h-7 w-7 text-white" fill="white" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">Gönüllü</h3>
                        <p className="text-xs text-gray-400 flex items-center space-x-1">
                          {isMentorTyping ? (
                            <>
                              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                              <span className="font-medium">Yazıyor...</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                              <span className="font-medium">Çevrimiçi</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg: { id: number; text: string; isOwn: boolean }) => (
                    <ChatMessage key={msg.id} message={msg.text} isOwn={msg.isOwn} />
                  ))}

                  {isMentorTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white/10 rounded-2xl rounded-bl-none px-4 py-3 border border-white/20">
                        <TypingIndicator />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                  <div className="flex items-center space-x-3 mb-3">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-3 rounded-xl transition-all transform hover:scale-110 flex-shrink-0 ${isRecording
                        ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        }`}
                      title="Sesli mesaj gönder"
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isRecording ? "🎤 Konuşuyorsun..." : "Mesajını yaz veya konuş..."}
                      className="flex-1 px-5 py-3 rounded-2xl border border-white/20 bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim() && !isRecording}
                      className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all transform hover:scale-110 shadow-lg disabled:shadow-none flex-shrink-0 disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-700"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                  {isRecording && (
                    <div className="flex items-center space-x-2 text-sm text-red-400 font-medium">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Ses kaydı alınıyor...</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Panic Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowPanicModal(true)
              }}
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg shadow-red-500/50 font-bold"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Rahatsız Hissettim</span>
            </button>
          </div>
        </div>

        {/* Panic Modal */}
        {showPanicModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
            <div className="rounded-3xl p-8 max-w-md w-full shadow-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
              <button
                onClick={() => setShowPanicModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Yardım İsteği
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Rahatsız hissettiğin için üzgünüm. Yardım ekibimiz bilgilendirildi ve en kısa sürede seninle iletişime geçecekler.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowPanicModal(false)
                    // Clear selected mentor and subcategory, redirect to subcategory selection
                    if (typeof window !== 'undefined') {
                      const supportType = localStorage.getItem('selectedSupportType') || 'psychological'
                      localStorage.removeItem('selectedMentorId')
                      localStorage.removeItem('selectedSubcategory')
                      router.push(`/child/select-subcategory?type=${supportType}`)
                    }
                  }}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all font-bold shadow-lg"
                >
                  Yeni Gönüllü Seç
                </button>
                <button
                  onClick={() => setShowPanicModal(false)}
                  className="w-full px-6 py-3 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20 transition-all font-bold"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profanity Warning Modal */}
        {showProfanityWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
            <div className="rounded-3xl p-8 max-w-md w-full shadow-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Uyarı
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {getProfanityWarningMessage()}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setShowProfanityWarning(false)}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all font-bold shadow-lg"
                >
                  Anladım
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}