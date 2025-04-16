'use client';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-2xl font-semibold">Login to GetNotice</h1>
      {sent ? (
        <p className="text-green-600">Magic link sent! Check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 p-3 text-white hover:bg-indigo-700"
          >
            Send Magic Link
          </button>
        </form>
      )}
    </div>
  </div>
  );
}