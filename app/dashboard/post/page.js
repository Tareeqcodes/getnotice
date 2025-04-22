 "use client"

import { useState } from 'react';
import { databases, ID } from '@/config/appwrite';
import { toast } from 'react-toastify';
import { FiGithub, FiGlobe, FiTag, FiFileText, FiCode, FiSend } from 'react-icons/fi';
import { useAuth } from '@/context/authContext';

export default function Page() {
   const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    detail: '',
    techStack: '',
    user_id: user.$id,
  });
  const reset = () => {
    setFormData({
      title: '',
      description: '',
      githubUrl: '',
      demoUrl: '',
      detail: '',
      techStack:'' ,
    });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const documentData = {
      title: formData.title,
      description: formData.description,
      githubUrl: formData.githubUrl,
      demoUrl: formData.demoUrl,
      detail: formData.detail,
      techStack: formData.techStack,
      user_id: user.$id,
    }
    
     try {
       await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID,
          ID.unique(),
          documentData,

        );
        toast.success('Project posted successfully!');
        alert('Project posted successfully!');
        reset();
     } catch (error) {
        toast.error('Error posting project: ' + error.message);
     } finally {
       setLoading(false);
     }
    
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Share Your Project
        </h1>
        <p className="text-gray-600">Showcase your work to the developer community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Field */}
          <div className="col-span-2">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiTag className="mr-2 text-blue-600" />
              Project Title
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-0 ring-2 ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                placeholder="e.g. Next.js Portfolio Site"
                required
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="col-span-2">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiCode className="mr-2 text-blue-600" />
              Technology Stack
            </label>
            <input
              name="techStack"
              type="text"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 ring-2 ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="React, Node.js, MongoDB..."
            />
            <p className="mt-1 text-sm text-gray-500">Separate technologies with commas</p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiGithub className="mr-2 text-blue-600" />
              GitHub Repository
            </label>
            <input
              name="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 ring-2 ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="https://github.com/your-username/repo"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiGlobe className="mr-2 text-blue-600" />
              Live Demo
            </label>
            <input
              name="demoUrl"
              type="url"
              value={formData.demoUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 ring-2 ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="https://your-project.demo"
            />
          </div>

          <div className="col-span-2">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiFileText className="mr-2 text-blue-600" />
              Project Summary
            </label>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 ring-2 ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="A brief elevator pitch of your project"
            />
          </div>

          <div className="col-span-2">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiFileText className="mr-2 text-blue-600" />
              Project Details
            </label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 ring-2 ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 min-h-[150px]"
              placeholder="Tell us about your project's features, challenges, and lessons learned..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              {/* Loading spinner SVG */}
            </svg>
          ) : (
            <FiSend className="mr-2" />
          )}
          {loading ? 'Publishing...' : 'Launch Project'}
        </button>
      </form>
     </div>

  );
}


