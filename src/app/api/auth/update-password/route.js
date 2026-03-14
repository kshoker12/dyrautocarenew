import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const { current_password, password } = body;
    const user = await prisma.user.findUnique({ where: { id: token.id } });
    if (!user || !(await bcrypt.compare(current_password, user.password))) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { id: token.id }, data: { password: hashed } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
