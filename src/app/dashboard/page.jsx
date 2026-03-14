'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { route } from '@/lib/routes';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>You must be logged in. <Link href={route('login')} className="text-primary-orange">Log in</Link></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, {session.user?.name}.</p>
        <Link href={route('profile.edit')} className="mt-4 inline-block text-primary-orange hover:underline">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
