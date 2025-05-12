
export default function DashBoardLayout({children}) {
  return (
    <div className='flex h-screen'>

       <main className="flex-1 p-2 mb-16 w-full md:p-10 overflow-y-scroll">
            {children}
       </main>
    </div>
  )
}
