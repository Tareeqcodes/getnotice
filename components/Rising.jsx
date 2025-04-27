'use client'
import { TrendingUp } from "lucide-react"

export default function Rising() {
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
                            <h3 className="font-medium">Rising Dev {item}</h3>
                            <p className="text-xs text-gray-500">Frontend Developer</p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full inline-flex items-center">
                            <TrendingUp size={12} className="mr-1" />
                            <span>+{70 - (item * 10)}%</span>
                          </div>
                        </div>
                        <div className="col-span-2 text-center text-xs text-green-600">
                          New
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
    </div>
  )
}
