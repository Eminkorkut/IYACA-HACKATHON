'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowRight, Baby, User, Lock, Mail, Cake, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import FormInput from '@/components/FormInput'
import { useAuth } from '@/contexts/AuthContext'

const superheroes = ['🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️', '🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️']

export default function ChildRegisterPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        age: '',
        parentEmail: '',
        parentConsent: false,
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [randomHero] = useState(() => superheroes[Math.floor(Math.random() * superheroes.length)])

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.username) newErrors.username = 'Kullanıcı adı gereklidir'
        else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Sadece harf, rakam ve alt çizgi kullanabilirsin'
        }

        if (!formData.password) newErrors.password = 'Şifre gereklidir'
        else if (formData.password.length < 6) {
            newErrors.password = 'Şifre en az 6 karakter olmalıdır'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Şifreler eşleşmiyor'
        }

        if (!formData.age) newErrors.age = 'Yaş gereklidir'
        else {
            const age = parseInt(formData.age)
            if (isNaN(age) || age < 6 || age > 18) {
                newErrors.age = 'Yaş 6-18 arasında olmalıdır'
            }
        }

        if (!formData.parentEmail) newErrors.parentEmail = 'Ebeveyn emaili gereklidir'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
            newErrors.parentEmail = 'Geçerli bir email adresi giriniz'
        }

        if (!formData.parentConsent) newErrors.consent = 'Ebeveyn onayı gereklidir'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/child/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    age: parseInt(formData.age),
                    parentEmail: formData.parentEmail,
                    parentConsent: formData.parentConsent,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Kayıt başarısız')
            }

            // Use AuthContext to save session
            login({
                id: data.user.id,
                username: data.user.username,
                avatar: data.user.avatar,
                type: 'child'
            })

            // Redirect to support selection
            router.push('/child/select-support')

        } catch (err: any) {
            setError(err.message || 'Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4 py-12">
            {/* Animated background - more colorful for children */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <Heart className="h-8 w-8 text-purple-400 animate-pulse" fill="currentColor" />
                        <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                            Ümit Köprüsü
                        </span>
                    </Link>

                    <div className="text-6xl mb-4 animate-bounce">{randomHero}</div>

                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Aramıza Katıl!
                        </span>
                    </h1>
                    <p className="text-gray-400">Güvenli bir arkadaş bul</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 rounded-2xl bg-green-500/10 border border-green-500/50 p-6">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                            <div>
                                <p className="text-green-400 font-semibold">Kayıt Başarılı! 🎉</p>
                                <p className="text-sm text-gray-300">Artık giriş yapabilirsin. Giriş sayfasına yönlendiriliyorsun...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/50 p-6">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                            <p className="text-red-400 font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-8 space-y-6">
                    <FormInput
                        label="Kullanıcı Adın"
                        type="text"
                        required
                        icon={<User className="h-5 w-5" />}
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        error={errors.username}
                        placeholder="super_kahraman"
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput
                            label="Şifre"
                            type="password"
                            required
                            icon={<Lock className="h-5 w-5" />}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            placeholder="••••••"
                        />

                        <FormInput
                            label="Şifre Tekrar"
                            type="password"
                            required
                            icon={<Lock className="h-5 w-5" />}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={errors.confirmPassword}
                            placeholder="••••••"
                        />
                    </div>

                    <FormInput
                        label="Yaşın"
                        type="number"
                        required
                        icon={<Cake className="h-5 w-5" />}
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        error={errors.age}
                        placeholder="12"
                        min={6}
                        max={18}
                    />

                    <div className="rounded-2xl bg-blue-500/10 border border-blue-500/30 p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-blue-400 font-semibold mb-1">Ebeveyn Onayı</p>
                                <p className="text-sm text-gray-300">Anne veya babanın email adresini gir. Onların izniyle kayıt olabilirsin.</p>
                            </div>
                        </div>

                        <FormInput
                            label="Anne/Baba Email"
                            type="email"
                            required
                            icon={<Mail className="h-5 w-5" />}
                            value={formData.parentEmail}
                            onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                            error={errors.parentEmail}
                            placeholder="anne@email.com"
                        />

                        <label className="flex items-start gap-3 cursor-pointer group mt-4">
                            <input
                                type="checkbox"
                                checked={formData.parentConsent}
                                onChange={(e) => setFormData({ ...formData, parentConsent: e.target.checked })}
                                className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-purple-500 checked:border-purple-500 transition-colors"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                Anne/Babam bu uygulamayı kullanmama izin verdi
                            </span>
                        </label>
                        {errors.consent && <p className="text-sm text-red-400 mt-2">{errors.consent}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Kaydediliyor...</span>
                            </>
                        ) : (
                            <>
                                <Baby className="h-5 w-5" />
                                <span>Kayıt Ol</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-4 border-t border-white/10">
                        <p className="text-gray-400">
                            Zaten hesabın var mı?{' '}
                            <Link href="/auth/child/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                Giriş Yap
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
