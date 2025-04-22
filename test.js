'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiGithub, FiExternalLink, FiUser, FiArrowUpRight } from 'react-icons/fi';

export default function PostCard({ post, user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-800/20 border border-gray-100 dark:border-gray-700 p-6 mb-6 max-w-3xl mx-auto hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-gray-900/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* User Header Section */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md"
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </motion.div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100">
                {user?.name || 'Unknown Dev'}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FiUser className="inline" /> Developer
              </p>
            </div>
          </div>
          
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2">
            {post.techStack?.split(',').map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full font-medium shadow-sm"
              >
                #{tech.trim()}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold dark:text-gray-100 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-4">
            {post.githubUrl && (
              <motion.a
                whileHover={{ y: -2 }}
                href={post.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <FiGithub className="text-lg" />
                <span className="text-sm font-medium">Source Code</span>
                <FiArrowUpRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}
            {post.demoUrl && (
              <motion.a
                whileHover={{ y: -2 }}
                href={post.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <FiExternalLink className="text-lg" />
                <span className="text-sm font-medium">Live Demo</span>
                <FiArrowUpRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <FiThumbsUp className="text-lg" />
            <span>Endorse</span>
            <span className="ml-1 bg-white/20 px-2 py-1 rounded text-xs">42</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}