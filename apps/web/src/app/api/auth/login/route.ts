import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple mock authentication
    if (email === 'admin@govcooker.com' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          handle: 'admin',
          email: 'admin@govcooker.com',
          role: 'admin',
          kyc_status: 'verified'
        },
        access_token: 'mock-jwt-token-' + Date.now()
      });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
