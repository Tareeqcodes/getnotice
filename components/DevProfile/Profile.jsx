'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Award, 
  Code, 
  ThumbsUp, 
  Github, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe 
} from 'lucide-react';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

// Same constants from your card component
const SKILL_CATEGORIES = {
  FRONTEND: ['react', 'nextjs', 'vue', 'angular', 'svelte', 'javascript', 'typescript', 'tailwind', 'css', 'html', 'bootstrap', 'sass'],
  BACKEND: ['node', 'express', 'django', 'flask', 'fastapi', 'spring', 'laravel', 'php', 'ruby', 'rails', 'python', 'java', 'c#', '.net'],
  MOBILE: ['react native', 'flutter', 'swift', 'kotlin', 'ios', 'android', 'xamarin', 'ionic'],
  DATABASE: ['mongodb', 'mysql', 'postgresql', 'sqlite', 'firebase', 'supabase', 'dynamodb', 'redis', 'sql', 'nosql'],
  DEVOPS: ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'terraform', 'github actions'],
  AI_ML: ['tensorflow', 'pytorch', 'machine learning', 'deep learning', 'nlp', 'computer vision', 'ai']
};

const EXPERTISE_LEVELS = [
  { min: 90, label: 'Top 5%', color: 'indigo' },
  { min: 80, label: 'Expert', color: 'blue' },
  { min: 70, label: 'Advanced', color: 'green' },
  { min: 50, label: 'Intermediate', color: 'yellow' },
  { min: 0, label: 'Beginner', color: 'gray' }
];

// Calculate user match strength (same function from your card component)
const calculateUserMatchStrength = (user, projects) => {
  // Ensure projects is an array
  const projectsArray = Array.isArray(projects) ? projects : [projects];
  const projectCount = projectsArray.length;
  
  // 1. Base percentage from project count (max 5 projects = 60% base)
  const projectPercentage = Math.min(projectCount / 5 * 60, 60);
  
  // 2. Get user skills and normalize them
  const userSkills = user?.skills ? user.skills.toLowerCase().split(',').map(skill => skill.trim()) : [];
  
  // 3. Get all tech stacks from projects and normalize them
  const projectTechStacks = projectsArray
    .filter(project => project?.techStack)
    .flatMap(project => 
      project.techStack.toLowerCase().split(',').map(tech => tech.trim())
    );
  
  const uniqueTechStacks = [...new Set(projectTechStacks)];
  
  // 4. Calculate skill match percentage
  // Count how many of user's skills match with project tech stacks
  let matchingSkillsCount = 0;
  userSkills.forEach(skill => {
    if (uniqueTechStacks.some(tech => tech.includes(skill) || skill.includes(tech))) {
      matchingSkillsCount++;
    }
  });
  
  // Calculate skill match percentage (max 30%)
  const skillMatchPercentage = userSkills.length > 0 
    ? Math.min((matchingSkillsCount / userSkills.length) * 30, 30) 
    : 0;
  
  // 5. Calculate skill diversity bonus (max 10%)
  const skillCategories = new Set();
  userSkills.forEach(skill => {
    for (const [category, technologies] of Object.entries(SKILL_CATEGORIES)) {
      if (technologies.some(tech => skill.includes(tech) || tech.includes(skill))) {
        skillCategories.add(category);
        break;
      }
    }
  });
  
  const diversityBonus = Math.min(skillCategories.size * 2, 10);
  
  // 6. Calculate total match strength (capped at 97% to account for real-world imperfection)
  let totalMatchStrength = Math.min(projectPercentage + skillMatchPercentage + diversityBonus, 97);
  
  // Round to the nearest integer
  totalMatchStrength = Math.round(totalMatchStrength);
  
  // 7. Determine expertise level
  const expertiseLevel = EXPERTISE_LEVELS.find(level => totalMatchStrength >= level.min);
  
  return {
    matchStrength: totalMatchStrength,
    expertiseLevel,
    projectContribution: projectPercentage,
    skillMatchContribution: skillMatchPercentage,
    diversityBonus
  };
};

// Group skills by category for the Skills tab
const categorizeSkills = (skillsString) => {
  if (!skillsString) return {};
  
  const skills = skillsString.toLowerCase().split(',').map(skill => skill.trim());
  const categorized = {};
  
  skills.forEach(skill => {
    let assigned = false;
    
    for (const [category, techs] of Object.entries(SKILL_CATEGORIES)) {
      if (techs.some(tech => skill.includes(tech) || tech.includes(skill))) {
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push(skill);
        assigned = true;
        break;
      }
    }
    
    if (!assigned) {
      if (!categorized['OTHER']) categorized['OTHER'] = [];
      categorized['OTHER'].push(skill);
    }
  });
  
  return categorized;
};

