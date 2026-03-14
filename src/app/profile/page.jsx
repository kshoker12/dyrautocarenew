'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import { route } from '@/lib/routes';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name ?? '');
  const [email, setEmail] = useState(session?.user?.email ?? '');
  const [profileStatus, setProfileStatus] = useState('');
  const [profileError, setProfileError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteError, setDeleteError] = useState('');

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

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileStatus('');
    const res = await fetch('/api/auth/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setProfileError(data.error || 'Update failed');
      return;
    }
    setProfileStatus('Profile updated.');
    router.refresh();
  };

  const onUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordStatus('');
    if (password !== passwordConfirmation) {
      setPasswordError('Passwords do not match.');
      return;
    }
    const res = await fetch('/api/auth/update-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_password: currentPassword, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setPasswordError(data.error || 'Update failed');
      return;
    }
    setPasswordStatus('Password updated.');
    setCurrentPassword('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (deleteConfirm !== 'DELETE') {
      setDeleteError('Type DELETE to confirm.');
      return;
    }
    setDeleteError('');
    const res = await fetch('/api/auth/profile', { method: 'DELETE' });
    if (!res.ok) {
      setDeleteError('Delete failed.');
      return;
    }
    await signOut({ callbackUrl: route('home') });
    router.push(route('home'));
    router.refresh();
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Profile</h1>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <h2 className="text-lg font-medium mb-4">Profile Information</h2>
          {profileStatus && <p className="text-green-600 text-sm mb-2">{profileStatus}</p>}
          <InputError message={profileError} />
          <form onSubmit={onUpdateProfile}>
            <div>
              <InputLabel value="Name" />
              <TextInput value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full" required />
            </div>
            <div className="mt-4">
              <InputLabel value="Email" />
              <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full" required />
            </div>
            <PrimaryButton type="submit" className="mt-4">Save</PrimaryButton>
          </form>
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <h2 className="text-lg font-medium mb-4">Update Password</h2>
          {passwordStatus && <p className="text-green-600 text-sm mb-2">{passwordStatus}</p>}
          <InputError message={passwordError} />
          <form onSubmit={onUpdatePassword}>
            <div>
              <InputLabel value="Current Password" />
              <TextInput type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 block w-full" required />
            </div>
            <div className="mt-4">
              <InputLabel value="New Password" />
              <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full" required />
            </div>
            <div className="mt-4">
              <InputLabel value="Confirm Password" />
              <TextInput type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="mt-1 block w-full" required />
            </div>
            <PrimaryButton type="submit" className="mt-4">Update Password</PrimaryButton>
          </form>
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <h2 className="text-lg font-medium mb-4 text-red-600">Delete Account</h2>
          <InputError message={deleteError} />
          <p className="text-sm text-gray-600 mb-2">Once your account is deleted, all resources and data will be permanently deleted. Type DELETE to confirm.</p>
          <form onSubmit={onDelete}>
            <TextInput value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="DELETE" className="mt-1 block w-full" />
            <PrimaryButton type="submit" className="mt-4 bg-red-600 hover:bg-red-700">Delete Account</PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}
