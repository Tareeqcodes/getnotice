"use client";
import { formatDistanceToNow } from 'date-fns';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_STORAGE_ID
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID


export default function MyProjects({ post }) {
  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${post.imageFile}/view?project=${projectId}`;
  const imageSrc = post.imageFile ? imageUrl : '/placeholder-image.jpg';

  return (
    <section className="px-10 py-6">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{post.detail}</p>
        <div className="rounded-lg bg-gray-100 h-40 mb-3 relative">
        <Image
            src={imageSrc}
            alt={post.title || "Project image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {post.techStack?.split(',').map((tech, i) => (
              <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {tech.trim()}
              </span>
            ))}
           <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>

          </div>
          <button className="text-purple-600 text-sm">Edit</button>
        </div>
        <div className="flex gap-4">
          {post.githubUrl && (
            <a href={post.githubUrl} target="_blank" className="text-gray-600 hover:text-black flex items-center gap-1">
              <FiGithub /> GitHub
            </a>
          )}
          {post.demoUrl && (
            <a href={post.demoUrl} target="_blank" className="text-gray-600 hover:text-black flex items-center gap-1">
              <FiExternalLink /> Demo
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
