
'use client'
import React, { useState } from 'react'
import Account from '@/components/Account'
import PersonalInfo from '@/components/PersonalInfo'

export default function Page() {
   const [ activeTab, setActiveTab] = useState('personal')
  return (
    <div className='pl-10 md:pl-20 lg:pl-36 space-x-5  mt-5'>
           <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            activeTab === 'personal' ? 'bg-purple-100 text-purple-700 font-semibold' : 'bg-gray-100'
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            activeTab === 'account' ? 'bg-purple-100 text-purple-700 font-semibold' : 'bg-gray-100'
          }`}
        >
          Account
        </button>
      </div>
      <div>
        {activeTab === 'personal' && <PersonalInfo />}
        {activeTab === 'account' && <Account />}
        </div>
    </div>
  )
}
