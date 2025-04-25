'use client';

import Link from "next/link";
import { FiHome, FiPlus, FiSettings } from "react-icons/fi";
import { HiOutlineUserGroup } from 'react-icons/hi'
import { useAuth } from "@/context/authContext";

export default function Bottomnav() {
  const {user} = useAuth()


  return (
    
    <>
     { user && (
       <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t border-gray-200 shadow md:hidden">
       <div className="flex justify-between items-center px-6 py-3">
         <Link href="/" className="flex flex-col items-center text-white hover:text-purple-600">
           <FiHome className="text-xl" />
           <span className="text-xs">Home</span>
         </Link>
 
         <Link href="/feed" className="flex flex-col items-center text-white hover:text-purple-600">
           <HiOutlineUserGroup className="text-xl" />
           <span className="text-xs">Realm</span>
         </Link>
 
         <Link href="/post" className="flex flex-col items-center text-white hover:text-purple-600">
           <FiPlus className="text-xl" />
           <span className="text-xs">posts</span>
         </Link>
 
         <Link href="/dashboard/setting" className="flex flex-col items-center text-white hover:text-purple-600">
           <FiSettings className="text-xl" />
           <span className="text-xs">Settings</span>
         </Link>
       </div>
     </nav>
     )}
    </>
    
  );
}
