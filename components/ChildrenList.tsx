'use client'

import { useState } from 'react'
import { Child } from '@/data/mockData'
import { MessageSquare, Phone, Search } from 'lucide-react'

interface ChildrenListProps {
  childrenList: Child[];
  selectedChildId?: string;
  onSelectChild: (childId: string) => void;
  communicationMode: 'message' | 'call';
  onModeChange: (mode: 'message' | 'call') => void;
}

import { getAvatarEmoji } from '@/utils/avatarUtils'

const getAvatarIcon = (avatar: string) => {
  return <span className="text-2xl">{getAvatarEmoji(avatar)}</span>
}

export default function ChildrenList({
  childrenList,
  selectedChildId,
  onSelectChild,
  communicationMode,
  onModeChange
}: ChildrenListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChildren = childrenList.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-warm-200/50 bg-gradient-to-r from-warm-50/90 to-sunshine-50/90 backdrop-blur-sm">
        <h2 className="text-xl font-bold bg-gradient-to-r from-warm-700 to-energy-700 bg-clip-text text-transparent mb-2">Kardeşlerim</h2>
        <p className="text-sm text-gray-600 mb-4 font-medium">{childrenList.length} aktif konuşma</p>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-400 bg-white/80 text-sm"
          />
        </div>

        {/* Communication Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => onModeChange('message')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${communicationMode === 'message'
              ? 'bg-gradient-to-r from-warm-500 to-warm-600 text-white shadow-warm'
              : 'bg-white/80 text-gray-600 hover:bg-warm-50 border border-warm-200 shadow-sm'
              }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Yazışma</span>
          </button>
          <button
            onClick={() => onModeChange('call')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${communicationMode === 'call'
              ? 'bg-gradient-to-r from-warm-500 to-warm-600 text-white shadow-warm'
              : 'bg-white/80 text-gray-600 hover:bg-warm-50 border border-warm-200 shadow-sm'
              }`}
          >
            <Phone className="h-4 w-4" />
            <span>Sesli</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-warm-50/40 via-sunshine-50/30 to-white">
        {filteredChildren.length > 0 ? (
          filteredChildren.map((child) => (
            <button
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`w-full p-5 text-left hover:bg-warm-50/70 transition-all border-b border-warm-100/50 ${selectedChildId === child.id
                ? 'bg-gradient-to-r from-warm-100/90 to-sunshine-100/90 border-l-4 border-l-warm-500 shadow-warm'
                : ''
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-warm-300 to-energy-300 flex items-center justify-center shadow-warm text-2xl">
                  {getAvatarIcon(child.avatar)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 truncate">{child.name}</p>
                    {child.unreadCount > 0 && (
                      <span className="bg-gradient-to-r from-warm-500 to-warm-600 text-white text-xs rounded-full px-2.5 py-1 font-bold shadow-warm">
                        {child.unreadCount}
                      </span>
                    )}
                  </div>
                  {child.lastMessage && (
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {child.lastMessage}
                    </p>
                  )}
                  {child.lastMessageTime && (
                    <p className="text-xs text-gray-400 mt-1">
                      {child.lastMessageTime.toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 p-4">
            <p className="text-sm text-center">
              {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz atanmış kardeş yok'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


