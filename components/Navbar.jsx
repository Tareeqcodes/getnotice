
 'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
   const {user} = useAuth()
  return (
    
        <nav className="bg-white text-gray-500 px-10 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center space-x-2"
          >
          <SparklesIcon className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-bold">Realm</span>
          </Link>
          
        </motion.div>
        
           {user && (
             <div className="flex space-x-1 items-center justify-between">
              <div className="hidden sm:ml-6 md:ml-0 sm:flex sm:space-x-8">
              <Link
                 className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                 href="/feed">
                 Realm
                </Link>
              <Link href="/challenges" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Challenges
              </Link>
              <Link href="/leaderboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Leaderboard
              </Link>
              <Link href="/jobs" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                For Employers
              </Link>
            </div>
                
             </div>
           )}

           {user ? (
              <Link
                href="/dashboard/setting"
                className="hover:text-indigo-500 hidden md:block font-semibold text-xs pr-4 transition"
               >
                
               Dashboard
              </Link>
           ) : (

            <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
           >
            <Link
              href="/login"
              className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Login
            </Link>
  
            </motion.div>
           )
           }
      </nav>
  )
}
