
 'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
   const {user} = useAuth()
return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <SparklesIcon className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Devs Realm</span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {user ? (
              <>
                <NavLink href="/feed">Feed</NavLink>
                <NavLink href="/challenges">Challenges</NavLink>
                <NavLink href="/leaderboard">Leaderboard</NavLink>
                <NavLink href="/employers">For Employers</NavLink>
              </>
            ) : (
              <div className="flex space-x-4">
                <NavLink href="/about">How It Works</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <Link 
                href="/dashboard"
                className="ml-4 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition"
    >
      {children}
    </Link>
  );
}