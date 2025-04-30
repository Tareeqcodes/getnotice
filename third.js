

'use client'
import { useEffect, useState } from 'react'
import { databases } from '@/config/appwrite'
import MyWork from './MyWork'


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
          <MyWork
            key={user.user_id}
            user={user}
            projects={projects}
          />
        ))}
      </div>
    </>
    )
}











'use client'
import { useEffect, useState } from 'react'
import { databases, Query } from '@/config/appwrite'
import MyWork from './MyWork'
import { useAuth } from '@/context/authContext'


export default function Feeds() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userDetails, setUserDetails] = useState(null);
    const {user} =useAuth();
    console.log('user:', user)

    useEffect(() => {
        const fetchData = async () => {
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
    
                if (userRes.documents.length === 0) {
                    throw new Error('User details not found');
                  }
                  const userDetails = userRes.documents[0];
                  setUserDetails(userDetails);
                    setPosts(postRes.documents);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!posts.length) return <div>No posts found</div>

    return (
        <>
      <div>
      <MyWork user={userDetails} projects={posts} />
      </div>
    </>
    )
}