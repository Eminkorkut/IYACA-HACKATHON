'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Mentor {
    id: string
    avatar: string
    specialty: string

    topics: string[]
    rating: number
    totalSessions: number
    subcategory: string
}

export default function ActivitySupportPage() {
    const router = useRouter()
    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')

    // Get selected subcategory from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sub = localStorage.getItem('selectedSubcategory') || ''
            setSelectedSubcategory(sub)
        }
    }, [])

    const allMentors: Mentor[] = [
        {
            id: 'act-1',
            avatar: '⚽',
            specialty: 'Spor Antrenörü',

            topics: ['Futbol', 'Basketbol', 'Fitness', 'Takım Oyunları'],
            rating: 4.8,
            totalSessions: 198,
            subcategory: 'sports'
        },
        {
            id: 'act-2',
            avatar: '🎨',
            specialty: 'Sanat Öğretmeni',

            topics: ['Resim', 'Boyama', 'Heykel', 'Yaratıcı Sanatlar'],
            rating: 4.9,
            totalSessions: 234,
            subcategory: 'art'
        },
        {
            id: 'act-3',
            avatar: '🎵',
            specialty: 'Müzik Öğretmeni',

            topics: ['Piyano', 'Gitar', 'Şarkı', 'Ritim'],
            rating: 4.9,
            totalSessions: 267,
            subcategory: 'music'
        },
        {
            id: 'act-4',
            avatar: '✂️',
            specialty: 'El Sanatları Uzmanı',

            topics: ['Origami', 'Kağıt İşleri', 'Takı Yapımı', 'DIY Projeler'],
            rating: 4.7,
            totalSessions: 156,
            subcategory: 'crafts'
        },
        {
            id: 'act-5',
            avatar: '💻',
            specialty: 'Kodlama Eğitmeni',

            topics: ['Scratch', 'Python', 'Robotik', 'Oyun Yapımı'],
            rating: 5.0,
            totalSessions: 289,
            subcategory: 'coding'
        }
    ]

    // Filter mentors by subcategory if one is selected
    const mentors = selectedSubcategory
        ? allMentors.filter(m => m.subcategory === selectedSubcategory)
        : allMentors

    const handleSelectMentor = (mentorId: string) => {
        setSelectedMentorId(mentorId)
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedMentorId', mentorId)
            localStorage.setItem('selectedSupportType', 'activity')
        }
        setTimeout(() => {
            router.push('/child')
        }, 500)
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-rose-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-fuchsia-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10">
                <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/child" className="flex items-center space-x-3 group">
                                <Heart className="h-8 w-8 text-pink-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
                                <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Ümit Köprüsü</span>
                            </Link>
                            <Link
                                href="/child/select-subcategory?type=activity"
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
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 mb-6 shadow-2xl shadow-pink-500/40">
                            <Sparkles className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Aktivite Desteği
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Spor, sanat, müzik ve hobi aktiviteleri konusunda uzman eğitmenler
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor.id}
                                className={`group relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedMentorId === mentor.id
                                    ? 'ring-4 ring-pink-500 shadow-2xl shadow-pink-500/50'
                                    : 'bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-pink-500/50'
                                    }`}
                                onClick={() => handleSelectMentor(mentor.id)}
                            >
                                <div className="p-6">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-5xl shadow-2xl shadow-pink-500/40">
                                            {mentor.avatar}
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-2xl font-black text-white mb-2">{mentor.specialty}</h3>

                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < Math.floor(mentor.rating) ? 'text-yellow-400' : 'text-gray-600'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-400">({mentor.rating})</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-gray-400 mb-2">Uzmanlık Alanları:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {mentor.topics.map((topic, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="text-center">
                                            <p className="text-lg font-black text-pink-400">{mentor.totalSessions}</p>
                                            <p className="text-xs text-gray-400">Aktivite</p>
                                        </div>
                                    </div>

                                    <button
                                        className={`w-full mt-4 py-3 rounded-2xl font-bold transition-all ${selectedMentorId === mentor.id
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/50'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                                            }`}
                                    >
                                        {selectedMentorId === mentor.id ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <CheckCircle className="h-5 w-5" />
                                                Seçildi
                                            </span>
                                        ) : (
                                            'Seç'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 p-6 text-center">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <span className="font-bold text-pink-400">Aktivite Desteği:</span> Spor, sanat, müzik ve hobilerinde gelişmek için eğitmenlerle çalış, yeni beceriler öğren.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
