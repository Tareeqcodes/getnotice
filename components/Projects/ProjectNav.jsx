"use client"
import { useState } from "react";
import AddProject from "./AddProject"


export default function ProjectNav() {
    const [showModal, setShowModal] = useState(false);
      const openModal = () => setShowModal(true);
      const closeModal = () => setShowModal(false);

  return (
    <div>
        <div className="flex justify-between px-10 mb-4">
        <h2 className="text-lg font-semibold">My Projects</h2>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
          + New Project
        </button>
      </div>
      {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <AddProject onProjectAdded={closeModal} />
                </div>
              </div>
            )}
          

    </div>
  )
}
