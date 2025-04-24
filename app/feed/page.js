import React from 'react'
import Search from '@/components/Search'
import Feeds from '@/components/Feeds'

export default function page() {
  return (
    <div className='min-h-screen text-center'>
      <div className=' hidden md:flex justify-center mt-8'>
        <Search />
      </div>
      <div className='mt-10'>

        <Feeds />
      </div>
    </div>
  )
}
