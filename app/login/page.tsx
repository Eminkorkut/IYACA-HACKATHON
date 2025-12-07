'use client'

import { Heart, ArrowRight, Users, Baby, Shield, Sparkles, Lock, Zap } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)
  const [activeRole, setActiveRole] = useState<string | null>(null)

  const handleLogin = (role: 'volunteer' | 'child') => {
    setActiveRole(role)
    setTimeout(() => {
      if (role === 'volunteer') router.push('/auth/volunteer/login')
      if (role === 'child') router.push('/auth/child/login')
    }, 500)
  }

  const roles: Array<{
    id: 'volunteer' | 'child'
    title: string
    subtitle: string
    description: string
    icon: typeof Users
    gradient: string
    accentGradient: string
    topColor: string
    lightColor: string
  }> = [
      {
        id: 'volunteer',
        title: 'Gönüllü',
        subtitle: 'Gönüllülük Yap',
        description: 'Çocuklara güvenli bir şekilde destek ol',
        icon: Users,
        gradient: 'from-pink-500 to-rose-600',
        accentGradient: 'from-pink-600 to-rose-700',
        topColor: 'top-0 left-1/4 bg-pink-600/20',
        lightColor: 'text-pink-300'
      },
      {
        id: 'child',
        title: 'Çocuk',
        subtitle: 'Yardım Al',
        description: 'Güvenli arkadaşlık platformunda destek bul',
        icon: Baby,
        gradient: 'from-purple-500 to-blue-600',
        accentGradient: 'from-purple-600 to-blue-700',
        topColor: 'top-1/3 right-0 bg-purple-600/20',
        lightColor: 'text-purple-300'
      }
    ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute ${roles[0].topColor} w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse`}></div>
        <div className={`absolute ${roles[1].topColor} w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse`} style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-pink-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-blue-500/10 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full blur-2xl opacity-50"></div>
              <Heart
                className="h-24 w-24 text-pink-400 animate-pulse relative"
                fill="currentColor"
                strokeWidth={1.5}
              />
              <Sparkles className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ümit Köprüsü
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light mb-2">Her Çocuk Bir Umut, Her Gönüllü Bir Köprü</p>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-2">
            Çocuk esirgeme kurumundaki çocuklar için güvenli destek platformu
          </p>
        </div>

        {/* Login Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon
            const isHovered = hoveredRole === role.id
            const isActive = activeRole === role.id

            return (
              <button
                key={role.id}
                onClick={() => handleLogin(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className="group relative h-full"
              >
                {/* Glow background */}
                <div className={`
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-r ${role.gradient}
                  opacity-0 group-hover:opacity-10 
                  transition-all duration-500
                  blur-xl
                `}></div>

                {/* Main Card */}
                <div className={`
                  relative h-full rounded-3xl p-8
                  bg-gradient-to-br from-white/10 to-white/5
                  border border-white/20
                  transition-all duration-500
                  backdrop-blur-xl
                  flex flex-col
                  ${isHovered ? 'border-white/40 bg-white/15 -translate-y-2 shadow-2xl' : 'hover:border-white/30'}
                  ${isActive ? 'scale-95 opacity-50' : ''}
                `}>
                  {/* Icon Container */}
                  <div className={`
                    relative w-16 h-16 rounded-2xl mb-8
                    bg-gradient-to-br ${role.gradient}
                    flex items-center justify-center
                    transition-all duration-300
                    shadow-lg
                    ${isHovered ? 'scale-110 -rotate-6 shadow-xl' : ''}
                  `}>
                    <Icon className="h-8 w-8 text-white" strokeWidth={2} />

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-left mb-8">
                    <div className="mb-3">
                      <h3 className="text-3xl font-black text-white mb-1">
                        {role.title}
                      </h3>
                      <p className={`text-sm font-semibold ${role.lightColor}`}>
                        {role.subtitle}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className={`
                    flex items-center justify-between px-6 py-4 rounded-2xl
                    bg-gradient-to-r ${isHovered ? role.accentGradient : role.gradient}
                    text-white font-bold
                    transition-all duration-300
                    shadow-lg
                    group/btn
                  `}>
                    <span>Giriş Yap</span>
                    <ArrowRight
                      className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-6 hover:border-white/40 transition-all duration-300 group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Güvenli & Korumalı</p>
                <p className="text-sm text-gray-400">Yapay zeka ile 7/24 moderasyon</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-6 hover:border-white/40 transition-all duration-300 group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Tamamen Anonim</p>
                <p className="text-sm text-gray-400">Kimliğiniz gizli, kalpler açık</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-6 hover:border-white/40 transition-all duration-300 group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Anlık Bağlantı</p>
                <p className="text-sm text-gray-400">Hızlı ve güvenli eşleştirme</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 font-medium transition-colors group"
          >
            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Bu bir demo uygulamadır. Üretim ortamında profesyonel güvenlik, kimlik doğrulama ve yasal uyumluluğu sağlayın.
          </p>
        </div>
      </div>
    </div>
  )
}