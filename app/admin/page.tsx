'use client'

import { useState } from 'react'
import AdminAlertModal from '@/components/AdminAlertModal'
import { AlertTriangle, Users, MessageSquare, Shield, TrendingUp, Bell, Heart, ArrowLeft, Sparkles } from 'lucide-react'
import { mockChildren } from '@/data/mockData'
import Link from 'next/link'
import UserProfile from '@/components/UserProfile'
import { getAvatarEmoji } from '@/utils/avatarUtils'

export default function AdminDashboard() {
  const [showAlertModal, setShowAlertModal] = useState(false)

  const stats = {
    totalChildren: mockChildren.length,
    activeConversations: 3,
    totalMessages: 156,
    avgResponseTime: '2.5 dk',
    safetyAlerts: 0,
    systemHealth: 'Excellent'
  }

  const handleTriggerAlert = () => {
    setShowAlertModal(true)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Heart className="h-8 w-8 text-pink-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
                  <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                  Ümit Köprüsü
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-gray-300">
                  Yönetici Paneli
                </div>
                <UserProfile />
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Yönetim Paneli
            </h1>
            <p className="text-gray-400 text-lg">Sistem durumu ve istatistikler</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Children */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/40">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-pink-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{stats.totalChildren}</h3>
              <p className="text-gray-400 font-medium">Toplam Kardeş</p>
            </div>

            {/* Active Conversations */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{stats.activeConversations}</h3>
              <p className="text-gray-400 font-medium">Aktif Konuşma</p>
            </div>

            {/* Total Messages */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{stats.totalMessages}</h3>
              <p className="text-gray-400 font-medium">Toplam Mesaj</p>
            </div>

            {/* Avg Response Time */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{stats.avgResponseTime}</h3>
              <p className="text-gray-400 font-medium">Ortalama Yanıt Süresi</p>
            </div>

            {/* Safety Alerts */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40">
                  <Shield className="h-7 w-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{stats.safetyAlerts}</h3>
              <p className="text-gray-400 font-medium">Güvenlik Uyarısı</p>
            </div>

            {/* System Health */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                  <Shield className="h-7 w-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{stats.systemHealth}</h3>
              <p className="text-gray-400 font-medium">Sistem Durumu</p>
            </div>
          </div>

          {/* Alert Section */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Güvenlik Uyarıları</h2>
                <p className="text-gray-400">Kritik durumlar için müdahale sistemi</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/40">
                <Bell className="h-8 w-8 text-white" />
              </div>
            </div>

            <button
              onClick={handleTriggerAlert}
              className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg shadow-red-500/50 font-bold text-lg flex items-center justify-center gap-3"
            >
              <AlertTriangle className="h-6 w-6" />
              <span>Uyarıyı Tetikle (Demo)</span>
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Bu buton demo amaçlıdır. Gerçek uygulamada uyarılar otomatik olarak tetiklenir.
            </p>
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6">Son Aktiviteler</h2>
            <div className="space-y-4">
              {mockChildren.map((child, index) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center text-2xl shadow-sm border border-white/20">
                      {getAvatarEmoji(child.avatar)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{child.name}</p>
                      <p className="text-sm text-gray-400">{child.lastMessage || 'Henüz mesaj yok'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-400">
                      {child.lastMessageTime?.toLocaleDateString('tr-TR') || 'Yeni'}
                    </p>
                    {child.unreadCount > 0 && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-bold bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg">
                        {child.unreadCount} yeni
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert Modal */}
        <AdminAlertModal
          isOpen={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          alertData={{
            userId: 'KRD-001',
            userName: 'Kardeş #1',
            keyword: 'kaçmak',
            timestamp: new Date(),
            message: 'Kullanıcı "kaçmak" kelimesini kullandı. Müdahale gerekli.'
          }}
        />
      </div>
    </div>
  )
}

