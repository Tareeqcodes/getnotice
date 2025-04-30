'use client'
import { useState } from "react";
import { Search } from "lucide-react"
import WeeklyDev from "./WeeklyDev";
import Ranking from "./Ranking";
import Jobs from "./Jobs";
import MyProjects from "./MyProjects";

export default function FeedNav() {
    const [activeTab, setActiveTab] = useState('discover');


  return (
         <div className="bg-white p-3 mx-auto md:mx-16 mt-5 shadow">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            className="bg-transparent w-full outline-none text-sm" 
            placeholder="Search skills, projects, developers..."
          />  
        </div>
        <div className="flex bg-white shadow border-b">
        <button 
          onClick={() => setActiveTab('discover')} 
          className={`flex-1 py-3 text-center ${activeTab === 'discover' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
        >
          Discover
        </button>
        <button 
          onClick={() => setActiveTab('rankings')} 
          className={`flex-1 py-3 text-center ${activeTab === 'rankings' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
        >
          Rankings
        </button>
        <button 
          onClick={() => setActiveTab('jobs')} 
          className={`flex-1 py-3 text-center ${activeTab === 'jobs' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
        >
          Jobs
        </button>
        <button 
          onClick={() => setActiveTab('project')} 
          className={`flex-1 py-3 text-center ${activeTab === 'project' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
        >
          Projects
        </button>
      </div>
      <div>
        {activeTab === 'discover' && <WeeklyDev />}
        {activeTab === 'rankings' && <Ranking />}
        {activeTab === 'jobs' && <Jobs />}
        {activeTab === 'project' && <MyProjects />}
      </div>
      </div>
  )
}
