'use client'

import Link from 'next/link'
import { Heart, Shield, Users, ArrowRight, LogIn, Sparkles, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import UserProfile from '@/components/UserProfile'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  <Heart className="h-8 w-8 text-pink-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
                  <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Ümit Köprüsü
                </span>
              </div>
              {user ? (
                <UserProfile />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 font-semibold hover:scale-105 group"
                >
                  <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Giriş Yap</span>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">


                <h1 className="text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                  Her Çocuk<br />
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Bir Umut
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Çocuk esirgeme kurumundaki çocuklar için gönüllülerin ders, psikoloji ve daha fazla alanda destek sağladığı güvenli platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {!user ? (
                  <>
                    <Link
                      href="/auth/child/register"
                      className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Çocuk Olarak Katıl
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    <Link
                      href="/auth/volunteer/register"
                      className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        Gönüllü Ol
                        <Heart className="group-hover:scale-110 transition-transform" fill="currentColor" />
                      </span>
                    </Link>
                  </>
                ) : user.type === 'child' ? (
                  <Link
                    href="/child/select-support"
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Destek Türünü Değiştir
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ) : null}
              </div>

            </div>

            {/* Right: Interactive Visual */}
            <div className="relative h-96 lg:h-full flex items-center justify-center">
              {/* Animated circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-64 h-64 border border-pink-500/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                <div className="absolute w-80 h-80 border border-purple-500/10 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
              </div>

              {/* Main visual - Interactive hearts */}
              <div className="relative z-10 flex items-center justify-center gap-8">
                {/* Child avatar */}
                <div className="flex flex-col items-center space-y-4 group cursor-pointer">
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-6xl shadow-2xl shadow-pink-500/40 group-hover:scale-110 transition-transform duration-300 relative">
                    🧒
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-pink-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  <p className="font-semibold text-gray-300">Çocuk</p>
                </div>

                {/* Connection with animated hearts */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Heart className="h-7 w-7 text-pink-400 animate-bounce" fill="currentColor" style={{ animationDelay: '0s' }} />
                    <div className="w-12 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"></div>
                    <Heart className="h-7 w-7 text-purple-400 animate-bounce" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <p className="text-xs font-semibold text-gray-400">Sevgi Bağı</p>
                </div>

                {/* Mentor avatar */}
                <div className="flex flex-col items-center space-y-4 group cursor-pointer">
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-6xl shadow-2xl shadow-purple-500/40 group-hover:scale-110 transition-transform duration-300 relative">
                    👤
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  <p className="font-semibold text-gray-300">Gönüllü</p>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Neden Ümit Köprüsü?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Çocuklar ve gönüllüler arasında umut köprüsü kuran güvenli platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-pink-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/0 to-pink-600/0 group-hover:from-pink-600/10 group-hover:to-pink-600/5 transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Çok Alanlı Destek</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ders, psikoloji, yaşam becerileri ve daha fazla alanda çocuklara destek sağlayın.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-purple-600/5 transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Yapay Zeka Kalkanı</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Gerçek zamanlı toksisite kontrolü ve stres analizi ile her konuşma korunur.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-blue-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-blue-600/5 transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="h-8 w-8 text-blue-400" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-bold">Güvenli Alan</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Çocuk esirgeme kurumundaki her çocuk için güvenli ve destekleyici bir ortam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Gönüllülüğün <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Kanıtlanmış Etkisi</span>
            </h2>
            <p className="text-xl text-gray-300">Dünya çapında mentörlük programlarının sonuçları</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BBBS Crime Reduction */}
            <div className="group relative rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-pink-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/0 to-pink-600/0 group-hover:from-pink-600/10 group-hover:to-pink-600/5 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/40">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-5xl font-black bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">%54</p>
                  <p className="text-lg font-semibold text-white mb-1">Daha az suç işleme</p>
                  <p className="text-sm text-gray-400">BBBS Amerika</p>
                </div>
              </div>
            </div>

            {/* BBBS Substance Abuse */}
            <div className="group relative rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-purple-600/5 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                  <Heart className="h-8 w-8 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">%41</p>
                  <p className="text-lg font-semibold text-white mb-1">Daha az madde kullanımı</p>
                  <p className="text-sm text-gray-400">BBBS Amerika</p>
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="group relative rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-blue-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-blue-600/5 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-5xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">$2.72</p>
                  <p className="text-lg font-semibold text-white mb-1">Her $1 yatırımın getirisi</p>
                  <p className="text-sm text-gray-400">MENTOR, 2021</p>
                </div>
              </div>
            </div>

            {/* Turkey Stats */}
            <div className="group relative rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 hover:border-green-500/50 transition-all duration-300 overflow-hidden hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/10 group-hover:to-green-600/5 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-5xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">15,135</p>
                  <p className="text-lg font-semibold text-white mb-1">Kuruluş bakımındaki çocuk</p>
                  <p className="text-sm text-gray-400">Türkiye</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="relative rounded-3xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-white/10 p-12 lg:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:40px_40px] animate-pulse"></div>

              <div className="relative text-center space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black">
                  Bugün Başla, Fark Yarat
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Çocuklarının güvenli bir şekilde destek almalarına yardımcı olun
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/auth/volunteer/register"
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105"
                  >
                    Gönüllü Ol →
                  </Link>
                  <Link
                    href="/auth/child/register"
                    className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all"
                  >
                    Destek Al
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-xl bg-black/30 mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2025 Ümit Köprüsü. Her çocuk bir umut, her gönüllü bir köprü.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}