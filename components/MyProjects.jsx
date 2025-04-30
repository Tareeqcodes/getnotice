"use client"

import { useState } from "react";
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import AddProject from "./AddProject";

export default function MyProjects({ user, projects }) {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


  return (
    <section>
    <div className="space-y-4 px-10 py-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">{user.name}My Projects</h2>
              <button onClick={openModal} className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">+ New Project</button>
            </div>
             
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-2">E-commerce Website</h3>
              <p className="text-sm text-gray-600 mb-3">A fully responsive e-commerce site built with React and Node.js</p>
              <div className="rounded-lg bg-gray-100 h-40 mb-3 flex items-center justify-center">
                <span className="text-gray-400">Project Screenshot</span>
              </div>
              <div className="flex gap-2 mb-3 justify-between">
                <div>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">React</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Node.js</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">MongoDB</span>
                </div>
                <button className="text-purple-600 text-sm">Edit</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-2">Weather App</h3>
              <p className="text-sm text-gray-600 mb-3">Simple weather application using OpenWeather API</p>
              <div className="rounded-lg bg-gray-100 h-40 mb-3 flex items-center justify-center">
                <span className="text-gray-400">Project Screenshot</span>
              </div>
              <div className="flex gap-2 mb-3 justify-between">
                <div>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">JavaScript</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">CSS</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">API</span>
                </div>
                <button className="text-purple-600 text-sm">Edit</button>
              </div>
            </div>
            {projects.map((p) => (
                        <div key={p.$id} className="border p-4 text-justify rounded-lg bg-gray-50">
                          <h3 className="text-lg font-semibold">{p.title}</h3>
                          <p className="text-sm text-gray-700 mb-2">{p.description}</p>
                          <div className="flex flex-wrap gap-2 py-3">
                            {p.techStack?.split(',').map((tech, i) => (
                              <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                               {tech.trim()}
                                </span>
                                  ))}
                                    </div>
                          <div className="flex gap-4">
                            {p.githubUrl && (
                              <a href={p.githubUrl} target="_blank" className="text-gray-600 hover:text-black flex items-center gap-1">
                                <FiGithub /> GitHub
                              </a>
                            )}
                            {p.demoUrl && (
                              <a href={p.demoUrl} target="_blank" className="text-gray-600 hover:text-black flex items-center gap-1">
                                <FiExternalLink /> Demo
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
          </div>
             
          {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
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
          </section>
  )
}
