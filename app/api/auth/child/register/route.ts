import { NextRequest, NextResponse } from 'next/server';
import { createChild, hashPassword } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password, age, parentEmail, parentConsent } = body;

        // Validation
        if (!username || !password || !age || !parentEmail) {
            return NextResponse.json(
                { error: 'Tüm alanlar zorunludur' },
                { status: 400 }
            );
        }

        // Username validation (alphanumeric only)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json(
                { error: 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir' },
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

        // Age validation
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 6 || ageNum > 18) {
            return NextResponse.json(
                { error: 'Yaş 6-18 arasında olmalıdır' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(parentEmail)) {
            return NextResponse.json(
                { error: 'Geçerli bir email adresi giriniz' },
                { status: 400 }
            );
        }

        // Parent consent validation
        if (!parentConsent) {
            return NextResponse.json(
                { error: 'Ebeveyn onayı gereklidir' },
                { status: 400 }
            );
        }

        // Hash password
        const passwordHash = hashPassword(password);

        // Create child
        const child = createChild({
            username,
            passwordHash,
            age: ageNum,
            parentEmail,
            parentConsent: true,
        });

        // Don't send password hash back
        const { passwordHash: _, ...childData } = child;

        return NextResponse.json({
            success: true,
            message: 'Kayıt başarılı! Artık giriş yapabilirsin.',
            child: childData,
        });

    } catch (error: any) {
        console.error('Child registration error:', error);

        if (error.message === 'Username already exists') {
            return NextResponse.json(
                { error: 'Bu kullanıcı adı zaten kullanılıyor' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Kayıt sırasında bir hata oluştu' },
            { status: 500 }
        );
    }
}
