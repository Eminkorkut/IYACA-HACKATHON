'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, ArrowLeft, Brain, BookOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface SupportType {
    id: string
    title: string
    icon: React.ReactNode
    description: string
    details: string[]
    color: string
    route: string
}

export default function SelectSupportPage() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<string | null>(null)

    const supportTypes: SupportType[] = [
        {
            id: 'psychological',
            title: 'Psikolojik Destek',
            icon: <Brain className="h-12 w-12" />,
            description: 'Duygusal destek, stres yönetimi ve özgüven geliştirme',
            details: [
                'Duygusal destek ve dinleme',
                'Stres ve kaygı yönetimi',
                'Özgüven geliştirme',
                'Travma sonrası destek',
                'Sosyal beceri geliştirme'
            ],
            color: 'from-purple-500 to-purple-600',
            route: '/child/support/psychological'
        },
        {
            id: 'educational',
            title: 'Ders Desteği',
            icon: <BookOpen className="h-12 w-12" />,
            description: 'Matematik, fen, dil dersleri ve ödev yardımı',
            details: [
                'Matematik dersleri',
                'Fen bilimleri',
                'Dil dersleri (Türkçe, İngilizce)',
                'Ödev yardımı',
                'Sınav hazırlığı'
            ],
            color: 'from-blue-500 to-blue-600',
            route: '/child/support/educational'
        },
        {
            id: 'activity',
            title: 'Aktivite Desteği',
            icon: <Sparkles className="h-12 w-12" />,
            description: 'Spor, sanat, müzik ve hobi aktiviteleri',
            details: [
                'Spor ve fiziksel aktiviteler',
                'Sanat ve resim',
                'Müzik ve dans',
                'El sanatları',
                'Kodlama ve teknoloji'
            ],
            color: 'from-pink-500 to-pink-600',
            route: '/child/support/activity'
        }
    ]

    const handleSelectType = (type: SupportType) => {
        setSelectedType(type.id)
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedSupportType', type.id)
            // Clear previous subcategory and mentor selection when changing support type
            localStorage.removeItem('selectedSubcategory')
            localStorage.removeItem('selectedMentorId')
        }
        setTimeout(() => {
            // Navigate to subcategory selection instead of mentor selection
            router.push(`/child/select-subcategory?type=${type.id}`)
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
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 hover:text-white transition-all text-sm font-medium"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Geri</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Neye İhtiyacın Var?
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Sana en uygun destek türünü seç ve gönüllülerle bağlantı kur
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {supportTypes.map((type) => (
                            <div
                                key={type.id}
                                className={`group relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedType === type.id
                                    ? 'ring-4 ring-pink-500 shadow-2xl shadow-pink-500/50'
                                    : 'bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-pink-500/50'
                                    }`}
                                onClick={() => handleSelectType(type)}
                            >
                                <div className="p-8">
                                    <div className="flex justify-center mb-6">
                                        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-2xl`}>
                                            {type.icon}
                                        </div>
                                    </div>

                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-black text-white mb-2">{type.title}</h3>
                                        <p className="text-gray-400 text-sm">{type.description}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-gray-400 mb-3">Neler Yapılır:</p>
                                        <ul className="space-y-2">
                                            {type.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                                    <span className="text-pink-400 mt-1">•</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        className={`w-full mt-6 py-3 rounded-2xl font-bold transition-all ${selectedType === type.id
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        {selectedType === type.id ? 'Seçildi ✓' : 'Seç'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-6 text-center">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <span className="font-bold text-blue-400">İpucu:</span> Birden fazla destek türü seçebilirsin.
                            İhtiyacına göre farklı gönüllülerle çalışabilirsin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
