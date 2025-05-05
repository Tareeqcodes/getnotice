'use client';

/**
 * User Expertise and Match Strength Calculator
 * This utility determines a user's expertise level and matching strength based on:
 * 1. Number of projects they've uploaded
 * 2. Skills they've added to their profile
 */

// Skill categories mapped to expertise levels
const SKILL_CATEGORIES = {
  // Frontend basics
  basic: ['html', 'css', 'javascript', 'bootstrap', 'jquery'],
  
  // Frontend frameworks/libraries
  frontend: ['react', 'reactjs', 'next', 'nextjs', 'vue', 'vuejs', 'angular', 'svelte', 'tailwind', 'tailwindcss', 'sass', 'scss'],
  
  // Backend technologies
  backend: ['node', 'nodejs', 'express', 'expressjs', 'django', 'flask', 'ruby', 'rails', 'php', 'laravel', 'spring', 'aspnet', 'dotnet'],
  
  // Database technologies
  database: ['sql', 'mysql', 'postgresql', 'mongodb', 'firebase', 'supabase', 'dynamodb', 'redis', 'appwrite'],
  
  // Mobile development
  mobile: ['react native', 'reactnative', 'flutter', 'swift', 'kotlin', 'android', 'ios'],
  
  // DevOps & Cloud
  devops: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'jenkins', 'terraform', 'github actions'],
  
  // AI & ML
  ai: ['python', 'pytorch', 'tensorflow', 'machine learning', 'ml', 'ai', 'data science']
};

// Expertise levels based on project count
const PROJECT_THRESHOLDS = {
  beginner: 1,     // 1-2 projects
  intermediate: 3, // 3-5 projects
  advanced: 6,     // 6-9 projects
  expert: 10       // 10+ projects
};

/**
 * Calculate user's expertise level and matching strength
 * @param {Object} user - The user object containing skills
 * @param {Array} projects - Array of user's projects
 * @returns {Object} Expertise info including level, strength percentage, and badge text
 */
export function Verified(user, projects = []) {
  // Ensure projects is an array
  const projectsArray = Array.isArray(projects) ? projects : [projects];
  const projectCount = projectsArray.length;
  
  // Extract and normalize user skills
  const userSkills = user?.skills 
    ? user.skills.split(',').map(skill => skill.trim().toLowerCase())
    : [];
    
  // Calculate project-based score (max 50%)
  let projectScore = 0;
  if (projectCount >= PROJECT_THRESHOLDS.expert) {
    projectScore = 50;
  } else if (projectCount >= PROJECT_THRESHOLDS.advanced) {
    projectScore = 40;
  } else if (projectCount >= PROJECT_THRESHOLDS.intermediate) {
    projectScore = 30;
  } else if (projectCount >= PROJECT_THRESHOLDS.beginner) {
    projectScore = 20;
  } else {
    projectScore = 10;
  }
  
  // Analyze skill categories
  const skillCategoryScores = {
    basic: 0,
    frontend: 0,
    backend: 0,
    database: 0,
    mobile: 0,
    devops: 0,
    ai: 0
  };
  
  // Count skills in each category
  userSkills.forEach(skill => {
    for (const [category, categorySkills] of Object.entries(SKILL_CATEGORIES)) {
      if (categorySkills.some(techSkill => skill.includes(techSkill))) {
        skillCategoryScores[category]++;
      }
    }
  });
  
  // Determine primary skill category
  let primaryCategory = 'basic';
  let highestCategoryScore = 0;
  
  for (const [category, score] of Object.entries(skillCategoryScores)) {
    if (score > highestCategoryScore) {
      highestCategoryScore = score;
      primaryCategory = category;
    }
  }
  
  // Calculate skill diversity score (max 30%)
  const categoriesWithSkills = Object.values(skillCategoryScores).filter(score => score > 0).length;
  const skillDiversityScore = Math.min(30, categoriesWithSkills * 5);
  
  // Calculate skill depth score (max 20%)
  const primaryCategoryDepth = skillCategoryScores[primaryCategory];
  const skillDepthScore = Math.min(20, primaryCategoryDepth * 5);
  
  // Final matching strength as percentage
  const matchStrength = projectScore + skillDiversityScore + skillDepthScore;
  
  // Determine expertise level and title
  let expertiseLevel = 'Newbie';
  let badgeText = 'New';
  
  if (matchStrength >= 90) {
    expertiseLevel = 'Top Expert';
    badgeText = 'Top 5%';
  } else if (matchStrength >= 75) {
    expertiseLevel = 'Expert';
    badgeText = 'Top 10%';
  } else if (matchStrength >= 60) {
    expertiseLevel = 'Advanced';
    badgeText = 'Top 20%';
  } else if (matchStrength >= 40) {
    expertiseLevel = 'Intermediate';
    badgeText = 'Top 50%';
  } else if (matchStrength >= 20) {
    expertiseLevel = 'Beginner';
    badgeText = 'Learning';
  }
  
  // Determine specialty based on primary category
  let specialty = '';
  switch (primaryCategory) {
    case 'frontend':
      specialty = userSkills.some(s => s.includes('react')) ? 'React Specialist' : 'Frontend Developer';
      break;
    case 'backend':
      specialty = 'Backend Developer';
      break;
    case 'mobile':
      specialty = userSkills.some(s => s.includes('flutter')) ? 'Flutter Developer' : 'Mobile Developer';
      break;
    case 'database':
      specialty = 'Database Specialist';
      break;
    case 'devops':
      specialty = 'DevOps Engineer';
      break;
    case 'ai':
      specialty = 'AI Developer';
      break;
    default:
      specialty = projectCount > 0 ? 'Web Developer' : 'Aspiring Developer';
  }
  
  return {
    level: expertiseLevel,
    specialty: specialty,
    matchStrength: matchStrength,
    matchPercentage: `${Math.round(matchStrength)}%`,
    projectCount: projectCount,
    badgeText: badgeText,
    primaryCategory: primaryCategory,
    skillCategories: skillCategoryScores
  };
}