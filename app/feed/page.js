
import Feeds from '@/components/Feeds'

export default function page() {
  return (
    <div className='min-h-screen items-center text-center'>
        <h1 className="text-xl px-2 md:text-3xl mt-10 py-10 text-black">
        Explore top developers, their skills, and their work. Get inspired.
        </h1>
      <div className='mb-10 overflow-y-scroll'>
        <Feeds />
      </div>
    </div>
  )
}
