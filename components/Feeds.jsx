// "use client"

// import { useEffect, useState } from 'react'
// import { databases, Query } from '../config/appwrite'
// import MyProjects from './MyProjects'
// import { useAuth } from '../context/authContext'
// import Spinner from './Spinner'


// export default function Feeds() {
//     const [posts, setPosts] = useState([])  
//     const [error, setError] = useState(null)
//     const [loadingData, setLoadingData] = useState(true);
//     const { user, loading } =useAuth();
//     console.log('User from useAuth:', user);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!user) return;
//             try { 
//                 const userId = user.$id
//                 const response = await databases.listDocuments(
//                     process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
//                     process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID,
//                     [Query.equal('user_id', userId)]
//                 )
//                  setPosts(response.documents)
//                  setLoadingData(false);
                    
                    
//                 console.log('User Response:', response);
            
//             } catch (error) {
//                 setError(error)
//             }
//         }
//         if(user)
//         fetchData()
//     }, [user])
    
//     if (loading || loadingData ){
//         return <Spinner />
//     } 
//     if (error) return <div>Error: {error.message}</div>
//     if (!posts.length) return <div>No posts found</div>


//     return (
//         <>

//       {posts.length > 0 ? (
//                 posts.map((post) => (
//                     <MyProject
//                      post={post}  
//                      key={post.$id}
//                     />
//                 ))
//             ) : (
//                 <div>No user details found</div>
//             )}
//     </>
//     )
// }