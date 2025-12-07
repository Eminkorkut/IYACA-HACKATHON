'use client'

import { useState, useMemo, useEffect } from 'react'
import { Send, Shield, Mic, Phone, PhoneOff, Volume2, VolumeX, Heart, BarChart3, Zap, AlertCircle, TrendingUp, ArrowLeft, Brain, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'
import { mockChildren } from '@/data/mockData'
import { getAvatarEmoji } from '@/utils/avatarUtils'
import UserProfile from '@/components/UserProfile'

interface ChatMessageProps {
  message: string
  isOwn: boolean
}

const ChatMessage = ({ message, isOwn }: ChatMessageProps) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${isOwn
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

type SupportCategory = 'all' | 'psychological' | 'educational' | 'general'

export default function VolunteerDashboard() {
  const [selectedChildId, setSelectedChildId] = useState('child-1')
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>('all')
  const [messageInput, setMessageInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isChildTyping, setIsChildTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [communicationMode, setCommunicationMode] = useState('message')
  const [isCallActive, setIsCallActive] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVolumeMuted, setIsVolumeMuted] = useState(false)

  // Category-specific messages
  const categoryMessages = {
    psychological: [
      { id: 1, text: 'Merhaba, bugün kendimi biraz üzgün hissediyorum...', isOwn: false },
      { id: 2, text: 'Merhaba, seni dinliyorum. Ne oldu, anlatmak ister misin?', isOwn: true },
      { id: 3, text: 'Okulda arkadaşlarımla sorun yaşadım. Kendimi yalnız hissediyorum.', isOwn: false },
      { id: 4, text: 'Anlıyorum, bu zor bir durum. Seninle konuşmak için buradayım.', isOwn: true },
    ],
    educational: [
      { id: 1, text: 'Matematik ödevimde yardıma ihtiyacım var.', isOwn: false },
      { id: 2, text: 'Tabii! Hangi konuda zorlanıyorsun?', isOwn: true },
      { id: 3, text: 'Kesirler konusunu anlamıyorum.', isOwn: false },
      { id: 4, text: 'Tamam, adım adım açıklayayım. Kesirler aslında çok kolay!', isOwn: true },
    ],
    general: [
      { id: 1, text: 'Merhaba! Bugün nasılsın?', isOwn: false },
      { id: 2, text: 'İyiyim, teşekkürler. Sen nasılsın?', isOwn: true },
      { id: 3, text: 'Ben de iyiyim. Bugün neler yaptın?', isOwn: false },
      { id: 4, text: 'Okula gittim, sonra biraz kitap okudum. Sen ne yapıyorsun?', isOwn: true },
    ]
  }

  const [messages, setMessages] = useState(categoryMessages.psychological)

  // Categories for filtering
  const categories = [
    { id: 'all' as SupportCategory, name: 'Tümü', icon: Users, color: 'gray' },
    { id: 'psychological' as SupportCategory, name: 'Psikolojik', icon: Brain, color: 'purple' },
    { id: 'educational' as SupportCategory, name: 'Ders', icon: BookOpen, color: 'blue' },
    { id: 'general' as SupportCategory, name: 'Genel', icon: Heart, color: 'pink' }
  ]

  // Filter children by category
  const filteredChildren = useMemo(() => {
    const childrenWithStatus = mockChildren.map(child => ({
      ...child,
      status: child.id === 'child-3' ? 'away' : 'online' as 'online' | 'away',
      // Anonymous name based on support type
      anonymousName: child.supportType === 'psychological' ? 'Psikoloji Üyesi' :
        child.supportType === 'educational' ? 'Ders Üyesi' :
          'Genel Üye'
    }))

    if (selectedCategory === 'all') {
      return childrenWithStatus
    }
    return childrenWithStatus.filter(child => child.supportType === selectedCategory)
  }, [selectedCategory])

  const selectedChild = filteredChildren.find(c => c.id === selectedChildId) || filteredChildren[0]

  // Update messages when child changes
  useEffect(() => {
    if (selectedChild) {
      const categoryKey = selectedChild.supportType as keyof typeof categoryMessages
      setMessages(categoryMessages[categoryKey])
    }
  }, [selectedChildId])

  // Get stress level from mock data based on child
  const getStressLevel = () => {
    const childData = mockChildren.find(c => c.id === selectedChildId)
    if (childData?.id === 'child-1') return 45 // Medium stress
    if (childData?.id === 'child-2') return 85 // High stress
    if (childData?.id === 'child-3') return 25 // Low stress
    return 40
  }

  const stressLevel = getStressLevel()

  // Get suggestions based on stress level
  const getSuggestions = () => {
    if (stressLevel > 70) {
      return [
        '⚠️ Stres seviyesi çok yüksek! Çok kibar ve yumuşak bir dil kullanın.',
        'Daha kibar konuşun, sert tonlardan kaçının.',
        '"Nasıl yardımcı olabilirim?" gibi açık uçlu sorular sorun.',
        'Sabırlı olun, çocuğa zaman tanıyın.',
        'Çocuğun duygularını doğrulayın ve güven verin.'
      ]
    } else if (stressLevel > 50) {
      return [
        'Stres seviyesi orta seviyede. Dikkatli ve anlayışlı olun.',
        'Nazik bir dil kullanın, destekleyici olun.',
        'Çocuğun kendini ifade etmesine izin verin.',
        'Kendi deneyimlerinizi paylaşarak normalleştirin.'
      ]
    } else {
      return [
        'Stres seviyesi düşük. Pozitif bir konuşma sürdürün.',
        'Çocuğun olumlu deneyimlerini paylaşmasını teşvik edin.',
        'Güçlü yönlerini vurgulayın ve takdir edin.',
        'Çocuk iyi görünüyor. Motivasyonunu destekleyin.'
      ]
    }
  }

  const suggestions = getSuggestions()

  // Call timer effect - starts from 00:00
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      setCallDuration(0) // Reset when call ends
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCallActive])

  // Format call duration as MM:SS
  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMsg = { id: messages.length + 1, text: messageInput, isOwn: true }
    setMessages([...messages, newMsg])
    setIsTyping(true)
    setMessageInput('')

    setTimeout(() => {
      setIsTyping(false)
      setIsChildTyping(true)
      setTimeout(() => setIsChildTyping(false), 2000 + Math.random() * 2000)
    }, 800)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && !isChildTyping && !isTyping) {
        setIsChildTyping(true)
        setTimeout(() => setIsChildTyping(false), 1500 + Math.random() * 1500)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [isChildTyping, isTyping])

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center space-x-3 group">
                  <Heart className="h-8 w-8 text-pink-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
                  <span className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Ümit Köprüsü</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-gray-300">
                  Mentör Panosu
                </div>
                <UserProfile />
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-[1600px] mx-auto px-6 py-6 min-h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Sidebar - Children List */}
            <div className="col-span-12 lg:col-span-3 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl flex flex-col">
              {/* Category Tabs */}
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Destek Türü</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isActive = selectedCategory === category.id
                    const colorClasses = {
                      gray: isActive ? 'bg-gray-500/20 border-gray-500' : 'border-gray-500/30 hover:border-gray-500/50',
                      purple: isActive ? 'bg-purple-500/20 border-purple-500' : 'border-purple-500/30 hover:border-purple-500/50',
                      blue: isActive ? 'bg-blue-500/20 border-blue-500' : 'border-blue-500/30 hover:border-blue-500/50',
                      pink: isActive ? 'bg-pink-500/20 border-pink-500' : 'border-pink-500/30 hover:border-pink-500/50'
                    }

                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${colorClasses[category.color as keyof typeof colorClasses]
                          } ${isActive ? 'shadow-lg' : ''}`}
                      >
                        <Icon className={`h-5 w-5 ${category.color === 'gray' ? 'text-gray-400' :
                          category.color === 'purple' ? 'text-purple-400' :
                            category.color === 'blue' ? 'text-blue-400' :
                              'text-pink-400'
                          }`} />
                        <span className="text-xs font-semibold text-white">{category.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Children List */}
              <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                {filteredChildren.map((child) => {
                  const supportColors = {
                    psychological: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
                    educational: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
                    general: 'from-pink-500/20 to-pink-600/20 border-pink-500/30'
                  }

                  const supportIcons = {
                    psychological: Brain,
                    educational: BookOpen,
                    general: Heart
                  }

                  const SupportIcon = supportIcons[child.supportType]

                  return (
                    <button
                      key={child.id}
                      onClick={() => setSelectedChildId(child.id)}
                      className={`w-full p-4 rounded-2xl transition-all duration-300 text-left group ${selectedChildId === child.id
                        ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {getAvatarEmoji(child.avatar)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-white text-sm">{child.anonymousName}</p>
                            <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${supportColors[child.supportType]} border flex items-center gap-1`}>
                              <SupportIcon className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className={`w-2 h-2 rounded-full ${child.status === 'online' ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                            <p className="text-xs text-gray-400">{child.status === 'online' ? 'Çevrimiçi' : 'Uzakta'}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Center - Chat or Call Area */}
            <div className="col-span-12 lg:col-span-6 flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl min-h-[700px]">
              {communicationMode === 'call' ? (
                /* Voice Call Interface */
                <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-5xl shadow-2xl border-4 border-white/20">
                      {getAvatarEmoji(selectedChild.avatar)}
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white mb-2">{selectedChild.anonymousName}</h2>
                    <p className="text-gray-400">Arama süresi: {formatTime(callDuration)}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-green-400 font-semibold">Bağlantı Aktif</p>
                    </div>
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
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-pink-500/40">
                            {getAvatarEmoji(selectedChild.avatar)}
                          </div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h2 className="text-3xl font-black text-white mb-2">{selectedChild.anonymousName}</h2>
                          <p className="text-xs text-gray-400 flex items-center space-x-1">
                            {isChildTyping ? (
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

                      <button
                        onClick={() => setCommunicationMode('call')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 font-bold shadow-lg"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Sesli</span>
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg.text} isOwn={msg.isOwn} />
                    ))}

                    {isChildTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-white/10 rounded-2xl rounded-bl-none px-4 py-3 border border-white/20">
                          <TypingIndicator />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Safety Check */}
                  {isTyping && (
                    <div className="px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-t border-green-500/20">
                      <div className="flex items-center space-x-2 text-sm text-green-300 font-medium">
                        <Shield className="h-5 w-5 animate-pulse" />
                        <span>AI Analiz: Güvenli</span>
                        <span className="text-xs opacity-70">(Gerçek zamanlı)</span>
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                    <div className="flex items-center space-x-3 mb-3">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-3 rounded-xl transition-all transform hover:scale-110 flex-shrink-0 ${isRecording
                          ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                          }`}
                      >
                        <Mic className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={isRecording ? "🎤 Konuşuyorsunuz..." : "Mesajınızı yazın..."}
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

            {/* Right Sidebar - AI Co-Pilot */}
            <div className="col-span-12 lg:col-span-3 rounded-3xl p-6 overflow-y-auto shadow-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl min-h-[700px]">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-black text-lg text-white mb-1">AI Asistan</h3>
                  <p className="text-sm text-gray-400">Gerçek zamanlı rehberlik</p>
                </div>

                {/* Stress Level */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-pink-400" />
                      Stres Seviyesi
                    </p>
                    <span className="text-xl font-black text-pink-400">{stressLevel}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-yellow-500 transition-all duration-300"
                      style={{ width: `${stressLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">Çocuk sakin durumda</p>
                </div>

                {/* Safety Status */}
                <div className="rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-green-300 text-sm mb-1">Konuşma Güvenli</p>
                      <p className="text-xs text-green-300/70">Toksisite algılanmadı</p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <p className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Öneriler
                  </p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, idx) => (
                      <div key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-all cursor-pointer">
                        <p className="text-xs text-gray-300 leading-relaxed">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert Section */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-blue-300 text-sm mb-1">Profil İncelemesi</p>
                      <p className="text-xs text-blue-300/70">Son 5 dakikada 3 pozitif etkileşim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}