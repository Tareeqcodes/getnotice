import Dashbar from "@/components/dashbar"


export default function dashBoardLayout({children}) {
  return (
    <div className='flex h-screen'>
       <Dashbar />
       <main className="flex-1 p-10">
            {children}
       </main>
    </div>
  )
}
