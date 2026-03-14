'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import { route } from '@/lib/routes';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (password !== passwordConfirmation) {
      setErrors({ password: 'Passwords do not match.' });
      return;
    }
    setProcessing(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    setProcessing(false);
    if (!res.ok) {
      setErrors({ password: data.error || 'Failed to reset password' });
      return;
    }
    setStatus('Password reset. You can now log in.');
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid or missing reset token. <Link href={route('password.request')} className="text-primary-orange">Request a new link</Link>.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Reset password</h2>
        {status && <div className="font-medium text-sm text-green-600">{status}</div>}
        <InputError message={errors.password} />
        <form onSubmit={submit}>
          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={password}
              className="mt-1 block w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={passwordConfirmation}
              className="mt-1 block w-full"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <PrimaryButton type="submit" className="w-full" disabled={processing}>
              Reset Password
            </PrimaryButton>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href={route('login')} className="text-primary-orange hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
