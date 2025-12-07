import { NextRequest, NextResponse } from 'next/server';
import { getChildByUsername, verifyPassword } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Validation
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Kullanıcı adı ve şifre gereklidir' },
                { status: 400 }
            );
        }

        // Find child
        const child = getChildByUsername(username);

        if (!child) {
            return NextResponse.json(
                { error: 'Kullanıcı adı veya şifre hatalı' },
                { status: 401 }
            );
        }

        // Verify password
        if (!verifyPassword(password, child.passwordHash)) {
            return NextResponse.json(
                { error: 'Kullanıcı adı veya şifre hatalı' },
                { status: 401 }
            );
        }

        // Don't send password hash back
        const { passwordHash: _, ...childData } = child;

        return NextResponse.json({
            success: true,
            message: 'Giriş başarılı!',
            child: childData,
        });

    } catch (error) {
        console.error('Child login error:', error);
        return NextResponse.json(
            { error: 'Giriş sırasında bir hata oluştu' },
            { status: 500 }
        );
    }
}
