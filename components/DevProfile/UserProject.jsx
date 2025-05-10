'use client'
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export default function UserProject({projects}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.$id} className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.techStack?.split(',').map((tech, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      #{tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.imageFile && (
                <div className="mb-4">
                  <Image
                    src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${project.imageFile}/view?project=${projectId}`}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              )}
              
              <div className="flex gap-4 mt-auto">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
