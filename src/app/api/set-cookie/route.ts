import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, role } = body;

    if (!token || !role) {
      return NextResponse.json({ error: 'Missing token or role' }, { status: 400 });
    }

    // Set cookies
    cookies().set('token', token, { path: '/' });
    cookies().set('role', role, { path: '/' });

    return NextResponse.json({ message: 'Cookies set successfully' });
  } catch (error) {
    console.error('Error setting cookies:', error);
    return NextResponse.json({ error: 'Failed to set cookies' }, { status: 500 });
  }
}
