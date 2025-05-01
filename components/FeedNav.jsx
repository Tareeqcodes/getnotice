'use client'
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import WeeklyDev from "./WeeklyDev";
import Ranking from "./Ranking";
import Jobs from "./Jobs";
import MyProjects from "./MyProjects";
import ProjectNav from "./ProjectNav";
import WeeklyNav from "./WeekyNav";
import { useAuth } from '@/context/authContext';
import { databases, Query } from '@/config/appwrite';
import Spinner from "./Spinner";

export default function FeedNav() {
    const [activeTab, setActiveTab] = useState('discover');
    const [userProjects, setUserProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    
    useEffect(() => {
        if (activeTab === 'discover') {
            fetchAllProjectsAndUsers();
        } else if (activeTab === 'project' && user) {
            fetchUserProjects();
        }
    }, [activeTab, user]);
    
    const fetchUserProjects = async () => {
        if (!user) return;
        
        setLoading(true);
        try {
            const userId = user.$id;
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID,
                [Query.equal('user_id', userId)]
            );
            
            setUserProjects(response.documents);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError(err);
            setLoading(false);
        }
    };

    const fetchAllProjectsAndUsers = async () => {
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

    return (
        <div className="bg-white p-3 mx-auto md:mx-16 mt-5 shadow">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search size={18} className="text-gray-500 mr-2" />
                <input 
                    className="bg-transparent w-full outline-none text-sm" 
                    placeholder="Search skills, projects, developers..."
                />  
            </div>
            <div className="flex bg-white shadow border-b">
                <button 
                    onClick={() => setActiveTab('discover')} 
                    className={`flex-1 py-3 cursor-pointer text-center ${activeTab === 'discover' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                    Discover
                </button>
                <button 
                    onClick={() => setActiveTab('rankings')} 
                    className={`flex-1 py-3 cursor-pointer text-center ${activeTab === 'rankings' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                    Rankings
                </button>
                <button 
                    onClick={() => setActiveTab('jobs')} 
                    className={`flex-1 py-3 cursor-pointer text-center ${activeTab === 'jobs' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                    Jobs
                </button>
                <button 
                    onClick={() => setActiveTab('project')} 
                    className={`flex-1 py-3 cursor-pointer text-center ${activeTab === 'project' ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-gray-500'}`}
                >
                    Projects
                </button>
            </div>
            <>
                {activeTab === 'discover' && (
                    <div className="p-4">
                        <WeeklyNav />
                        <WeeklyDev 
                            projects={allProjects} 
                            users={allUsers} 
                            loading={loading} 
                            error={error} 
                        />
                    </div>
                )}
                {activeTab === 'rankings' && <Ranking />}
                {activeTab === 'jobs' && <Jobs />}
                {activeTab === 'project' && (
                    <div className="p-4">
                        <ProjectNav />
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <div>Error loading projects: {error.message}</div>
                        ) : userProjects.length > 0 ? (
                            userProjects.map((post) => <MyProjects key={post.$id} post={post} />)
                        ) : (
                            <div className="items-center text-center justify-between mt-20">
                                You have no projects
                            </div>
                        )}
                    </div>
                )}
            </>
        </div>
    );
}