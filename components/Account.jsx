"use client"

// import { useAuth } from '@/context/authContext'



export default function Account() {
  // const { user } =useAuth();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your account details like password or delete your account.
      </p>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-md font-medium text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back.</p>
        <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  )
}
