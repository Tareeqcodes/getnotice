'use client'
import { useEffect, useState } from 'react'
import { databases } from '@/config/appwrite'
import PostCard from './PostCard'

export default function Feeds() {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postRes, userRes] = await Promise.all([
                    databases.listDocuments(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID
                    ),
                    databases.listDocuments(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
                    )
                ])

                setPosts(postRes.documents)
                setUsers(userRes.documents)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!posts.length) return <div>No posts found</div>

    const mapUsers = users.map(user => {
        const userProjects = posts.filter(post => post.user_id === user.user_id)
        return { user, projects: userProjects }
    }).filter(u => u.projects.length > 0)

    return (
        <div className="grid gap-3 mx-16 grid-cols-1 md:grid-cols-3">
            {mapUsers.map(({ user, projects }) => (
             <PostCard key={user.user_id} user={user} projects={projects} />
            ))}
        </div>
    )
}












'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiGithub, FiExternalLink } from 'react-icons/fi';
import { Switch } from "@headlessui/react";

export default function PostCard({ user, projects }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-2 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="items-center justify-center pt-1 text-justify">
            <h4 className="font-semibold text-gray-800">{user?.name || 'Unknown Dev'}</h4>
            <p className="text-xs text-gray-500">Developer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Available</span>
          <Switch
            checked={user.openToWork}
            disabled
            className={`${
              user.openToWork ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex h-5 w-10 items-center rounded-full`}
          >
            <span
              className={`${
                user.openToWork ? "translate-x-5" : "translate-x-1"
              } inline-block h-3 w-3 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-3 mb-4">
        {user?.skills?.split(',').map((skill, idx) => (
          <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
            #{skill.trim()}
          </span>
        ))}
      </div>
         <div className="flex items-center justify-between">
           <button className="font-medium cursor-pointer text-green-600 hover:underline text-sm">
             Interested/Hire
           </button>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-purple-600 cursor-pointer hover:underline"
      >
        {expanded ? 'Hide Projects' : 'Show Projects'}
      </button>
         </div>
      {expanded && (
        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="border p-4 rounded-lg bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{project.description}</p>
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center gap-1">
                    <FiGithub /> GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center gap-1">
                    <FiExternalLink /> Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center cursor-pointer gap-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-semibold rounded-lg transition"
        >
          <FiThumbsUp /> Endorse
        </motion.button>
      </div>
    </motion.div>
  );
}