'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '../../config/appwrite';
import { useAuth } from '@/context/authContext';

export default function Confirm() {
  const router = useRouter();
  const { refreshUser } = useAuth(); 

  useEffect(() => {
    const verifySession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const secret = urlParams.get('secret');

      console.log('Params:', { userId, secret });

      if (!userId || !secret) {
        console.warn('Missing credentials from URL');
        router.push('/login');
        return;
      }

      try {

       await account.createSession(userId, secret); 
        await refreshUser();
        console.log('Session created:', session);
        router.push('/dashboard');
      } catch (error) {
        console.error('Verification failed:', error.message);
        router.push('/login');
      }
    };

    verifySession();
  }, [router]);

  return <div className='h-screen'>Verifying session, please wait...</div>;
}
