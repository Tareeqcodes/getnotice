

'use client'
import { useEffect, useState } from 'react'
import { databases } from '@/config/appwrite'
import PostCard from './PostCard'


export default function Feeds() {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const [postRes, userRes] = await Promise.all([
                    databases.listDocuments(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID
                    ),
                    databases.listDocuments(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID, 
                        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
                    )
                ])
                console.log('Posts:', postRes.documents);
                console.log('Users:', userRes.documents);

                setPosts(postRes.documents)
                setUsers(userRes.documents)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!posts.length) return <div>No posts found</div>

    const mapUsers = users.map(user => {
        const userProjects = posts.filter(post => post.user_id === user.user_id)
        return { user, projects: userProjects }
    }).filter(u => u.projects.length > 0)

    return (
        <>
      <div className="grid gap-3 mx-3 md:mx-20 grid-cols-1 md:grid-cols-3">
        {mapUsers.map(({ user, projects }) => (
          <PostCard
            key={user.user_id}
            user={user}
            projects={projects}
          />
        ))}
      </div>
    </>
    )
}
