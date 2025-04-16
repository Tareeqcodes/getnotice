'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '../../config/appwrite';

export default function Confirm() {
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        console.log({ userId, secret }); // Debug check

        if (userId && secret) {
          await account.createSession(userId, secret);
          router.push('/dashboard');
        } else {
          console.warn('Missing userId or secret');
          router.push('/login');
        }
      } catch (error) {
        console.error('Verification error:', error);
        router.push('/login');
      }
    };

    verifySession();
  }, [router]);

  return <div>Verifying your session...</div>;
}
