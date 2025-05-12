'use client'
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Zap, ThumbsUp, Github, Mail, Linkedin, Twitter, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { databases, Query } from '@/config/appwrite';
import Showcase from '@/components/DevProfile/Showcase';
import UserProject from '@/components/DevProfile/UserProject';
import UserSkill from '@/components/DevProfile/UserSkill';
import Impact from '@/components/DevProfile/Impact';
import Spinner from '@/components/Spinner';


export default function page() {
  const [activeTab, setActiveTab] = useState('showcase');
  const params = useParams();
  const { id } = params;
  const [currentUser, setCurrenUser] = useState(null)
  // const [userProjects, setUserProjects] = useState([])
  const { calculateUserMatchStrength, allProjects } = useUser();
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
          id
        );
        setCurrenUser(userResponse);
      } catch (error) {
        console.log('Error fetching user:', error);
      } finally {
        setLoading(false)
      }
    };

    // const fetchProjects = async () => {
    //   try {
    //     const projectsResponse = await databases.listDocuments(
    //       process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
    //       process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID,
    //       [Query.equal('user_id', id)]
    //     );
    //     setUserProjects(projectsResponse.documents || []);
    //   } catch (error) {
    //     console.log('Error fetching projects:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchUser();
    // fetchProjects();
  }, [id]);

 const userProjects = useMemo(() => {
  return currentUser ? allProjects.filter(project => project.user_id === currentUser.id) : [];
}, [currentUser, allProjects]);


const matchData = useMemo(() => {
  if (currentUser && userProjects) {
    const projectsArray = Array.isArray(userProjects) ? userProjects : [userProjects];
    return calculateUserMatchStrength(currentUser, projectsArray);
  }
  return null;
}, [currentUser, userProjects]);


  if(loading || !allProjects) {
    return <Spinner />
  }
  if(!currentUser) {
    return <div>User not found</div>
  }

  return (
    <div className="max-w-4xl max-h-screen overflow-y-scroll mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
            <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <div className="px-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-700 border-4 border-white dark:border-slate-700 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 relative">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'D'}
                  {currentUser?.openToWork && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full px-2 py-1 font-medium border-2 border-white dark:border-slate-700">
                      HIRE
                    </div>
                  )}
                </div>
                
                <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                          {currentUser?.name || 'Developer'}
                        </h1>
                       
                        {matchData?.expertiseLevel && (
                          <div className="ml-3 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded text-sm font-semibold text-indigo-800 dark:text-indigo-300">
                            {matchData.expertiseLevel.label}
                          </div>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {currentUser?.title || 'Full Stack Developer'}
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-semibold rounded-lg transition"
                    >
                      <ThumbsUp className="text-purple-700" /> Endorse
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Match Strength */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                    <Zap size={14} className="text-amber-500 mr-1" />
                    Match Strength
                  </span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    {matchData?.matchStrength || 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full" 
                    style={{ width: `${matchData?.matchStrength || 0}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Bio and Social Links */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2">
                  <p className="text-slate-600 dark:text-slate-300">
                    {currentUser?.bio || 'Full stack developer passionate about building great user experiences.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 items-start justify-start lg:justify-end">
                  <a href='#' target="_blank" rel="noopener noreferrer" 
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                    <Github size={20} />
                  </a>
                  <a href='#' target="_blank" rel="noopener noreferrer" 
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                    <Linkedin size={20} />
                  </a>
                  <a href='#' target="_blank" rel="noopener noreferrer" 
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                    <Twitter size={20} />
                  </a>
                  <a href='#' target="_blank" rel="noopener noreferrer" 
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                    <Globe size={20} />
                  </a>
                  <a href='#'
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
              
              {/* Skills Preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentUser?.skills?.split(',').slice(0, 8).map((skill, idx) => (
                  <span key={idx} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {skill.trim()}
                  </span>
                ))}
                {currentUser?.skills?.split(',').length > 8 && (
                  <span className="text-sm bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-medium">
                    +{currentUser.skills.split(',').length - 8} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex border-t border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setActiveTab('showcase')}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'showcase' 
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Showcase
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'skills' 
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Skills
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'projects' 
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('impact')}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'impact' 
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Impact
              </button>
            </div>
          </div>
    
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          {activeTab === 'showcase' && <Showcase  />}
            {activeTab === 'skills' && <UserSkill />}
            {activeTab === 'projects' && <UserProject  projects={allProjects || []} />}
            {activeTab === 'impact' && <Impact />}
          </div>
        </div>
  )
}
