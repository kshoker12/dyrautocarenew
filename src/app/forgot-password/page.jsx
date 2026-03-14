'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import { route } from '@/lib/routes';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus('');
    setProcessing(true);
    // TODO: implement send reset link API (email with token)
    setProcessing(false);
    setStatus('If an account exists for that email, we have sent a password reset link.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Forgot your password?</h2>
        {status && <div className="font-medium text-sm text-green-600">{status}</div>}
        <InputError message={errors.email} />
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={email}
              className="mt-1 block w-full"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Link href={route('login')} className="text-sm text-primary-orange hover:underline">
              Back to login
            </Link>
            <PrimaryButton type="submit" disabled={processing}>
              Email Password Reset Link
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
