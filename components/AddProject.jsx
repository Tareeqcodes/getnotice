"use client"

import { useState, useRef } from 'react';
import { databases, ID, storage } from '@/config/appwrite';
import { toast } from 'react-toastify';
import { FiGithub, FiGlobe, FiTag, FiFileText, FiCode, FiImage, FiX } from 'react-icons/fi';
import { useAuth } from '@/context/authContext';


const projImg = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;

export default function AddProject({ onProjectAdded }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    githubUrl: '',
    demoUrl: '',
    detail: '',
    techStack: '',
    imageFile: null,
  });

  const reset = () => {
    setFormData({
      title: '',
      githubUrl: '',
      demoUrl: '',
      detail: '',
      techStack: '',
      imageFile: null,
    });
    setImagePreview(null);
    setUploadProgress(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file
      });
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      imageFile: null
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.$id) {
      toast.error('You must be logged in to post a project');
      return;
    }
    setLoading(true);

    let imageID;
    if (formData.imageFile) {
        try {
          const response = await storage.createFile( projImg, ID.unique(), formData.imageFile);
          imageID = response.$id;
        } catch (error) {
          console.log("Error uploading image", error);
          toast.error("Image upload failed");
          setLoading(false);
          return;
        }
      }

      const documentData = {
        title: formData.title,
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
        detail: formData.detail,
        techStack: formData.techStack,
        user_id: user.$id,
        imageFile: imageID,
        createdAt: new Date().toISOString(),
      };
    try { 
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID,
        ID.unique(),
        documentData,
      );
      alert('Project published successfully!')
      toast.success('Project published successfully!');
      reset();
      if (onProjectAdded) onProjectAdded();
    } catch (error) {
      toast.error('Error publishing project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Split tech stack string into array of tags for preview
  const techStackArray = formData.techStack 
    ? formData.techStack.split(',').map(item => item.trim()).filter(item => item !== '')
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-8 px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Share Your Project
        </h1>
        <p className="text-purple-100 mt-2">
          Showcase your work and get feedback from the developer community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        {/* Main form layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left column - Image upload */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiImage className="mr-2 text-purple-600" />
                Project Screenshot
              </label>
              
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-500 cursor-pointer transition-all flex flex-col items-center justify-center h-72"
                >
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full mb-4">
                    <FiImage className="w-8 h-8" />
                  </div>
                  <p className="text-gray-700 font-medium mb-1">Drag & drop an image or browse</p>
                  <p className="text-gray-500 text-sm text-center">PNG, JPG or GIF. Max 5MB.</p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden h-72">
                  <img 
                    src={imagePreview} 
                    alt="Project preview" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  >
                    <FiX className="text-gray-600" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiCode className="mr-2 text-purple-600" />
                Technology Stack
              </label>
              <input
                name="techStack"
                type="text"
                value={formData.techStack}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 mb-2"
                placeholder="React, Node.js, MongoDB..."
              />
              <p className="text-xs text-gray-500 mb-3">Separate technologies with commas</p>

              {techStackArray.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {techStackArray.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiTag className="mr-2 text-purple-600" />
                Project Title
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="e.g. Portfolio Website with Next.js"
                required
              />
            </div>

            <div className="mb-6">
              <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiFileText className="mr-2 text-purple-600" />
                Project Details
              </label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 min-h-[180px]"
                placeholder="Share what makes your project interesting..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiGithub className="mr-2 text-purple-600" />
                  GitHub Repository
                </label>
                <input
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiGlobe className="mr-2 text-purple-600" />
                  Live Demo URL
                </label>
                <input
                  name="demoUrl"
                  type="url"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="https://your-project.demo"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            >
              {loading ? 'Publishing...' : 'Launch Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}