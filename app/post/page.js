 "use client"

import { useState } from 'react';
import { databases, ID } from '../../config/appwrite';
import { toast } from 'react-toastify';
// import { useAuth } from '@/context/authContext';

export default function PostProject() {
  // const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    detailedWriteup: '',
    techStack: '',
  });
  const reset = () => {
    setFormData({
      title: '',
      description: '',
      githubUrl: '',
      demoUrl: '',
      detailedWriteup: '',
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
      detailedWriteup: formData.detailedWriteup,
      techStack: formData.techStack,
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
     console.log({
      title: formData.title,
      description: formData.description,
      githubUrl: formData.githubUrl,
      demoUrl: formData.demoUrl,
      detailedWriteup: formData.detailedWriteup,
      techStack: formData.techStack,
    });
    
  };

  return (
    <div className="max-w-2xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post Project</h1>
    
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">New Project</h2>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name='title'
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Scrohstack"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
             <input
              type="text"
              name='techStack'
              id="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tech stack (e.g., React, Node.js)"
              />
            
          </div>

          <div className="mb-4">
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input
            name='githubUrl'
              type="url"
              id="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GitHub URL"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
            <input
              name='demoUrl'
              type="url"
              id="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Live Demo URL"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <input
              name='description'
              type="text"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short description"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="detailedWriteup" className="block text-sm font-medium text-gray-700 mb-1">Detailed Write-up</label>
            <textarea
              name='detailedWriteup'
              id="detailedWriteup"
              value={formData.detailedWriteup}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Add detailed write-up here..."
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Post Project
        </button>
      </form>
    </div>
  );
}


