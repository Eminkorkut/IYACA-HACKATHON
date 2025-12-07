'use client'

import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useState, useEffect } from 'react'

interface VoiceCallProps {
  childName: string;
  childAvatar: string;
  isCallActive: boolean;
  onEndCall: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
  onToggleVolume?: () => void;
  isVolumeMuted?: boolean;
}

export default function VoiceCall({
  childName,
  childAvatar,
  isCallActive,
  onEndCall,
  onToggleMute,
  isMuted,
  onToggleVolume,
  isVolumeMuted = false
}: VoiceCallProps) {
  const [duration, setDuration] = useState(0)
  const [volumeMuted, setVolumeMuted] = useState(isVolumeMuted)

  useEffect(() => {
    if (isVolumeMuted !== undefined) {
      setVolumeMuted(isVolumeMuted)
    }
  }, [isVolumeMuted])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    } else {
      setDuration(0)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

import { getAvatarEmoji } from '@/utils/avatarUtils'

  const getAvatarIcon = (avatar: string) => {
    return getAvatarEmoji(avatar)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-warm-50 via-sunshine-50 to-energy-50">
      {/* Avatar */}
      <div className="relative mb-8">
        <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-warm-400 to-sunshine-400 flex items-center justify-center text-7xl shadow-warm-lg mb-4">
          {getAvatarIcon(childAvatar)}
        </div>
        {isCallActive && (
          <div className="absolute inset-0 rounded-3xl bg-warm-400 animate-ping opacity-30"></div>
        )}
      </div>

      {/* Call Status */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{childName}</h3>
        <p className="text-gray-600">
          {isCallActive ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full animate-pulse"></span>
              Sesli görüşme aktif
            </span>
          ) : (
            'Arama yapılıyor...'
          )}
        </p>
      </div>

      {/* Call Controls */}
      <div className="flex items-center gap-6">
        {/* Mute/Unmute */}
        <button
          onClick={onToggleMute}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all transform hover:scale-110 shadow-warm ${isMuted
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
            : 'bg-white text-gray-700 hover:bg-warm-50 border border-warm-200'
            }`}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </button>

        {/* End Call */}
        <button
          onClick={onEndCall}
          className="w-20 h-20 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-110 shadow-warm-lg flex items-center justify-center"
        >
          <PhoneOff className="h-8 w-8" />
        </button>

        {/* Volume */}
        <button
          onClick={() => {
            const newState = !volumeMuted
            setVolumeMuted(newState)
            if (onToggleVolume) {
              onToggleVolume()
            }
          }}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all transform hover:scale-110 shadow-warm ${
            volumeMuted
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
              : 'bg-white text-gray-700 hover:bg-warm-50 border border-warm-200'
          }`}
          title={volumeMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {volumeMuted ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Call Duration */}
      {isCallActive && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-mono text-gray-700">{formatTime(duration)}</p>
          <p className="text-sm text-gray-500 mt-1">Görüşme süresi</p>
        </div>
      )}

      {/* AI Status Indicator */}
      <div className="mt-8 px-5 py-3 bg-gradient-to-r from-safety-50 to-safety-100 rounded-2xl border border-safety-200 shadow-sm">
        <p className="text-sm text-safety-700 flex items-center gap-2 font-semibold">
          <span className="w-2.5 h-2.5 bg-safety-500 rounded-full animate-pulse"></span>
          AI Güvenlik: Aktif
        </p>
      </div>
    </div>
  )
}

