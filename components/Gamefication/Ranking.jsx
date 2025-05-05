'use client'
import { useState } from "react";
import Weekly from "./Weekly";
import Rising from "./Rising";
import Top from "./Top";

export default function Ranking() {
    const [activeRanking, setActiveRanking] = useState('weekly');

  return (
    <div className="p-5">
        <div className="bg-white rounded-lg shadow mb-4">
              <div className="flex">
                <button 
                  onClick={() => setActiveRanking('weekly')} 
                  className={`flex-1 py-3 text-center ${activeRanking === 'weekly' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                  Devs of the Week
                </button>
                <button 
                  onClick={() => setActiveRanking('rising')} 
                  className={`flex-1 py-3 text-center ${activeRanking === 'rising' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                  Rising Stars
                </button>
                <button 
                  onClick={() => setActiveRanking('top')} 
                  className={`flex-1 py-3 text-center ${activeRanking === 'top' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                  Top Contributors
                </button>
              </div>
            </div>
            
            {/* Ranking Categories */}
            <div className="bg-white rounded-lg shadow mb-4">
              <div className="p-3 border-b">
                <div className="flex items-center">
                  <select className="bg-gray-100 rounded-lg py-2 px-3 text-sm mr-2 border-0">
                    <option>All Categories</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Full Stack</option>
                    <option>Mobile</option>
                  </select>
                  <select className="bg-gray-100 rounded-lg py-2 px-3 text-sm border-0">
                    <option>All Technologies</option>
                    <option>React</option>
                    <option>Node.js</option>
                    <option>Python</option>
                    <option>JavaScript</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
                {activeRanking === 'weekly' && <Weekly />}
                {activeRanking === 'rising' && <Rising />}
                {activeRanking === 'top' && <Top />}
            </div>
    </div>
  )
}
