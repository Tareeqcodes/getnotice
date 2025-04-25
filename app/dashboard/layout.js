"use client"

import Dashbar from "@/components/dashbar"


export default function DashBoardLayout({children}) {
  return (
    <div className='flex h-screen'>
       <Dashbar />
       <main className="flex-1 p-2 mb-16 w-full md:p-10 overflow-y-scroll">
            {children}
       </main>
    </div>
  )
}
