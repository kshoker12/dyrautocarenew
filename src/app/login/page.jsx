'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import { route } from '@/lib/routes';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const status = searchParams.get('status');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setProcessing(false);
    if (res?.error) {
      setError('Invalid email or password.');
      return;
    }
    router.push(route('dashboard'));
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Log in</h2>
        {status && <div className="font-medium text-sm text-green-600">{status}</div>}
        {error && <InputError message={error} />}
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={email}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <Link href={route('password.request')} className="underline text-sm text-gray-600 hover:text-gray-900">
              Forgot your password?
            </Link>
            <PrimaryButton type="submit" className="ms-4" disabled={processing}>
              Log in
            </PrimaryButton>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account? <Link href={route('register')} className="text-primary-orange hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
