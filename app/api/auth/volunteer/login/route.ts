import { NextRequest, NextResponse } from 'next/server';
import { getVolunteerByEmail, verifyPassword } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email ve şifre gereklidir' },
                { status: 400 }
            );
        }

        // Find volunteer
        const volunteer = getVolunteerByEmail(email);

        if (!volunteer) {
            return NextResponse.json(
                { error: 'Email veya şifre hatalı' },
                { status: 401 }
            );
        }

        // Verify password
        if (!verifyPassword(password, volunteer.passwordHash)) {
            return NextResponse.json(
                { error: 'Email veya şifre hatalı' },
                { status: 401 }
            );
        }

        // No approval check - volunteers are auto-approved

        // Don't send password hash back
        const { passwordHash: _, ...volunteerData } = volunteer;

        return NextResponse.json({
            success: true,
            message: 'Giriş başarılı!',
            volunteer: volunteerData,
        });

    } catch (error) {
        console.error('Volunteer login error:', error);
        return NextResponse.json(
            { error: 'Giriş sırasında bir hata oluştu' },
            { status: 500 }
        );
    }
}
