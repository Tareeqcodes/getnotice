 'use client'
import { useEffect, useState } from 'react'
import { databases } from '@/config/appwrite'

export default function Feeds() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect( () => {
        const fetchPosts = async () => {
            try {
                const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
                    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID
                )
                setPosts(response.documents)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    } , [])
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!posts) return <div>No posts found</div>
  return (
    <>
     {
        posts.lenght > 0 ? (
           documents.map((posts) => <PostCard key={posts.$id} post={posts} />))
        : (
            <div className='text-center mt-8'>
                <h2 className='text-2xl font-semibold text-gray-800'>No posts found</h2>
            </div>
        )
     }
    </>
  )
}
