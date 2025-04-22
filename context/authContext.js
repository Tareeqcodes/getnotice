'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { account, ID } from '../config/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        const user = await account.get();
        setUser(user);
        return;
      } else {
        setUser(null);
      }
    } catch (error) {
        setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email) => {
    try {
      await account.createMagicURLToken(
        ID.unique(),
        email,
        'http://localhost:3000/verify'
      );
       alert(' Check your email for the magic link!');
      toast.success( 'Check your email for the magic link!');
     
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    redirect('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);