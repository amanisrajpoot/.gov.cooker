import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { signature_data, is_anonymous = false } = body;

    // In a real app, you'd save this to the database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Signature recorded successfully',
      signature_id: Date.now().toString(),
      campaign_id: id,
      is_anonymous
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
