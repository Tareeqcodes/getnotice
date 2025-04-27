'use client'
import { GitBranch } from "lucide-react"

export default function Top() {
  return (
    <div>
        <div>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="p-3 border-b">
                      <div className="grid grid-cols-12 items-center">
                        <div className="col-span-1 text-center font-bold text-gray-800">{item}</div>
                        <div className="col-span-7 flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <h3 className="font-medium">Contributor {item}</h3>
                            <p className="text-xs text-gray-500">Backend Developer</p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="font-medium">{400 - (item * 30)}</div>
                          <div className="text-xs text-gray-500">commits</div>
                        </div>
                        <div className="col-span-2 text-center">
                          <GitBranch size={16} className="inline mr-1" />
                          <span className="text-xs">{25 - (item * 3)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              
              <div className="p-3 text-center">
                <button className="text-purple-600 text-sm font-medium">View All Rankings</button>
              </div>
            </div>

  )
}
