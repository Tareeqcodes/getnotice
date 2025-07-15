'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiGithub, FiExternalLink, FiMessageSquare } from 'react-icons/fi';
import { Star, Zap, CircleDot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export default function PostCard({ user, projects }) {
  const { calculateUserMatchStrength } = useUser();
  const projectsArray = Array.isArray(projects) ? projects : [projects];
  const matchData = useMemo(() => calculateUserMatchStrength(user, projectsArray), [user, projectsArray]);

  // Ensure user has a name
  const displayName = user?.name || 'Anonymous Dev';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="overflow-hidden shadow-lg bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left Column - Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5"
        >
          {/* Header with Avatar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                {initials}
              </div>
              {user?.openToWork && (
                <div className="absolute px-2 py-0.5 rounded-full -bottom-1 -right-1 bg-green-500 text-white text-xs border-2 border-white">
                  Open to work
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800">{displayName}</h4>
                {matchData.expertiseLevel && (
                  <span className="bg-indigo-100 px-2 py-0.5 rounded-full text-xs font-medium text-indigo-800">
                    {matchData.expertiseLevel.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{user?.title || 'Full Stack Developer'}</p>
            </div>
          </div>

          {/* Match Strength - IMPROVED */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-500 flex items-center">
                <Zap size={12} className="text-amber-500 mr-1" />
                Fit Score
              </span>
              <div className="flex items-center">
                <span className="text-xs font-bold text-amber-600 mr-1">
                  {matchData.matchStrength}%
                </span>
                <CircleDot size={10} className={matchData.matchStrength > 70 ? 'text-green-500' : 'text-yellow-500'} />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  matchData.matchStrength > 70 ? 'bg-green-500' : 
                  matchData.matchStrength > 40 ? 'bg-amber-400' : 'bg-red-400'
                }`} 
                style={{ width: `${matchData.matchStrength}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Based on {projectsArray.length} projects and your needs
            </p>
          </div>

          {/* Skills - LIMITED TO 5 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {user?.skills?.split(',').slice(0, 5).map((skill, idx) => (
              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                {skill.trim()}
              </span>
            ))}
            {user?.skills?.split(',').length > 5 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                +{user.skills.split(',').length - 5}
              </span>
            )}
          </div>
           
          {/* CTA Buttons - IMPROVED */}
          <div className="flex justify-between gap-2">
            <Link href={`/profile/${user.$id}`} className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm font-medium rounded-lg transition"
              >
                View Profile
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition"
            >
              <FiMessageSquare size={14} />
              Contact
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column - Featured Project */}
        <div className="bg-gray-50 p-5 border-l border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-xs font-medium text-amber-600">
              <Star size={14} className="mr-1" fill="currentColor" />
              Featured Project
            </div>
            {projectsArray.length > 1 && (
              <span className="text-xs text-gray-500">
                +{projectsArray.length - 1} more
              </span>
            )}
          </div>
        
          {[projectsArray[0]].map(project => {
            const imageUrl = project.imageFile 
              ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${project.imageFile}/view?project=${projectId}`
              : '/images/project-placeholder.png';
              
            return (
              <motion.div 
                key={project.$id} 
                whileHover={{ y: -2 }}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {project.title || 'Untitled Project'}
                    </h5>
                   
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project?.techStack?.split(',').slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {tech.trim()}
                        </span>
                      ))}
                      {project?.techStack?.split(',').length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                          +{project.techStack.split(',').length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">    
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank"
                          className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1"
                        >
                          <FiGithub size={14} /> Code
                        </a>
                      )}
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank"
                          className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1"
                        >
                          <FiExternalLink size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative h-24 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={imageUrl}
                      fill
                      alt={project.title || 'Project screenshot'}
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}