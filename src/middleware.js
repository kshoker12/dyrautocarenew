import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path = request.nextUrl.pathname;
  const protectedPaths = ['/dashboard', '/profile'];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return Response.redirect(loginUrl);
  }
  return Response.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
