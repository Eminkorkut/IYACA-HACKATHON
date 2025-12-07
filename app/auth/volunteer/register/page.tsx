'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowRight, Users, Mail, Lock, User, Phone, CreditCard, Upload, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import FormInput from '@/components/FormInput'
import FileUpload from '@/components/FileUpload'

export default function VolunteerRegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        idNumber: '',
        termsAccepted: false,
    })

    const [document, setDocument] = useState<File | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.email) newErrors.email = 'Email gereklidir'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Geçerli bir email adresi giriniz'
        }

        if (!formData.password) newErrors.password = 'Şifre gereklidir'
        else if (formData.password.length < 6) {
            newErrors.password = 'Şifre en az 6 karakter olmalıdır'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Şifreler eşleşmiyor'
        }

        if (!formData.fullName) newErrors.fullName = 'Ad Soyad gereklidir'
        if (!formData.phone) newErrors.phone = 'Telefon gereklidir'
        if (!formData.idNumber) newErrors.idNumber = 'TC Kimlik No gereklidir'

        if (!document) newErrors.document = 'Adli sicil belgesi yüklemeniz gereklidir'
        if (!formData.termsAccepted) newErrors.terms = 'Şartları kabul etmelisiniz'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('email', formData.email)
            formDataToSend.append('password', formData.password)
            formDataToSend.append('fullName', formData.fullName)
            formDataToSend.append('phone', formData.phone)
            formDataToSend.append('idNumber', formData.idNumber)
            if (document) {
                formDataToSend.append('document', document)
            }

            const response = await fetch('/api/auth/volunteer/register', {
                method: 'POST',
                body: formDataToSend,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Kayıt başarısız')
            }

            setSuccess(true)
            setTimeout(() => {
                router.push('/auth/volunteer/login')
            }, 2000)

        } catch (err: any) {
            setError(err.message || 'Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4 py-12">
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-rose-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <Heart className="h-8 w-8 text-pink-400 animate-pulse" fill="currentColor" />
                        <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Ümit Köprüsü
                        </span>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                        <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                            Gönüllü Kayıt
                        </span>
                    </h1>
                    <p className="text-gray-400">Çocuklara destek olmak için aramıza katılın</p>
                </div>

                {/* Success Message */}
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
                        label="Email"
                        type="email"
                        required
                        icon={<Mail className="h-5 w-5" />}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                        placeholder="ornek@email.com"
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
                        label="Ad Soyad"
                        type="text"
                        required
                        icon={<User className="h-5 w-5" />}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        error={errors.fullName}
                        placeholder="Ahmet Yılmaz"
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput
                            label="Telefon"
                            type="tel"
                            required
                            icon={<Phone className="h-5 w-5" />}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            error={errors.phone}
                            placeholder="0555 123 4567"
                        />

                        <FormInput
                            label="TC Kimlik No"
                            type="text"
                            required
                            icon={<CreditCard className="h-5 w-5" />}
                            value={formData.idNumber}
                            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                            error={errors.idNumber}
                            placeholder="12345678901"
                            maxLength={11}
                        />
                    </div>

                    <FileUpload
                        label="Adli Sicil Belgesi"
                        required
                        onFileSelect={setDocument}
                        accept=".pdf,.jpg,.jpeg,.png"
                        maxSize={5}
                    />
                    {errors.document && <p className="text-sm text-red-400 -mt-4">{errors.document}</p>}

                    <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-pink-500 checked:border-pink-500 transition-colors"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                Kullanım şartlarını ve gizlilik politikasını okudum, kabul ediyorum
                            </span>
                        </label>
                        {errors.terms && <p className="text-sm text-red-400">{errors.terms}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Kaydediliyor...</span>
                            </>
                        ) : (
                            <>
                                <Users className="h-5 w-5" />
                                <span>Kayıt Ol</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-4 border-t border-white/10">
                        <p className="text-gray-400">
                            Zaten hesabınız var mı?{' '}
                            <Link href="/auth/volunteer/login" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                                Giriş Yap
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
