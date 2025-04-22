'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FiThumbsUp,
  FiGithub,
  FiExternalLink,
} from 'react-icons/fi';

export default function PostCard({ post, user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6 max-w-3xl mx-auto hover:shadow-xl transition-shadow"
    >
      <div className="items-center flex gap-3 mb-4 justify-between">
        <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{user?.name || 'Unknown Dev'}</h4>
          <p className="text-xs text-gray-500 flex items-center gap-1">Developer</p>
        </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
        {post.techStack?.split(',').map((tech, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium"
          >
            #{tech.trim()}
          </span>
        ))}
      </div>
      </div>
          <div className="text-justify py-3">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post.description}</p>
          </div>

      <div className="flex items-center border-t border-gray-100 justify-between mt-4">
        <div className="flex pt-3 gap-4">
          {post.githubUrl && (
            <a href={post.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center gap-1">
              <FiGithub /> GitHub
            </a>
          )}
          {post.demoUrl && (
            <a href={post.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center gap-1">
              <FiExternalLink /> Demo
            </a>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 mt-3 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-semibold rounded-lg transition"
        >
          <FiThumbsUp /> Endorse
        </motion.button>
      </div>
    </motion.div>
  );
}
