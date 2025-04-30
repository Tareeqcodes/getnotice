"use client"

import { useEffect, useState } from 'react'
import { databases, Query } from '../config/appwrite'
import MyProjects from './MyProjects'
import { useAuth } from '../context/authContext'
import FeedNav from './FeedNav'


export default function Feeds() {
    const [posts, setPosts] = useState([])
    const [userDetails, setUserDetails] = useState([]);
    const [error, setError] = useState(null)
    const { user, loading } =useAuth();
    const [activeTab, setActiveTab] = useState('discover');
    console.log('User from useAuth:', user);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                return;
            }
            try { 
                const userId = user.$id
                const [userRes, postRes] = await Promise.all([
                    databases.listDocuments(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
                        [Query.equal('user_id', userId)]
                    ),
                    databases.listDocuments(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID,
                        [Query.equal('user_id', userId)]
                    )
                ]);
                console.log('User Response:', userRes);
            console.log('Post Response:', postRes);
    
                if (userRes.documents.length === 0) {
                    throw new Error('User details not found');
                  }
                  
                  setUserDetails(userRes.documents);
                    setPosts(postRes.documents);
            } catch (error) {
                setError(error)
            }
        }
        if(user) {
            fetchData()
        }
    }, [user])
    
    if (loading || !user) return <div>Loading user data...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!posts.length) return <div>No posts found</div>
    if (!userDetails.length) return <div>No user details found</div>;


    return (
        <>
        {/* <FeedNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'project' && ()} */}
      {userDetails.length > 0 ? (
                userDetails.map((userDetail) => (
                    <MyProjects
                        key={userDetail.$id}
                        user={userDetail}  
                        projects={posts}  
                    />
                ))
            ) : (
                <div>No user details found</div>
            )}
    </>
    )
}