import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // تحقق بسيط
  if (!email || !password) {
    return NextResponse.json(
      { error: 'البريد وكلمة المرور مطلوبة' },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: 'كلمة المرور قصيرة جداً' },
      { status: 400 }
    );
  }

  // محاكاة نجاح تسجيل الدخول
  return NextResponse.json({
    success: true,
    user: { email },
    message: 'تم تسجيل الدخول بنجاح',
  });
}
