
"use client";
import Link from "next/link";
import { FiHome, FiSettings } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa";


const Dashbar = () => {
  return (
    <aside className="w-20 h-screen bg-white border-r border-gray-200 p-4 flex flex-col items-center justify-between md:items-start">  
      <nav className="space-y-9 mt-10 w-full">
        <Link href="/dashboard" className="flex flex-col items-center gap-3 text-gray-700 hover:text-purple-600">
          <FiHome className="text-xl" />
          <span className="hidden text-xs md:inline">Home</span>
        </Link>
        
        <Link href="/dashboard/post" className="flex  flex-col items-center gap-3 text-gray-700 hover:text-purple-600">
          <FaPlus className="text-xl" />
          <span className="hidden text-xs md:inline">Post</span>
        </Link> 
        <Link href="/dashboard/setting" className="flex  flex-col items-center gap-3 text-gray-700 hover:text-purple-600">
          <FiSettings className="text-xl" />
          <span className="hidden text-xs md:inline">Setting</span>
        </Link> 
      </nav>
        <div className="mb-10 items-center">
            <button className="flex flex-col items-center gap-1 text-gray-700 cursor-pointer hover:text-purple-600">
                <IoIosLogOut className="text-xl" />
                <span className="hidden text-xs md:inline">Logout</span>
            </button>
        </div>
    </aside>
  );
};

export default Dashbar;
