'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User, Mail, LayoutDashboard } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function UserProfile() {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!user) return null

    const displayName = user.type === 'volunteer' ? user.fullName : user.username
    const displayEmail = user.type === 'volunteer' ? user.email : undefined

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-white">{displayName}</p>
                    {displayEmail && (
                        <p className="text-xs text-gray-400">{displayEmail}</p>
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-black/95 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white">{displayName}</p>
                                {displayEmail && (
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        <Mail className="h-3 w-3" />
                                        {displayEmail}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    {user.type === 'volunteer' ? 'Gönüllü' : 'Çocuk'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {user.type === 'volunteer' && (
                        <>
                            <Link
                                href="/volunteer"
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-blue-400 hover:text-blue-300 border-b border-white/10"
                            >
                                <LayoutDashboard className="h-5 w-5" />
                                <span className="font-medium">Mentör Panosu</span>
                            </Link>
                            <Link
                                href="/volunteer/profile"
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-gray-300 hover:text-white border-b border-white/10"
                            >
                                <User className="h-5 w-5" />
                                <span className="font-medium">Profili Düzenle</span>
                            </Link>
                        </>
                    )}

                    {user.type === 'child' && (
                        <Link
                            href="/child/profile"
                            onClick={() => setIsOpen(false)}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-gray-300 hover:text-white border-b border-white/10"
                        >
                            <User className="h-5 w-5" />
                            <span className="font-medium">Profili Düzenle</span>
                        </Link>
                    )}

                    <button
                        onClick={logout}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-red-400 hover:text-red-300"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Çıkış Yap</span>
                    </button>
                </div>
            )}
        </div>
    )
}
