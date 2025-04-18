'use client';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Redirect will handle this

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <h1>Welcome, {user.email}</h1>
      <button className='text-2xl cursor-pointer bg-gray-300 p-3' onClick={() => logout()}>Logout</button>
    </div>
  );
}