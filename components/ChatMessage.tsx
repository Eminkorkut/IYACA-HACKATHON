'use client'

import { Message } from '@/data/mockData'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isVolunteer = message.senderType === 'volunteer'
  const isSafe = message.aiAnalysis?.toxicity === 'safe'

  return (
    <div className={`flex ${isVolunteer ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isVolunteer ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-semibold text-gray-700">
            {message.senderName}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString('tr-TR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div
          className={`rounded-2xl px-5 py-3.5 ${
            isVolunteer
              ? 'bg-gradient-to-r from-warm-500 to-warm-600 text-white rounded-br-sm shadow-warm'
              : 'bg-white text-gray-800 rounded-bl-sm shadow-soft border border-warm-100'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        {message.aiAnalysis && (
          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
            {isSafe ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-safety-500" />
                <span>AI Analiz: Güvenli</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 text-energy-500" />
                <span>AI Analiz: Dikkat</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


