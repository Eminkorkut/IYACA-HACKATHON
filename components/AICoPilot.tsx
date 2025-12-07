'use client'

import { Shield, AlertCircle, Lightbulb } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { StressDataPoint } from '@/data/mockData'

interface AICoPilotProps {
  stressData: StressDataPoint[];
  currentStressLevel: number;
  suggestions: string[];
  safetyStatus: 'secure' | 'warning' | 'danger';
}

export default function AICoPilot({
  stressData,
  currentStressLevel,
  suggestions,
  safetyStatus
}: AICoPilotProps) {
  const getSafetyColor = () => {
    switch (safetyStatus) {
      case 'secure': return 'text-safety-600 bg-safety-50'
      case 'warning': return 'text-energy-600 bg-energy-50'
      case 'danger': return 'text-red-600 bg-red-50'
      default: return 'text-safety-600 bg-safety-50'
    }
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Safety Status */}
      <div className={`glass-warm rounded-2xl p-5 border border-warm-200/50 ${getSafetyColor()}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-white/50">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-lg">Güvenlik Durumu</p>
            <p className="text-sm font-medium opacity-90">
              {safetyStatus === 'secure' && 'Güvenli'}
              {safetyStatus === 'warning' && 'Dikkat Gerekli'}
              {safetyStatus === 'danger' && 'Kritik'}
            </p>
          </div>
        </div>
      </div>

      {/* Stress Graph */}
      <div className="glass-warm rounded-2xl p-5 flex-1 min-h-[300px] border border-warm-200/50">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Stres Seviyesi Analizi</h3>
        <div className="h-48 min-h-[200px]">
          {stressData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#6b7280"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 100]}
                  label={{ value: 'Stres', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Stres Seviyesi']}
                />
                <Line
                  type="monotone"
                  dataKey="stressLevel"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: '#f97316', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-sm">Henüz veri yok</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className={`text-2xl font-bold ${currentStressLevel > 70
              ? 'text-red-600'
              : currentStressLevel > 50
                ? 'text-energy-600'
                : 'text-safety-600'
            }`}>
            {currentStressLevel}%
          </p>
          <p className="text-sm text-gray-600">Mevcut Stres Seviyesi</p>
          {currentStressLevel > 70 && (
            <p className="text-xs text-red-600 mt-1 font-semibold">⚠️ Yüksek Stres</p>
          )}
        </div>
      </div>

      {/* AI Hints */}
      <div className="glass-warm rounded-2xl p-5 border border-warm-200/50">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 rounded-lg bg-energy-100">
            <Lightbulb className="h-5 w-5 text-energy-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">AI Önerileri</h3>
        </div>
        <div className="space-y-2">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`bg-white/50 rounded-lg p-3 text-sm text-gray-700 border-l-4 ${currentStressLevel > 70
                    ? 'border-red-400 bg-red-50/50'
                    : currentStressLevel > 50
                      ? 'border-energy-400 bg-energy-50/50'
                      : 'border-safety-400 bg-safety-50/50'
                  }`}
              >
                {suggestion}
              </div>
            ))
          ) : (
            <div className="bg-white/50 rounded-lg p-3 text-sm text-gray-500 italic">
              Öneriler yükleniyor...
            </div>
          )}
        </div>

        {/* Stres Seviyesine Göre Özel İpuçları - Tüm Seviyeler */}
        {currentStressLevel > 70 && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs font-semibold text-red-700 mb-2">⚠️ Yüksek Stres Tespit Edildi</p>
            <ul className="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>&quot;Nasıl yardımcı olabilirim?&quot; gibi açık uçlu sorular kullanın</li>
              <li>&quot;Bu gerçekten zor olmalı&quot; gibi empati ifadeleri kullanın</li>
              <li>Yumuşak ve destekleyici bir dil tercih edin</li>
              <li>Çocuğun duygularını doğrulayın</li>
            </ul>
          </div>
        )}
        {currentStressLevel > 50 && currentStressLevel <= 70 && (
          <div className="mt-4 p-3 bg-energy-50 rounded-lg border border-energy-200">
            <p className="text-xs font-semibold text-energy-700 mb-2">💡 Orta Stres Seviyesi</p>
            <ul className="text-xs text-energy-600 space-y-1 list-disc list-inside">
              <li>Çocuğun kendini ifade etmesine izin verin</li>
              <li>Kendi deneyimlerinizi paylaşarak normalleştirin</li>
              <li>Destekleyici ve anlayışlı olun</li>
              <li>Umut verici mesajlar paylaşın</li>
            </ul>
          </div>
        )}
        {currentStressLevel <= 50 && (
          <div className="mt-4 p-3 bg-safety-50 rounded-lg border border-safety-200">
            <p className="text-xs font-semibold text-safety-700 mb-2">✅ Düşük Stres - İyi Durum</p>
            <ul className="text-xs text-safety-600 space-y-1 list-disc list-inside">
              <li>Pozitif konuşmayı sürdürün</li>
              <li>Çocuğun olumlu deneyimlerini paylaşmasını teşvik edin</li>
              <li>Güçlü yönlerini vurgulayın ve takdir edin</li>
              <li>Motivasyonunu destekleyin</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

