"use client"
import { Award,  GitBranch, Heart, TrendingUp, MessageSquare, Share2, Bookmark, Zap } from "lucide-react"

export default function WeeklyDev() {
  return (
    <div>
        <div className="p-4">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow mb-6">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Award size={20} className="mr-2" />
                  <h2 className="font-semibold">Developer of the Week</h2>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold text-lg">Maya Patel</h3>
                    <p className="text-sm opacity-90">Full Stack Developer</p>
                    <div className="flex text-black gap-2 mt-1">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">React</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Node.js</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">TypeScript</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-black bg-opacity-10 rounded-lg">
                  <p className="text-sm">
                    "Maya created an innovative accessibility tool that helps colorblind developers work more effectively with design systems. Her open-source contribution has already gained 200+ stars on GitHub."
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium">View Profile</button>
                  <div className="flex gap-3">
                    <div className="flex items-center">
                      <GitBranch size={16} className="mr-1" />
                      <span className="text-sm">437</span>
                    </div>
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1" />
                      <span className="text-sm">182</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <TrendingUp size={18} className="text-purple-600 mr-2" />
                  <h2 className="font-semibold text-gray-800">Rising Talent</h2>
                </div>
                <button className="text-purple-600 text-sm">See All</button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <h3 className="font-medium">Alex Johnson</h3>
                        <p className="text-xs text-gray-500">Frontend • 10 mo exp</p>
                      </div>
                      <div className="ml-auto flex items-center text-amber-500">
                        <Zap size={14} className="mr-1" />
                        <span className="text-xs font-medium">+24%</span>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">React</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">UI Design</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-800">Featured Projects</h2>
                <button className="text-purple-600 text-sm">Filter</button>
              </div>
            
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <h3 className="font-medium">Sarah Chen</h3>
                      <p className="text-xs text-gray-500">Frontend Developer • React • 1 year exp</p>
                    </div>
                    <div className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                      <Award size={12} className="mr-1" />
                      <span>Top Contributor</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-2">Portfolio Redesign Project</h4>
                  <p className="text-sm text-gray-600 mb-3">Just finished redesigning my portfolio with React and Tailwind CSS! Check out the responsive animations and dark mode toggle.</p>
                  <div className="rounded-lg bg-gray-100 h-48 mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Project Screenshot</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">React</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Tailwind</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Animation</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex gap-4">
                      <button className="flex items-center text-gray-500 text-sm">
                        <Heart size={16} className="mr-1" />
                        <span>48</span>
                      </button>
                      <button className="flex items-center text-gray-500 text-sm">
                        <MessageSquare size={16} className="mr-1" />
                        <span>12</span>
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <Bookmark size={18} className="text-gray-500" />
                      <Share2 size={18} className="text-gray-500" />
                    </div>
                  </div>
                </div>
            </div>
          </div>
            
    </div>
  )
}
