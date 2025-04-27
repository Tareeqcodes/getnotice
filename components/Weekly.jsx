'use client'
import { Award } from "lucide-react"

export default function weekly() {
  return (
    <>
        <div>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className={`p-3 border-b ${item === 1 ? 'bg-purple-50' : ''}`}>
                      <div className="grid grid-cols-12 items-center">
                        <div className="col-span-1 text-center font-bold text-gray-800">{item}</div>
                        <div className="col-span-7 flex items-center">
                          <div className={`w-10 h-10 ${item === 1 ? 'bg-purple-200' : 'bg-gray-200'} rounded-full mr-3`}></div>
                          <div>
                            <h3 className="font-medium">
                              {item === 1 ? 'Maya Patel' : `Developer ${item}`}
                              {item === 1 && <Award size={14} className="inline ml-1 text-purple-600" />}
                            </h3>
                            <p className="text-xs text-gray-500">Full Stack Developer</p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center font-medium">{610 - (item * 45)}</div>
                        <div className={`col-span-2 text-center text-xs ${item <= 2 ? 'text-green-600' : item === 3 ? 'text-gray-500' : 'text-red-500'}`}>
                          {item <= 2 ? '↑ ' + (3 - item) : item === 3 ? '–' : '↓ ' + (item - 3)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
    </>
  )
}
