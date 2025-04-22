import React from 'react'
import Search from '@/components/Search'
import Feeds from '@/components/Feeds'

export default function page() {
  return (
    <div className='min-h-screen text-center'>
      <div className='flex justify-center mt-8'>
        <Search />
      </div>
      <div className='justify-center mt-8 '>
        <Feeds />
      </div>
    </div>
  )
}
