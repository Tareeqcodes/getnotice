'use client';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Redirect will handle this

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}