'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Heart, ArrowLeft, User, Save, Mail } from 'lucide-react'
import Link from 'next/link'

export default function VolunteerProfilePage() {
    const { user, login } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        expertise: user?.expertise || ''
    })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    if (!user || user.type !== 'volunteer') {
        router.push('/login')
        return null
    }

    const handleSave = () => {
        setSaving(true)
        setMessage('')

        // Update user in context
        login({
            ...user,
            fullName: formData.fullName,
            email: formData.email,
            expertise: formData.expertise
        })

        // Save to localStorage
        if (typeof window !== 'undefined') {
            const userData = JSON.parse(localStorage.getItem('user') || '{}')
            userData.fullName = formData.fullName
            userData.email = formData.email
            userData.expertise = formData.expertise
            localStorage.setItem('user', JSON.stringify(userData))
        }

        setTimeout(() => {
            setSaving(false)
            setMessage('Profil güncellendi! ✓')
            setTimeout(() => setMessage(''), 3000)
        }, 500)
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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
                                href="/volunteer"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 hover:text-white transition-all text-sm font-medium"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Geri</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl">
                                <User className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Profilini Düzenle
                        </h1>
                        <p className="text-xl text-gray-300">
                            Bilgilerini güncelleyebilirsin
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 mb-8 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-3">Ad Soyad</label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
                                placeholder="Ad Soyad"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-3">E-posta</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-3">Uzmanlık Alanı</label>
                            <select
                                value={formData.expertise}
                                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg [&>option]:bg-black [&>option]:text-white"
                            >
                                <option value="">Seçiniz</option>
                                <option value="Psikoloji">Psikoloji</option>
                                <option value="Eğitim">Eğitim</option>
                                <option value="Matematik">Matematik</option>
                                <option value="Fen Bilimleri">Fen Bilimleri</option>
                                <option value="Dil">Dil</option>
                                <option value="Sanat">Sanat</option>
                                <option value="Spor">Spor</option>
                                <option value="Müzik">Müzik</option>
                                <option value="Teknoloji">Teknoloji</option>
                                <option value="Genel">Genel</option>
                            </select>
                        </div>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 rounded-2xl bg-green-500/20 border border-green-500/50 text-green-400 text-center font-semibold">
                            {message}
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        <Save className="h-6 w-6" />
                        {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    )
}
