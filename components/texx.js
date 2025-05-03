"use client"
import { useState } from 'react';
import { Check, X, AlertCircle, Upload, Code, Award, Github } from 'lucide-react';
import { databases } from '@/config/appwrite';

/**
 * Developer profile setup wizard
 * This allows developers to create their profile and showcase their skills and projects
 */
export default function DeveloperSetup({ userId }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Profile data
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    availability: 'AVAILABLE',
    problemSolved: '',
    github: '',
    linkedin: ''
  });
  
  // Skills data
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'INTERMEDIATE', isSpecialty: false });
  
  // Projects data
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    isOpenSource: false,
    repoUrl: '',
    demoUrl: ''
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSkillChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSkill(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  const addSkill = () => {
    if (newSkill.name.trim() === '') return;
    
    setSkills(prev => [...prev, { ...newSkill, id: Date.now() }]);
    setNewSkill({ name: '', level: 'INTERMEDIATE', isSpecialty: false });
  };
  
  const removeSkill = (skillId) => {
    setSkills(prev => prev.filter(skill => skill.id !== skillId));
  };
  
  const handleProjectChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  const addProject = () => {
    if (newProject.title.trim() === '' || newProject.description.trim() === '') return;
    
    setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
    setNewProject({ 
      title: '', 
      description: '', 
      isOpenSource: false,
      repoUrl: '',
      demoUrl: ''
    });
  };
  
  const removeProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };
  
  const handleNext = () => {
    // Basic validation
    if (step === 1 && (!profile.name || !profile.title)) {
      setError('Please provide your name and title');
      return;
    }
    
    if (step === 2 && skills.length === 0) {
      setError('Please add at least one skill');
      return;
    }
    
    if (step === 3 && projects.length === 0) {
      setError('Please add at least one project');
      return;
    }
    
    setError(null);
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Create developer profile
      const developerData = {
        name: profile.name,
        title: profile.title,
        availability: profile.availability,
        problemSolved: profile.problemSolved,
        viewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: userId // Connect to user account
      };
      
      const developerResult = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
        process.env.NEXT_PUBLIC_APPWRITE_DEVELOPER_ID,
        "unique()",
        developerData
      );
      
      const developerId = developerResult.$id;
      
      // Add skills
      for (const skill of skills) {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_SKILLS_ID,
          "unique()",
          {
            developerId: developerId,
            name: skill.name,
            level: skill.level,
            isSpecialty: skill.isSpecialty,
            verificationCount: 0,
            createdAt: new Date().toISOString()
          }
        );
      }
      
      // Add projects
      for (const project of projects) {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECTSCOLLECTION_ID,
          "unique()",
          {
            developerId: developerId,
            title: project.title,
            description: project.description,
            isFeatured: projects[0].id === project.id, // Make first project featured
            isOpenSource: project.isOpenSource,
            repoUrl: project.repoUrl,
            demoUrl: project.demoUrl,
            endorsementCount: 0,
            downloadCount: 0,
            createdAt: new Date().toISOString()
          }
        );
      }
      
      // Calculate profile completeness
      const profileCompleteness = calculateProfileCompleteness(developerData, skills, projects);
      
      // Update profile with completeness score
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
        process.env.NEXT_PUBLIC_APPWRITE_DEVELOPER_ID,
        developerId,
        { profileCompleteness }
      );
      
      setSuccess(true);
    } catch (error) {
      console.error('Error creating developer profile:', error);
      setError('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to calculate profile completeness
  const calculateProfileCompleteness = (developer, skills, projects) => {
    let score = 20; // Base score
    
    // Core profile fields
    if (developer.name) score += 10;
    if (developer.title) score += 10;
    if (developer.availability) score += 5;
    if (developer.problemSolved) score += 15;
    
    // Skills - up to 20%
    if (skills.length > 0) {
      const skillPoints = Math.min(20, skills.length * 2);
      score += skillPoints;
    }
    
    // Projects - up to 20%
    if (projects.length > 0) {
      const projectPoints = Math.min(20, projects.length * 5);
      score += projectPoints;
    }
    
    return Math.min(100, Math.round(score));
  };
  
  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
            <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Profile Created!</h2>
          <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
            Your developer profile has been successfully created and is now visible to potential connections.
          </p>
          <button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md"
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-slate-50 dark:bg-slate-700/30 p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {step === 1 ? 'Basic Information' : 
             step === 2 ? 'Skills & Expertise' : 
             step === 3 ? 'Projects & Work' : 'Review'}
          </h2>
          <span className="text-sm text-slate-600 dark:text-slate-400">Step {step} of 4</span>
        </div>
        
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s}
              className={`h-1 rounded-full flex-1 mx-0.5 ${
                s === step ? 'bg-indigo-600 dark:bg-indigo-500' :
                s < step ? 'bg-green-500 dark:bg-green-400' :
                'bg-slate-200 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="m-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}
      
      <div className="p-4">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                          shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                          focus:outline-none focus:ring-1 focus:ring-indigo-500 
                          dark:bg-slate-800 dark:text-white"
                placeholder="e.g. John Smith"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={profile.title}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                          shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                          focus:outline-none focus:ring-1 focus:ring-indigo-500 
                          dark:bg-slate-800 dark:text-white"
                placeholder="e.g. React Native Specialist"
              />
            </div>
            
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={profile.availability}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                          shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 
                          dark:bg-slate-800 dark:text-white"
              >
                <option value="AVAILABLE">Available for Work</option>
                <option value="HIRING">Hiring</option>
                <option value="OPEN_TO_OFFERS">Open to Offers</option>
                <option value="UNAVAILABLE">Not Available</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="problemSolved" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Problem You've Solved
              </label>
              <textarea
                id="problemSolved"
                name="problemSolved"
                value={profile.problemSolved}
                onChange={handleProfileChange}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                          shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                          focus:outline-none focus:ring-1 focus:ring-indigo-500 
                          dark:bg-slate-800 dark:text-white"
                placeholder="Describe a significant technical challenge you've solved..."
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Sharing a problem you've solved helps showcase your expertise
              </p>
            </div>
            
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                GitHub Username (Optional)
              </label>
              <div className="flex items-center">
                <div className="flex items-center bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-600">
                  <Github className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={profile.github}
                  onChange={handleProfileChange}
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-r-md 
                            shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                            focus:outline-none focus:ring-1 focus:ring-indigo-500 
                            dark:bg-slate-800 dark:text-white"
                  placeholder="yourusername"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Skills */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <div className="flex items-end mb-2">
                <div className="flex-1 mr-2">
                  <label htmlFor="skillName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    id="skillName"
                    name="name"
                    value={newSkill.name}
                    onChange={handleSkillChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                              shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                              focus:outline-none focus:ring-1 focus:ring-indigo-500 
                              dark:bg-slate-800 dark:text-white"
                    placeholder="e.g. React, Python, UX Design"
                  />
                </div>
                
                <div className="flex-1 mr-2">
                  <label htmlFor="skillLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Skill Level
                  </label>
                  <select
                    id="skillLevel"
                    name="level"
                    value={newSkill.level}
                    onChange={handleSkillChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                              shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 
                              dark:bg-slate-800 dark:text-white"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>
                
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSpecialty"
                  name="isSpecialty"
                  checked={newSkill.isSpecialty}
                  onChange={handleSkillChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isSpecialty" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  This is a specialty skill (highlighted on your profile)
                </label>
              </div>
            </div>
            
            {skills.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div 
                      key={skill.id}
                      className={`flex items-center justify-between p-2 rounded-md ${
                        skill.isSpecialty 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30' 
                        : 'bg-slate-50 dark:bg-slate-700/30'
                      }`}
                    >
                      <div>
                        <span className={`font-medium ${
                          skill.isSpecialty 
                          ? 'text-indigo-800 dark:text-indigo-300' 
                          : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {skill.name}
                        </span>
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {skill.level}
                        </span>
                        {skill.isSpecialty && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-800/50 text-indigo-800 dark:text-indigo-300">
                            Specialty
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => removeSkill(skill.id)}
                        className="text-slate-500 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <p className="text-xs text-blue-800 dark:text-blue-300">
                <span className="font-bold">Tip:</span> Add 3-5 skills that best represent your expertise. Mark your top skills as "specialty" to highlight them on your profile.
              </p>
            </div>
          </div>
        )}
        
        {/* Step 3: Projects */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="projectTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="projectTitle"
                name="title"
                value={newProject.title}
                onChange={handleProjectChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                          shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                          focus:outline-none focus:ring-1 focus:ring-indigo-500 
                          dark:bg-slate-800 dark:text-white"
                placeholder="e.g. E-commerce Mobile App"
              />
            </div>
            
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb >