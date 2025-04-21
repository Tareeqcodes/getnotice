 'use client'
import { useAuth } from "@/context/authContext"
import { FaGithub, FaLinkedin, FaUserEdit } from "react-icons/fa"
import { FiCode } from "react-icons/fi"
import { Switch } from "@headlessui/react"

export default function PersonalInfo() {
  const { user, loading } = useAuth()
   if (loading) return <div>Loading...</div>
  if (!user) return <div className="text-red-500">User not logged in</div>;


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
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
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            defaultValue={user.name}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
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
            placeholder="E.g. React, Tailwind, Firebase"
            defaultValue={user.skills}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaGithub /> GitHub URL
          </label>
          <input
            type="url"
            placeholder="https://github.com/username"
            defaultValue={user.githubUrl}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaLinkedin /> LinkedIn URL
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/username"
            defaultValue={user.linkedinUrl}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center gap-4 mt-4">
          <label className="text-sm font-medium text-gray-700">Open to work?</label>
          <Switch
            checked={user.openToWork}
            onChange={() => {}}
            className={`${
              user.openToWork ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                user.openToWork ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>
      </form>

      <div className="mt-8 flex justify-end">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
          Save Changes
        </button>
      </div>
    </div>
  )
}
