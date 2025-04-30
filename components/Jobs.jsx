'use client'
import { Users, Code } from "lucide-react"


export default function Jobs() {

  return (
    <div>
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Trending Opportunities</h2>
              <button className="text-purple-600 text-sm">Filter</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">Junior Frontend Developer</h3>
                    <p className="text-sm text-gray-600">TechStart Inc.</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Top Match</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Looking for a motivated junior developer with React experience to join our growing team.</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">React</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">CSS</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Remote</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center text-xs text-gray-500">
                    <Users size={14} className="mr-1" />
                    <span>24 applicants</span>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Apply</button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">Open Source Contribution</h3>
                      <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Micro-Task</span>
                    </div>
                    <p className="text-sm text-gray-600">Mozilla Foundation</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">Help improve accessibility features in our documentation website. Perfect for beginners with HTML/CSS skills.</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">HTML</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">CSS</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Accessibility</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center text-xs text-gray-500">
                    <Code size={14} className="mr-1" />
                    <span>Beginner-friendly</span>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Contribute</button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">Code Challenge: API Integration</h3>
                    <p className="text-sm text-gray-600">CloudSystems Corp.</p>
                  </div>
                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">1 day left</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Solve our API integration challenge and get considered for our junior backend role! Top submissions will be invited for interviews.</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Node.js</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">REST APIs</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Backend</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center text-xs text-gray-500">
                    <Users size={14} className="mr-1" />
                    <span>42 submissions</span>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Start Challenge</button>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}
