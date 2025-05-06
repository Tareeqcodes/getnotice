'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

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
  

export default function ProfileNav() {
  return (
    <div>ProfileNav</div>
  )
}
