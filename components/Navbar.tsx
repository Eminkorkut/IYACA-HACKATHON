'use client'

import Link from 'next/link'
import { Heart, User, LogOut } from 'lucide-react'

interface NavbarProps {
  userName?: string;
  userRole?: 'volunteer' | 'child' | 'admin';
}

export default function Navbar({ userName = 'Deniz', userRole = 'volunteer' }: NavbarProps) {

  return (
    <nav className="glass border-b border-cream-300/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <Heart className="h-8 w-8 text-warm-500 animate-pulse group-hover:scale-110 transition-transform" fill="currentColor" />
            <span className="text-2xl font-bold bg-gradient-to-r from-warm-600 to-energy-600 bg-clip-text text-transparent">Ümit Köprüsü</span>
          </Link>

          <div className="flex items-center space-x-4">
            {userName && (
              <div className="flex items-center space-x-2 px-5 py-2.5 rounded-3xl bg-gradient-to-r from-cream-200 to-sunshine-100 text-warm-700 border border-cream-300 shadow-soft">
                <User className="h-4 w-4" />
                <span className="font-semibold">{userName}</span>
              </div>
            )}
            <Link
              href="/"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-3xl bg-cream-100/80 text-stone-700 hover:bg-cream-200 border border-cream-300 transition-all duration-300 transform hover:scale-105 shadow-soft"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Çıkış</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}


