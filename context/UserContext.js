'use client';
import { createContext, useContext, useState, useEffect, Children } from 'react';
import { useAuth } from './authContext';

const UserContext = createContext({Children});


export default function UserContext() {
  return (
    <div>UserContext</div>
  )
}
