'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState, InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    icon?: React.ReactNode
}

export default function FormInput({
    label,
    error,
    icon,
    type = 'text',
    required = false,
    ...props
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const inputType = type === 'password' && showPassword ? 'text' : type

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200">
                {label}
                {required && <span className="text-pink-400 ml-1">*</span>}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    type={inputType}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            w-full px-4 py-3.5 rounded-xl
            bg-white/5 border-2
            text-white placeholder-gray-500
            transition-all duration-300
            ${icon ? 'pl-12' : ''}
            ${type === 'password' ? 'pr-12' : ''}
            ${error
                            ? 'border-red-500/50 focus:border-red-500'
                            : isFocused
                                ? 'border-pink-500/50 focus:border-pink-500'
                                : 'border-white/20 hover:border-white/30'
                        }
            focus:outline-none focus:ring-2 focus:ring-pink-500/20
            ${error ? 'focus:ring-red-500/20' : ''}
          `}
                    {...props}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-400"></span>
                    {error}
                </p>
            )}
        </div>
    )
}
