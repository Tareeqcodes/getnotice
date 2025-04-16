
 'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
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
          <span className="text-xl font-bold text-white">GetNotice</span>
          </Link>
          
        </motion.div>
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
      </nav>
  )
}
