'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp } from 'react-icons/fi';
import { Switch } from "@headlessui/react";

export default function PostCard({ user, onShowProjects }) {
  

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
        onClick={onShowProjects}
        
        className="text-sm text-purple-600 cursor-pointer hover:underline"
      >
       Best Projects
      </button>
         </div>
      

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