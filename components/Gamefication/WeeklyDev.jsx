'use client'
import { SlidersHorizontal } from 'lucide-react';
import PostCard from '../PostCard';
import Spinner from '../Spinner';

export default function WeeklyDev({ projects, users, loading, error }) {
   
    if (loading) return <Spinner />;
    if (error) return <div>Error loading content: {error.message}</div>;
    if (!projects?.length || !users?.length) return
     <div className="text-center py-8">
        No projects available</div>;
 
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
                <div className="flex space-x-2 items-center cursor-pointer">
                <SlidersHorizontal size={18} className="text-current" />
                    <h3 className="text-md font-medium">Filter</h3>
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