
 'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
   const {user} = useAuth()
  return (
    
        <nav className="bg-gray-950 text-white px-6 py-4 flex justify-between items-center">
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
          <span className="text-xl font-bold text-white">Devs Realm</span>
          </Link>
          
        </motion.div>
           {user && (
             <div className="flex space-x-28 justify-between">
                <Link
                 className="hover:text-indigo-500 font-semibold text-base transition"
                 href="/feed">
                 Realm
                </Link>
                <Link
                 className="hover:text-indigo-500 font-semibold text-base transition"
     
               href="/post" >
                 Post 
               </Link >
             </div>
           )}

           {user ? (
              <Link
                href="/dashboard/setting"
                className="hover:text-indigo-500 font-semibold text-base pr-4 transition"
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
