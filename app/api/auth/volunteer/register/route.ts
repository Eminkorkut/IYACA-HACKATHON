import { NextRequest, NextResponse } from 'next/server';
import { createVolunteer, hashPassword } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const fullName = formData.get('fullName') as string;
        const phone = formData.get('phone') as string;
        const idNumber = formData.get('idNumber') as string;
        const document = formData.get('document') as File | null;

        // Validation
        if (!email || !password || !fullName || !phone || !idNumber) {
            return NextResponse.json(
                { error: 'Tüm alanlar zorunludur' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Geçerli bir email adresi giriniz' },
                { status: 400 }
            );
        }

        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Şifre en az 6 karakter olmalıdır' },
                { status: 400 }
            );
        }

        // Handle document upload
        let documentPath: string | undefined;
        if (document) {
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'documents');

            // Create upload directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Generate unique filename
            const timestamp = Date.now();
            const originalName = document.name;
            const extension = path.extname(originalName);
            const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${extension}`;
            const filepath = path.join(uploadDir, filename);

            // Save file
            const bytes = await document.arrayBuffer();
            const buffer = Buffer.from(bytes);
            fs.writeFileSync(filepath, buffer);

            documentPath = `/uploads/documents/${filename}`;
        }

        // Hash password
        const passwordHash = hashPassword(password);

        // Create volunteer - AUTO APPROVED
        const volunteer = createVolunteer({
            email,
            passwordHash,
            fullName,
            phone,
            idNumber,
            documentPath,
            approved: true, // Auto-approve, no admin needed
        });

        // Don't send password hash back
        const { passwordHash: _, ...volunteerData } = volunteer;

        return NextResponse.json({
            success: true,
            message: 'Kayıt başarılı! Artık giriş yapabilirsiniz.',
            volunteer: volunteerData,
        });

    } catch (error: any) {
        console.error('Volunteer registration error:', error);

        if (error.message === 'Email already exists') {
            return NextResponse.json(
                { error: 'Bu email adresi zaten kullanılıyor' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Kayıt sırasında bir hata oluştu' },
            { status: 500 }
        );
    }
}
