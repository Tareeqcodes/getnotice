
"use client";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";

const Dashbar = () => {
  return (
    <aside className="hidden w-20 h-screen bg-white border-r border-gray-200 p-4 md:flex md:flex-col items-center md:items-start">  
      <nav className="space-y-9 mt-10 w-full">
        <Link href="/dashboard/setting" className="flex  flex-col items-center gap-3 text-gray-700 hover:text-purple-600">
          <FiSettings className="text-xl" />
          <span className="hidden text-xs md:inline">Setting</span>
        </Link> 
      </nav>
    </aside>
  );
};

export default Dashbar;
