 'use client'

import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectModal({ user, projects, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white my-20 max-w-2xl w-full rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-2">{user.name}'s Projects</h2>
        <div className="space-y-4 p-2 md:p-6">
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
      </div>
    </div>
  );
}
