'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp } from 'react-icons/fi';
import { Switch } from "@headlessui/react";
import { Star } from 'lucide-react';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export default function PostCard({ user, projects }) {
  // Check if projects is an array or a single project object
  const projectsArray = Array.isArray(projects) ? projects : [projects];
  
  return (
    <div className="overflow-hidden shadow-lg bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="p-5 max-h-40"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{user?.name || 'Unknown Dev'}</h4>
                <p className="text-xs text-gray-500">{user?.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Available</span>
              <Switch
                checked={user?.openToWork}
                disabled
                className={`${
                  user?.openToWork ? "bg-green-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    user?.openToWork ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {user?.skills?.split(',').map((skill, idx) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {skill.trim()}
              </span>
            ))}
          </div>
           
          <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between">
            <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-blue-50 text-blue-800 px-4 py-2 cursor-pointer rounded-md text-sm">
              View Profile
             </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-semibold rounded-lg transition"
            >
              <FiThumbsUp className="text-purple-700" /> Endorse
            </motion.button>
          </div>
        </motion.div>

        <div className="bg-gray-50 p-5 border-l border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Projects</h3>
            <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
              <Star size={14} className="mr-1" fill="currentColor" />
              Featured
            </div>
          </div>
          <div className="space-y-4">
            {projectsArray.map(project => {
              // Generate image URL for each project if imageFile exists
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
                      className="rounded-md max-h-full  object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}