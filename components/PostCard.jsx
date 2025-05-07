'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiGithub, FiExternalLink } from 'react-icons/fi';
import { Star, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export default function PostCard({ user, projects }) { 
  const { calculateUserMatchStrength } = useUser();
  const projectsArray = Array.isArray(projects) ? projects : [projects];
  const matchData = useMemo(() => calculateUserMatchStrength(user, projectsArray), [user, projectsArray]);

  return (
    <div className="overflow-hidden shadow-lg bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-20 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="p-5 max-h-40"
        >
          <div className="flex flex-col justify-between text-justify mb-4">  
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                {user?.openToWork && (
                  <div className="absolute px-1 rounded -bottom-1 -right-1 bg-green-500 text-white text-xs">
                    Hire
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-semibold text-gray-800">{user?.name || 'Unknown Dev'}</h4>
                  {matchData.expertiseLevel && (
              <div className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 py-0 rounded text-xs font-semibold text-indigo-800">
              {matchData.expertiseLevel.label}
               </div>
                )}

                </div>
                <p className="text-xs text-gray-500">{user?.title}</p>
              </div>
            </div>
            <div className="px-4 pb-2 pt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center">
                  <Zap size={12} className="text-amber-500 mr-1" />
                  Match Strength
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{matchData.matchStrength}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full" 
                  style={{ width: `${matchData.matchStrength}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {user?.skills?.split(',').map((skill, idx) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {skill.trim()}
              </span>
            ))}
          </div>
           
          <div className="mb-10 mt-5 flex justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-50 text-blue-800 px-2 py-1 cursor-pointer rounded-md text-sm"
            >
              <Link
               href={`/profile/${user.$id}`}>
              View Profile
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer gap-2 px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-semibold rounded-lg transition"
            >
              <FiThumbsUp className="text-purple-700" /> Endorse
            </motion.button>
          </div>
        </motion.div>

        <div className="bg-gray-50 p-5 border-l border-gray-100">
            <div className="flex mb-5 items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
              <Star size={14} className="mr-1" fill="currentColor" />
              Featured Project
            </div>
        
          <div className="overflow-hidden">
            {[projectsArray[0]].map(project => {
              const imageUrl = project.imageFile 
                ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${project.imageFile}/view?project=${projectId}`
                : '/images/1.png';
                
              return (
                <div key={project.$id} className="bg-white items-center grid grid-cols-2 justify-between p-3 rounded-lg shadow-sm">
                  <div>
                    <h5 className="font-semibold cursor-pointer hover:underline text-gray-800 mb-1">{project.title}</h5>
                   
                    <div className="flex flex-wrap mt-4 gap-2">
                      {project?.techStack?.split(',').map((tech, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          #{tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex mt-4 gap-4">    
                      <a href={project.githubUrl} target="_blank" className="text-gray-600 text-xs flex items-center gap-1">
                        <FiGithub /> GitHub
                      </a>
                      <a href={project.demoUrl} target="_blank" className="text-gray-600 text-xs flex items-center gap-1">
                        <FiExternalLink /> Demo
                      </a>
                    </div>
                  </div>
                  <div className="flex w-full h-24 overflow-hidden items-center justify-center">
                    <Image
                      src={imageUrl}
                      height={100}
                      width={112}
                      alt={project.title || 'Project image'}
                      className="rounded-md max-h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
            {projectsArray.length > 1 && (
              <div className="text-center text-xs text-gray-500 mt-2">
                +{projectsArray.length - 1} more projects
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}