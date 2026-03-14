import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, password } = body;
    if (!token || !password) return NextResponse.json({ error: 'Token and password required' }, { status: 400 });
    const record = await prisma.passwordResetToken.findFirst({
      where: { token },
    });
    if (!record) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.updateMany({ where: { email: record.email }, data: { password: hashed } });
    await prisma.passwordResetToken.delete({ where: { email: record.email } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 });
  }
}
