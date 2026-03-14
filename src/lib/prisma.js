import { PrismaClient } from '@prisma/client';

const globalForPrisma = typeof globalThis !== 'undefined' ? globalThis : global;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}
export const prisma = globalForPrisma.prisma;
