'use client'
import { useState, useEffect } from "react"
import { ID, databases, Query } from "@/config/appwrite"
import { useAuth } from "@/context/authContext"
import { FaGithub, FaLinkedin, FaUserEdit } from "react-icons/fa"
import { FiCode } from "react-icons/fi"
import { Switch } from "@headlessui/react"


const db = process.env.NEXT_PUBLIC_APPWRITE_DB_ID
const usercll = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID

export default function PersonalInfo() {
  const { user, loading } = useAuth()
  const [docId, setDocId] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    githubUrl: "",
    linkedinUrl: "",
    openToWork: false,
    email: "",
    user_id: "",
  })
   useEffect( () => {
    if (!user || !user.email) return;
    const fetchData = async () => {
      try {
        const userId = user.$id
         const response = await databases.listDocuments(
          db,
          usercll,
          [Query.equal("user_id", userId)]
         )
         if ( response.total > 0 ) {
          const doc = response.documents[0]
          setDocId(doc.$id)
          setFormData({
            name: doc.name || "",
            skills: doc.skills || "",
            githubUrl: doc.githubUrl || "",
            linkedinUrl: doc.linkedinUrl || "",
            openToWork: doc.openToWork || false,
            email: doc.email || "",
            user_id: doc.user_id || "",
            
          })
         } else {
          setFormData({
            ...formData,
            email: user.email,
            name: user.name,
            user_id: user.$id,
          })
         }
      } catch (err) {
        console.error("Error fetching user data", err)
      }
    }
    fetchData()
   }, [user])

   const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSave = async () => {
    const payload = {
      ...formData,
      user_id: user.$id,
    }
    try {
      if (docId) {
        await databases.updateDocument(db, usercll, docId, payload)
      } else {
        await databases.createDocument(db, usercll, ID.unique(), payload)
      }
      alert("User data saved successfully")
    } catch (err) {
      console.error("Error saving user data", err)
      alert("Something went wrong while saving")
    }
  }


   if (loading) return <div>Loading...</div>
  if (!user) return <div className="text-red-500">User not logged in</div>;


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {user.email?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="pt-4">
          <button className="flex items-center gap-2 px-4 py-1.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            <FaUserEdit className="text-gray-500" />
            Change avatar
          </button>
          <p className="text-xs text-gray-400 mt-1">JPG, GIF, or PNG. Max 1MB.</p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nickname
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Enter your nickname"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md cursor-not-allowed"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FiCode /> Skills
          </label>
          <input
            type="text"
            name="skills"
            onChange={handleChange}
            value={formData.skills}
            placeholder="E.g. React, Tailwind, Firebase"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs pt-1">Maximum 3 skills:</p>
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaGithub /> GitHub URL
          </label>
          <input
            type="url"
            name="githubUrl"
            onChange={handleChange}
            value={formData.githubUrl}
            placeholder="https://github.com/username"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaLinkedin /> LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedinUrl"
            onChange={handleChange}
            value={formData.linkedinUrl}
            placeholder="https://linkedin.com/in/username"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center gap-4 mt-4">
          <label className="text-sm font-medium text-gray-700">Open to work?</label>
          <Switch
            checked={formData.openToWork}
            onChange={ (val) => setFormData(prev => ({ ...prev, openToWork: val}))}
            className={`${
              formData.openToWork ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                formData.openToWork ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              
            />
          </Switch>
        </div>
      </form>

      <div className="mt-8 flex justify-end">
        <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
          Save Changes
        </button>
      </div>
    </div>
  )
}
