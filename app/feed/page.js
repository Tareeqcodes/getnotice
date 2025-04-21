import React from 'react'
import Search from '@/components/Search'
import Feeds from '@/components/Feeds'

export default function page() {
  return (
    <div className='min-h-screen text-center'>
      <div className='flex justify-center mt-8'>
        <Search />
      </div>
      <div className='mt-8'>
        <h2 className='text-2xl font-semibold text-gray-800'>Latest Posts</h2>
       </div>
      
        <Feeds />
    </div>
  )
}
