import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const reviews = await prisma.review.findMany();
  return NextResponse.json({ reviews });
}
