'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { databases } from '@/config/appwrite';

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

const UserContext = createContext();

export function UserProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate user match strength
  const calculateUserMatchStrength = (user, projects) => {
    const projectsArray = Array.isArray(projects) ? projects : [projects];
    const projectCount = projectsArray.length;
    
    const projectPercentage = Math.min(projectCount / 5 * 60, 60);
    const userSkills = user?.skills ? user.skills.toLowerCase().split(',').map(skill => skill.trim()) : [];
    
    const projectTechStacks = projectsArray
      .filter(project => project?.techStack)
      .flatMap(project => project.techStack.toLowerCase().split(',').map(tech => tech.trim()));
    
    const uniqueTechStacks = [...new Set(projectTechStacks)];
    
    let matchingSkillsCount = 0;
    userSkills.forEach(skill => {
      if (uniqueTechStacks.some(tech => tech.includes(skill) || skill.includes(tech))) {
        matchingSkillsCount++;
      }
    });
    
    const skillMatchPercentage = userSkills.length > 0 
      ? Math.min((matchingSkillsCount / userSkills.length) * 30, 30) 
      : 0;
    
    const skillCategories = new Set();
    userSkills.forEach(skill => {
      for (const [category, technologies] of Object.entries(SKILL_CATEGORIES)) {
        if (technologies.some(tech => skill.includes(tech))) {
          skillCategories.add(category);
        }
      }
    });
    
    const diversityBonus = Math.min(skillCategories.size * 2, 10);
    let totalMatchStrength = Math.min(projectPercentage + skillMatchPercentage + diversityBonus, 97);
    totalMatchStrength = Math.round(totalMatchStrength);
    
    const expertiseLevel = EXPERTISE_LEVELS.find(level => totalMatchStrength >= level.min);
    
    return {
      matchStrength: totalMatchStrength,
      expertiseLevel,
      projectContribution: projectPercentage,
      skillMatchContribution: skillMatchPercentage,
      diversityBonus
    };
  };

  useEffect(() => {
    const fetchAllData = async (docId, userId) => {
      setLoading(true);
      try {
        const [projectsResponse, usersResponse] = await Promise.all([
          databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
            process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID
          ),
          databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
            process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
          )
        ]);

        setAllProjects(projectsResponse.documents);
        setAllUsers(usersResponse.documents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const value = {
    allUsers,
    allProjects,
    loading,
    error,
    SKILL_CATEGORIES,
    EXPERTISE_LEVELS,
    calculateUserMatchStrength
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
