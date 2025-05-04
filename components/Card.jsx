"use client"
import { useState } from 'react';
import { Zap, LucideBarChart2, Code, Star, Award } from 'lucide-react';

export default function Card() {
  const [activeTab, setActiveTab] = useState('showcase');
  
  return (
    <div className="w-full max-w-md rounded-xl my-5 overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">

      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 h-24"></div>
        
        
        <div className="pt-6 px-4 flex items-center relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-xl font-bold text-indigo-600">
              D
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1 py-0.5 font-medium border border-white dark:border-slate-800">
              HIRE
            </div>
          </div>
          
          {/* Name and specialized title */}
          <div className="ml-4">
            <div className="flex items-center">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">DevXplore</h3>
              <div className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded text-xs font-medium text-indigo-800 dark:text-indigo-300">
                Top 5%
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">React Native Specialist</p>
          </div>
        </div>
        
        {/* Match Strength Indicator */}
        <div className="px-4 pb-2 pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center">
              <Zap size={12} className="text-amber-500 mr-1" />
              Match Strength
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">92%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full w-11/12"></div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => setActiveTab('showcase')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'showcase' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Showcase
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'skills' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Skills
        </button>
        <button 
          onClick={() => setActiveTab('impact')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'impact' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Impact
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'showcase' && (
          <div>
            {/* Featured Project */}
            <div className="mb-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-800 dark:text-white">Accessibility Toolkit</h4>
                <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <Star size={14} className="mr-1" fill="currentColor" />
                  Featured
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                A React Native library that improves app accessibility for visually impaired users
              </p>
              
              <div> 
                <div className="bg-slate-100 dark:bg-slate-600 px-2 py-0.5 rounded text-xs font-medium text-slate-600 dark:text-slate-300">
                  Open Source
                </div>
              </div>
            </div>
            
            {/* Problem Solved */}
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
              <h4 className="font-medium text-slate-800 dark:text-white mb-2">Problem Solved</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Reduced app bundle size by 42% while maintaining feature parity by implementing code splitting and lazy loading components.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'skills' && (
          <div>
            {/* Skill Specializations */}
            <div className="mb-4">
              <h4 className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500 mb-2">Specialized In</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-md p-2">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-indigo-800 dark:text-indigo-300 text-sm">React Native</span>
                    <span className="ml-auto text-xs text-indigo-600 dark:text-indigo-400">Expert</span>
                  </div>
                  <div className="w-full bg-indigo-200 dark:bg-indigo-700/30 rounded-full h-1">
                    <div className="bg-indigo-600 dark:bg-indigo-400 h-1 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-md p-2">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-indigo-800 dark:text-indigo-300 text-sm">TypeScript</span>
                    <span className="ml-auto text-xs text-indigo-600 dark:text-indigo-400">Advanced</span>
                  </div>
                  <div className="w-full bg-indigo-200 dark:bg-indigo-700/30 rounded-full h-1">
                    <div className="bg-indigo-600 dark:bg-indigo-400 h-1 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Skills */}
            <div>
              <h4 className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500 mb-2">Additional Skills</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">Redux</span>
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">Jest</span>
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">GraphQL</span>
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">Node.js</span>
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">Firebase</span>
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">+3 more</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'impact' && (
          <div>
            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 flex flex-col items-center justify-center">
                <LucideBarChart2 size={20} className="text-emerald-500 mb-1" />
                <span className="text-lg font-bold text-slate-800 dark:text-white">28k+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">users</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 flex flex-col items-center justify-center">
                <Code size={20} className="text-blue-500 mb-1" />
                <span className="text-lg font-bold text-slate-800 dark:text-white">42</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Repositories</span>
              </div>
            </div>
            
            {/* Endorsements */}
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800 dark:text-white flex items-center">
                  <Award size={16} className="text-amber-500 mr-1" />
                  Recent Endorsements
                </h4>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">26 total</span>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-800">S</div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Sarah Chen</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Frontend Lead at Acme Inc</div>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                "Exceptional React Native skills. Solved our performance issues in days."
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex justify-between items-center">
          <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white">
            View Profile
          </button>
        
      </div>
    </div>
  );
}