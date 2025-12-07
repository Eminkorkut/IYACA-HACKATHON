'use client'

import { AlertTriangle, X, User, Clock, MessageSquare } from 'lucide-react'

interface AdminAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertData?: {
    userId: string;
    userName: string;
    keyword: string;
    timestamp: Date;
    message: string;
  };
}

export default function AdminAlertModal({ isOpen, onClose, alertData }: AdminAlertModalProps) {
  if (!isOpen) return null

  const defaultAlert = {
    userId: 'KRD-001',
    userName: 'Kardeş #1',
    keyword: 'Run away',
    timestamp: new Date(),
    message: 'Kullanıcı "kaçmak" kelimesini kullandı. Müdahale gerekli.'
  }

  const alert = alertData || defaultAlert

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-dark rounded-2xl p-8 max-w-lg w-full shadow-glass border-2 border-red-500/50">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Kritik Uyarı</h3>
              <p className="text-sm text-gray-400">Acil Müdahale Gerekli</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Alert Content */}
        <div className="space-y-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-5 w-5 text-red-400" />
              <span className="font-semibold text-red-400">Tetiklenen Kelime</span>
            </div>
            <p className="text-white font-mono text-lg">{alert.keyword}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">Kullanıcı</span>
              </div>
              <p className="text-white font-semibold">{alert.userName}</p>
              <p className="text-xs text-gray-400 mt-1">ID: #{alert.userId}</p>
            </div>

            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">Zaman</span>
              </div>
              <p className="text-white font-semibold text-sm">
                {alert.timestamp.toLocaleTimeString('tr-TR')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {alert.timestamp.toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-300 text-sm">{alert.message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold"
          >
            Müdahale Et
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            İncele
          </button>
        </div>
      </div>
    </div>
  )
}


