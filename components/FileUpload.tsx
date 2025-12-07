'use client'

import { Upload, X, FileText, CheckCircle } from 'lucide-react'
import { useState, useRef, ChangeEvent, DragEvent } from 'react'

interface FileUploadProps {
    onFileSelect: (file: File) => void
    accept?: string
    maxSize?: number // in MB
    label?: string
    required?: boolean
}

export default function FileUpload({
    onFileSelect,
    accept = '.pdf,.jpg,.jpeg,.png',
    maxSize = 5,
    label = 'Belge Yükle',
    required = false
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File): boolean => {
        // Check file size
        const fileSizeMB = file.size / (1024 * 1024)
        if (fileSizeMB > maxSize) {
            setError(`Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`)
            return false
        }

        // Check file type
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
        const acceptedTypes = accept.split(',').map(t => t.trim())
        if (!acceptedTypes.includes(fileExtension)) {
            setError(`Sadece ${accept} formatları kabul edilir`)
            return false
        }

        setError('')
        return true
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFile(file)) {
            setSelectedFile(file)
            onFileSelect(file)
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (file && validateFile(file)) {
            setSelectedFile(file)
            onFileSelect(file)
        }
    }

    const handleRemoveFile = () => {
        setSelectedFile(null)
        setError('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200">
                {label}
                {required && <span className="text-pink-400 ml-1">*</span>}
            </label>

            {!selectedFile ? (
                <div
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
            relative rounded-2xl border-2 border-dashed p-8
            transition-all duration-300 cursor-pointer
            ${isDragging
                            ? 'border-pink-500 bg-pink-500/10'
                            : 'border-white/20 hover:border-pink-500/50 bg-white/5 hover:bg-white/10'
                        }
          `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-pink-400" />
                        </div>

                        <div className="text-center">
                            <p className="text-white font-semibold mb-1">
                                Dosya yüklemek için tıklayın veya sürükleyin
                            </p>
                            <p className="text-sm text-gray-400">
                                {accept.replace(/\./g, '').toUpperCase()} • Maksimum {maxSize}MB
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative rounded-2xl border border-green-500/50 bg-green-500/10 p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-green-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold truncate">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>

                                <button
                                    onClick={handleRemoveFile}
                                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center transition-colors"
                                >
                                    <X className="h-4 w-4 text-red-400" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                <p className="text-sm text-green-400 font-medium">Dosya yüklendi</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                    <X className="h-4 w-4" />
                    {error}
                </p>
            )}
        </div>
    )
}
