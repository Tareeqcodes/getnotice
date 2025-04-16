 "use client"

import { useState } from 'react';

export default function PostProject() {
  const [title, setTitle] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedWriteup, setDetailedWriteup] = useState('');
  const [selectedTech, setSelectedTech] = useState(['React']);

  const handleAddTech = (tech) => {
    if (!selectedTech.includes(tech)) {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleRemoveTech = (tech) => {
    setSelectedTech(selectedTech.filter(t => t !== tech));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      title,
      githubUrl,
      demoUrl,
      shortDescription,
      detailedWriteup,
      selectedTech
    });
  };

  return (
    <div className="max-w-2xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post Project</h1>
    
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">New Project</h2>
          
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Scrohstack"
              required
            />
          </div>
          
          {/* Tech Stack */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTech.map(tech => (
                <span 
                  key={tech} 
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tech}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTech(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">+Add: React</option>
                <option value="React">React</option>
                <option value="Next.js">Next.js</option>
                <option value="Tailwind CSS">Tailwind CSS</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Node.js">Node.js</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* GitHub URL */}
          <div className="mb-4">
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input
              type="url"
              id="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GitHub URL"
            />
          </div>
          
          {/* Live Demo URL */}
          <div className="mb-4">
            <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
            <input
              type="url"
              id="demoUrl"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Live Demo URL"
            />
          </div>
          
          {/* Short Description */}
          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <input
              type="text"
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short description"
            />
          </div>
          
          {/* Detailed Write-up */}
          <div className="mb-6">
            <label htmlFor="detailedWriteup" className="block text-sm font-medium text-gray-700 mb-1">Detailed Write-up</label>
            <textarea
              id="detailedWriteup"
              value={detailedWriteup}
              onChange={(e) => setDetailedWriteup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Add detailed write-up here..."
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Post Project
        </button>
      </form>
    </div>
  );
}