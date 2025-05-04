'use client'
import { useState } from 'react';
import PostCard from './PostCard';
import Spinner from './Spinner';

export default function WeeklyDev({ projects, users, loading, error }) {
    const [filter, setFilter] = useState('all');
    if (loading) return <Spinner />;
    if (error) return <div>Error loading content: {error.message}</div>;
    if (!projects?.length || !users?.length) return <div className="text-center py-8">No projects available</div>;

    // Map users with their projects
    const mapUsers = users.map(user => {
        const userProjects = projects.filter(project => project.user_id === user.user_id);
        return { user, projects: userProjects };
    }).filter(u => u.projects.length > 0);

    if (mapUsers.length === 0) {
        return <div className="text-center py-8">No projects found</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center pt-5 mb-6">
                <h2 className="text-xl font-semibold">Developers Showcase</h2>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('popular')}
                        className={`px-3 py-1 rounded ${filter === 'popular' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                    >
                        Popular
                    </button>
                    <button 
                        onClick={() => setFilter('recent')}
                        className={`px-3 py-1 rounded ${filter === 'recent' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                    >
                        Recent
                    </button>
                </div>
            </div>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-1">
                {mapUsers.map(({ user, projects }) => (
                    <PostCard
                        key={user.user_id}
                        user={user}
                        projects={projects}
                    />
                ))}
            </div>
        </div>
    );
}