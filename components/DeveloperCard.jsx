"use client"
import { useState, useEffect } from 'react';
import { databases } from '@/config/appwrite'
import VisibilityCard from './VisibilityCard';

export default function DeveloperCard() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID, 
            process.env.NEXT_PUBLIC_APPWRITE_DEVELOPER_ID,
        );
        setDevelopers(response.documents);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDevelopers();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Developers Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map(developer => (
          <VisibilityCard 
            key={developer.$id} 
            developerId={developer.$id} 
          />
        ))}
      </div>
    </div>
  );
}