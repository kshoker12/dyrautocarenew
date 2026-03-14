'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import { route } from '@/lib/routes';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (password !== passwordConfirmation) {
      setErrors({ password: 'Passwords do not match.' });
      return;
    }
    setProcessing(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setProcessing(false);
    if (!res.ok) {
      setErrors({ email: data.error || 'Registration failed' });
      return;
    }
    router.push(route('login') + '?status=Registration successful. You can now log in.');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={name}
              className="mt-1 block w-full"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
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
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={passwordConfirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <PrimaryButton type="submit" className="w-full" disabled={processing}>
              Register
            </PrimaryButton>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href={route('login')} className="text-primary-orange hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
