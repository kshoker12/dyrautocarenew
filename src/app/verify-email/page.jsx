'use client';

import Link from 'next/link';
import { route } from '@/lib/routes';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Verify your email</h2>
        <p className="text-gray-600 mb-4">Thanks for signing up! We have sent a verification link to your email address.</p>
        <Link href={route('login')} className="text-primary-orange hover:underline">Back to login</Link>
      </div>
    </div>
  );
}
