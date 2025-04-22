'use client'
import { useEffect, useState } from 'react'
import { databases, Query } from '@/config/appwrite'
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

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {
                posts.map(post => {
                    const user = users.find(u => u.user_id === post.user_id)
                    return <PostCard key={post.$id} post={post} user={user} />
                })
            }
        </div>
    )
}
