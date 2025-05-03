"use client"
import { useState, useEffect } from 'react';
import { Eye, ThumbsUp, Zap, BarChart2, Code, Users, Star, Award } from 'lucide-react';
import { databases, Query } from '@/config/appwrite';

export default function VisibilityCard({ developerId }) {
  const [activeTab, setActiveTab] = useState('showcase');
  const [developer, setDeveloper] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [endorsements, setEndorsements] = useState([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    async function fetchDeveloperData() {
      try {
        // Fetch developer details
        const developerData = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID, 
          process.env.NEXT_PUBLIC_APPWRITE_DEVELOPER_ID, 
          developerId
        );
        setDeveloper(developerData);
        
        // Fetch developer skills
        const skillsData = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_SKILLS_ID,
          [Query.equal('developerId', developerId)]
        );
        setSkills(skillsData.documents);
        
        // Fetch developer projects
        const projectsData = await databases.listDocuments(
         process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECTSCOLLECTION_ID,
          [Query.equal('developerId', developerId)]
        );
        setProjects(projectsData.documents);
        
        // Fetch recent endorsements
        const endorsementsData = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ENDORSE_ID,
          [
            Query.equal('developerId', developerId),
            Query.limit(5)
          ]
        );
        setEndorsements(endorsementsData.documents);
        
        // Increment view count
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
            process.env.NEXT_PUBLIC_APPWRITE_PROJECTSCOLLECTION_ID,
          developerId,
          { viewCount: developerData.viewCount + 1 }
        );
        
      } catch (error) {
        console.error('Error fetching developer data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDeveloperData();
  }, [developerId]);
  
  if (loading) {
    return (
      <div className="w-full max-w-md rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 p-4">
        <div className="animate-pulse flex flex-col">
          <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-16 w-16"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!developer) {
    return <div>Developer not found</div>;
  }
  
  // Find featured project
  const featuredProject = projects.find(project => project.isFeatured) || projects[0];
  
  // Find specialty skills
  const specialtySkills = skills.filter(skill => skill.isSpecialty);
  
  // Find regular skills
  const regularSkills = skills.filter(skill => !skill.isSpecialty);
  
  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Top Section - Developer Info */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 h-24"></div>
        
        {/* Visibility Stats */}
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 rounded-full px-2 py-1 flex items-center text-xs font-medium shadow-sm">
          <Eye size={14} className="text-slate-500 mr-1" />
          <span className="text-slate-700 dark:text-slate-300">{developer.weeklyViews} views this week</span>
        </div>
        
        <div className="pt-6 px-4 flex items-center relative z-10">
          {/* Avatar with specialized indicator */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-xl font-bold text-indigo-600">
              {developer.name ? developer.name.charAt(0) : 'D'}
            </div>
            {developer.availability && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1 py-0.5 font-medium border border-white dark:border-slate-800">
                {developer.availability}
              </div>
            )}
          </div>
          
          {/* Name and specialized title */}
          <div className="ml-4">
            <div className="flex items-center">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{developer.name}</h3>
              {developer.isTopPerformer && (
                <div className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded text-xs font-medium text-indigo-800 dark:text-indigo-300">
                  Top 5%
                </div>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{developer.title}</p>
          </div>
        </div>
        
        {/* Match Strength Indicator */}
        <div className="px-4 pb-2 pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center">
              <Zap size={12} className="text-amber-500 mr-1" />
              Match Strength
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{developer.matchScore}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full" 
              style={{ width: `${developer.matchScore}%` }}
            ></div>
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
            {featuredProject && (
              <div className="mb-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-800 dark:text-white">{featuredProject.title}</h4>
                  <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
                    <Star size={14} className="mr-1" fill="currentColor" />
                    Featured
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  {featuredProject.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <ThumbsUp size={12} className="mr-1" />
                    <span>{featuredProject.endorsementCount} endorsements</span>
                  </div>
                  {featuredProject.isOpenSource && (
                    <div className="bg-slate-100 dark:bg-slate-600 px-2 py-0.5 rounded text-xs font-medium text-slate-600 dark:text-slate-300">
                      Open Source
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Problem Solved */}
            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
              <h4 className="font-medium text-slate-800 dark:text-white mb-2">Problem Solved</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {developer.problemSolved || "This developer hasn't added a problem-solution showcase yet."}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'skills' && (
          <div>
            {/* Skill Specializations */}
            {specialtySkills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500 mb-2">Specialized In</h4>
                <div className="grid grid-cols-2 gap-2">
                  {specialtySkills.map(skill => (
                    <div key={skill.$id} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-md p-2">
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-indigo-800 dark:text-indigo-300 text-sm">{skill.name}</span>
                        <span className="ml-auto text-xs text-indigo-600 dark:text-indigo-400">{skill.level}</span>
                      </div>
                      <div className="w-full bg-indigo-200 dark:bg-indigo-700/30 rounded-full h-1">
                        <div 
                          className="bg-indigo-600 dark:bg-indigo-400 h-1 rounded-full" 
                          style={{ 
                            width: skill.level === 'EXPERT' ? '100%' : 
                                  skill.level === 'ADVANCED' ? '85%' : 
                                  skill.level === 'INTERMEDIATE' ? '60%' : '40%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Skills */}
            {regularSkills.length > 0 && (
              <div>
                <h4 className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500 mb-2">Additional Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {regularSkills.map(skill => (
                    <span 
                      key={skill.$id} 
                      className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'impact' && (
          <div>
            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 flex flex-col items-center justify-center">
                <BarChart2 size={20} className="text-emerald-500 mb-1" />
                <span className="text-lg font-bold text-slate-800 dark:text-white">
                  {developer.impactMetrics?.downloads || '0'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Downloads</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 flex flex-col items-center justify-center">
                <Code size={20} className="text-blue-500 mb-1" />
                <span className="text-lg font-bold text-slate-800 dark:text-white">
                  {developer.impactMetrics?.repositories || '0'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Repositories</span>
              </div>
            </div>
            
            {/* Endorsements */}
            {endorsements.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800 dark:text-white flex items-center">
                    <Award size={16} className="text-amber-500 mr-1" />
                    Recent Endorsements
                  </h4>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {developer.totalEndorsements || endorsements.length} total
                  </span>
                </div>
                
                {endorsements.slice(0, 1).map(endorsement => (
                  <div key={endorsement.$id}>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-800">
                        {endorsement.endorserName ? endorsement.endorserName.charAt(0) : 'U'}
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {endorsement.endorserName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {endorsement.endorserTitle}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                      "{endorsement.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Connection Actions */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Users size={16} className="text-slate-400 mr-1" />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {developer.connectionsInCommon || 0} connections in common
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white">
            View Profile
          </button>
          <button className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}