// Mock data for endorsements - in a real app this would come from API
const mockEndorsements = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Frontend Lead at Acme Inc',
    initial: 'S',
    comment: 'Exceptional development skills. Solved our performance issues in days.',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  {
    id: 2,
    name: 'Michael Wong',
    title: 'CTO at TechStart',
    initial: 'M',
    comment: 'Delivered high-quality code with excellent documentation. Would definitely work with again.',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  {
    id: 3,
    name: 'Lisa Johnson',
    title: 'Product Manager at SaaSCo',
    initial: 'L',
    comment: 'Great communication skills and technical expertise. A valuable team member.',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  }
];

export default function Profile({ user, projects }) {
  const [activeTab, setActiveTab] = useState('showcase');
  const [matchData, setMatchData] = useState(null);
  
  // Ensure projects is always an array
  const projectsArray = Array.isArray(projects) ? projects : projects ? [projects] : [];
  
  // Mock user data if none provided
  const defaultUser = {
    name: 'DevXplore',
    title: 'Full Stack Developer',
    skills: 'React,Next.js,TypeScript,Node.js,MongoDB,GraphQL,Tailwind CSS',
    openToWork: true,
    bio: 'Full stack developer with 5+ years of experience building web applications. Passionate about clean code and user experience.',
    location: 'San Francisco, CA',
    email: 'dev@example.com',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://example.com'
    }
  };
  
  const userData = user || defaultUser;
  
  // Mock projects data if none provided
  const defaultProjects = [
    {
      $id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
      techStack: 'React,Next.js,Node.js,MongoDB,Stripe',
      imageFile: '',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
      featured: true
    },
    {
      $id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      techStack: 'React,Firebase,Tailwind CSS,Redux',
      imageFile: '',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    },
    {
      $id: '3',
      title: 'Developer Portfolio',
      description: 'A customizable portfolio template for developers to showcase their work.',
      techStack: 'Next.js,Tailwind CSS,Framer Motion',
      imageFile: '',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    }
  ];
  
  const projectsData = projectsArray.length > 0 ? projectsArray : defaultProjects;
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  
  // Calculate the user's match strength
  useEffect(() => {
    const data = calculateUserMatchStrength(userData, projectsData);
    setMatchData(data);
  }, []);
  
  // Categorize skills for the Skills tab
  const categorizedSkills = categorizeSkills(userData.skills);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500">
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        <div className="px-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-700 border-4 border-white dark:border-slate-700 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 relative">
              {userData.name?.charAt(0).toUpperCase() || 'D'}
              {userData.openToWork && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full px-2 py-1 font-medium border-2 border-white dark:border-slate-700">
                  HIRE
                </div>
              )}
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{userData.name}</h1>
                    {matchData?.expertiseLevel && (
                      <div className="ml-3 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded text-sm font-semibold text-indigo-800 dark:text-indigo-300">
                        {matchData.expertiseLevel.label}
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{userData.title}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-semibold rounded-lg transition"
                >
                  <ThumbsUp className="text-purple-700" /> Endorse
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Match Strength Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                <Zap size={14} className="text-amber-500 mr-1" />
                Match Strength
              </span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                {matchData?.matchStrength || 0}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full" 
                style={{ width: `${matchData?.matchStrength || 0}%` }}
              ></div>
            </div>
          </div>
          
          {/* Bio and Social Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <p className="text-slate-600 dark:text-slate-300">
                {userData.bio}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-start justify-start lg:justify-end">
              <a href={userData.socialLinks?.github} target="_blank" rel="noopener noreferrer" 
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                <Github size={20} />
              </a>
              <a href={userData.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer" 
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                <Linkedin size={20} />
              </a>
              <a href={userData.socialLinks?.twitter} target="_blank" rel="noopener noreferrer" 
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                <Twitter size={20} />
              </a>
              <a href={userData.socialLinks?.website} target="_blank" rel="noopener noreferrer" 
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                <Globe size={20} />
              </a>
              <a href={`mailto:${userData.email}`} 
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Tags/Skills Preview */}
          <div className="flex flex-wrap gap-2 mb-6">
            {userData.skills?.split(',').slice(0, 8).map((skill, idx) => (
              <span key={idx} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {skill.trim()}
              </span>
            ))}
            {userData.skills?.split(',').length > 8 && (
              <span className="text-sm bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-medium">
                +{userData.skills.split(',').length - 8} more
              </span>
            )}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-t border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setActiveTab('showcase')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'showcase' 
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Showcase
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'skills' 
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Skills
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'projects' 
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('impact')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'impact' 
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Impact
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        {/* Showcase Tab */}
        {activeTab === 'showcase' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Developer Showcase</h2>
            
            {/* Featured Project */}
            <div className="mb-8">
              <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">
                <Star size={16} className="mr-1" fill="currentColor" />
                Featured Project
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {featuredProject.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {featuredProject.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredProject.techStack?.split(',').map((tech, idx) => (
                        <span key={idx} className="text-sm bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                          #{tech.trim()}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <Github /> GitHub
                      </a>
                      <a href={featuredProject.demoUrl} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <ExternalLink /> Live Demo
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-full h-48 bg-slate-200 dark:bg-slate-600 rounded-lg overflow-hidden">
                      {featuredProject.imageFile ? (
                        <Image
                          src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${featuredProject.imageFile}/view?project=${projectId}`}
                          width={300}
                          height={200}
                          alt={featuredProject.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                          <Code size={48} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Problem Solving */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Problem Solving Highlights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Technical Challenge</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Reduced application bundle size by 42% while maintaining feature parity by implementing code splitting and lazy loading components.
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Business Impact</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Improved user retention by 18% through UX optimizations and performance improvements identified through data analytics.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Key Contributions */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Key Contributions</h3>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600 dark:text-indigo-400">•</div>
                    <p>Created reusable component library that reduced development time by 30% for new features</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600 dark:text-indigo-400">•</div>
                    <p>Implemented CI/CD pipeline that improved deployment frequency from weekly to daily</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600 dark:text-indigo-400">•</div>
                    <p>Optimized database queries resulting in 60% faster page load times for data-heavy views</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Skills & Expertise</h2>
            
            {/* Skill Categories */}
            <div className="space-y-6">
              {Object.entries(categorizedSkills).map(([category, skills]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-3">
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skills.map((skill, idx) => {
                      // Mock expertise level for visualization
                      const expertiseScore = Math.floor(Math.random() * 30) + 70; // 70-99
                      const expertiseLevel = EXPERTISE_LEVELS.find(level => expertiseScore >= level.min);
                      
                      return (
                        <div key={idx} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-md p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-indigo-800 dark:text-indigo-300">{skill}</span>
                            <span className="text-xs text-indigo-600 dark:text-indigo-400">
                              {expertiseLevel?.label}
                            </span>
                          </div>
                          <div className="w-full bg-indigo-200 dark:bg-indigo-700/30 rounded-full h-1.5">
                            <div 
                              className="bg-indigo-600 dark:bg-indigo-400 h-1.5 rounded-full" 
                              style={{ width: `${expertiseScore}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tools and Technologies */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-3">
                Tools & Technologies
              </h3>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {['Git', 'VS Code', 'Docker', 'Figma', 'Jira', 'AWS', 'Netlify', 'Vercel'].map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Learning & Growth */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-3">
                Currently Learning
              </h3>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {['Web3', 'Rust', 'GraphQL Federation', 'Kubernetes'].map((skill, idx) => (
                    <span key={idx} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">All Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData.map(project => {
                const imageUrl = project.imageFile 
                  ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${project.imageFile}/view?project=${projectId}`
                  : null;
                  
                return (
                  <div key={project.$id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-slate-100 dark:bg-slate-700 relative">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          width={400}
                          height={200}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                          <Code size={40} />
                        </div>
                      )}
                      
                      {project.featured && (
                        <div className="absolute top-2 right-2 flex items-center bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded text-xs text-amber-600 dark:text-amber-400 font-medium">
                          <Star size={12} className="mr-1" fill="currentColor" />
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack?.split(',').slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                            #{tech.trim()}
                          </span>
                        ))}
                        {project.techStack?.split(',').length > 4 && (
                          <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                            +{project.techStack.split(',').length - 4} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                            className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <Github size={14} /> GitHub
                          </a>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" 
                            className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <ExternalLink size={14} /> Demo
                          </a>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded transition"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {projectsData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                <Code size={40} className="text-slate-400 dark:text-slate-500 mb-3" />
                <p className="text-slate-600 dark:text-slate-300">No projects to display</p>
              </div>
            )}
          </div>
        )}
        
        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Impact & Achievements</h2>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <LucideBarChart2 size={24} className="text-emerald-500 mb-2" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">28k+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Users Impacted</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <Code size={24} className="text-blue-500 mb-2" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">{projectsData.length}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Projects</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <Star size={24} className="text-amber-500 mb-2" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">250+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Stars on GitHub</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <Award size={24} className="text-purple-500 mb-2" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">{mockEndorsements.length}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Endorsements</span>
              </div>
            </div>
            
            {/* Endorsements */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-800 dark:text-white flex items-center">
                  <Award size={18} className="text-amber-500 mr-2" />
                  Endorsements
                </h3>
              </div>
              
              <div className="space-y-4">
                {mockEndorsements.map(endorsement => (
                  <div key={endorsement.id} className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full ${endorsement.bgColor} flex items-center justify-center text-sm font-medium ${endorsement.textColor}`}>
                        {endorsement.initial}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{endorsement.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{endorsement.title}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                      "{endorsement.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div>
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">Achievements</h3>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="mr-3 text-amber-500">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-white">Top Contributor Award</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Recognized for outstanding contributions to open source projects</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-3 text-amber-500">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-white">Hackathon Winner</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">First place at CodeFest 2024 for innovative accessibility solution</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-3 text-amber-500">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-white">Conference Speaker</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Presented "Building Scalable Frontend Architectures" at DevCon 2024</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}