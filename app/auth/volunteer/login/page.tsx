'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowRight, Users, Mail, Lock, AlertCircle } from 'lucide-react'
import FormInput from '@/components/FormInput'
import { useAuth } from '@/contexts/AuthContext'

export default function VolunteerLoginPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/volunteer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Giriş başarısız')
            }

            // Use AuthContext to save session
            login({
                id: data.volunteer.id,
                email: data.volunteer.email,
                fullName: data.volunteer.fullName,
                type: 'volunteer'
            })

            // Redirect to volunteer dashboard
            router.push('/volunteer')

        } catch (err: any) {
            setError(err.message || 'Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4 py-12">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-rose-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <Heart className="h-8 w-8 text-pink-400 animate-pulse" fill="currentColor" />
                        <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Ümit Köprüsü
                        </span>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                        <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                            Gönüllü Girişi
                        </span>
                    </h1>
                    <p className="text-gray-400">Hesabınıza giriş yapın</p>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/50 p-6">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                            <p className="text-red-400 font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-8 space-y-6">
                    <FormInput
                        label="Email"
                        type="email"
                        required
                        icon={<Mail className="h-5 w-5" />}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@email.com"
                    />

                    <FormInput
                        label="Şifre"
                        type="password"
                        required
                        icon={<Lock className="h-5 w-5" />}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Giriş yapılıyor...</span>
                            </>
                        ) : (
                            <>
                                <Users className="h-5 w-5" />
                                <span>Giriş Yap</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-4 border-t border-white/10 space-y-3">
                        <p className="text-gray-400">
                            Hesabınız yok mu?{' '}
                            <Link href="/auth/volunteer/register" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                                Kayıt Ol
                            </Link>
                        </p>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 font-medium transition-colors group">
                            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            <span>Ana Sayfaya Dön</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
