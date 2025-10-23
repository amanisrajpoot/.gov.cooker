import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { handle, email, password } = await request.json();

    // Simple mock registration
    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      user: {
        id: Date.now().toString(),
        handle,
        email,
        role: 'user',
        kyc_status: 'pending'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
