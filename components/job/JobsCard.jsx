'use client';
import { useState } from "react";
import { Users, Code } from "lucide-react";
import Spinner from "@/components/Spinner";
import Apply from "./Apply";

export default function JobsCard({ jobs = [], loading = false, error = null }) {
  const [selectedType, setSelectedType] = useState('All');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const jobTypes = ["All", "Remote", "Internship", "Micro Task", "Challenge", "Open Source"];

  // Filter jobs by type
  const filteredJobs = selectedType === 'All' 
    ? jobs 
    : jobs.filter(job => job.jobType === selectedType);

  // Handle type filter selection
  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days left until deadline
  const getDaysLeft = (dateString) => {
    if (!dateString) return null;
    
    const deadline = new Date(dateString);
    const today = new Date();
    
    // Remove time portion for accurate day calculation
    deadline.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  // Handle close application modal
  const handleCloseModal = () => {
    setShowApplicationModal(false);
    // Small delay to prevent visual jumps
    setTimeout(() => setSelectedJob(null), 200);
  };

  // Handle successful application
  const handleApplicationSuccess = () => {
    // You could implement additional logic here like showing a success message
    // or refreshing the jobs list to show updated applicant count
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Trending Opportunities</h2>
        <button className="text-purple-600 text-sm hover:underline">Filter</button>
      </div>

      <div className="flex gap-3 mb-5 text-sm overflow-x-auto pb-2">
        {jobTypes.map(type => (
          <button 
            key={type} 
            className={`px-3 py-1 border rounded-full ${
              selectedType === type 
                ? 'bg-purple-600 text-white border-purple-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTypeFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : error ? ( 
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error.message || 'Failed to load opportunities. Please try again.'}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">No opportunities found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredJobs.map(job => {
            const daysLeft = getDaysLeft(job.deadline);
            const hasDeadline = job.deadline && daysLeft !== null;
            
            return (
              <div key={job.$id} className="bg-white rounded-xl shadow-md p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      {job.jobType && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {job.jobType}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{job.company}</p>
                    
                    {/* You could add profile matching logic here */}
                    {/* <div className="text-xs text-green-600 mt-1">Matches your profile: React, CSS</div> */}
                  </div>
                  
                  {hasDeadline && daysLeft <= 3 && daysLeft > 0 && (
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                      {daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
                    </span>
                  )}

                  {/* You could add top match badge here based on your matching logic */}
                   {/* <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Top Match</span>  */}
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  {job.description && (job.description.length > 150 
                    ? `${job.description.substring(0, 150)}...` 
                    : job.description)}
                </p>

                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-2">
                  {job.hoursPerWeek && <span>Est. {job.hoursPerWeek}</span>}
                  {job.compensation && <span>{job.compensation}</span>}
                  {job.location && <span>{job.location}</span>}
                  {job.deadline && <span>Deadline: {formatDate(job.deadline)}</span>}
                </div>

                <div className="flex justify-between items-center pt-2 border-t mt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    {job.applicants !== undefined && (
                      <>
                        <Users size={14} className="mr-1" />
                        <span>{job.applicants} applicants</span>
                      </>
                    )}
                    
                    {/* Example of conditional icon based on job type */}
                    {job.jobType === 'Open Source' && (
                      <>
                        <Code size={14} className="ml-3 mr-1" />
                        <span>Beginner-friendly</span>
                      </>
                    )}
                  </div>
                  <button onClick={handleApplyClick} className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700">
                    {job.jobType === 'Open Source' ? 'Contribute' : 'Apply'}
                  </button>
                </div>
              </div>
            );
          })}
          {showApplicationModal && selectedJob && (
                  <Apply
                    job={selectedJob}
                    onClose={handleCloseModal}
                    onSuccess={handleApplicationSuccess}
                  />
                )}
        </div>
      )}
      <div className="space-y-5 pt-5">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Junior Frontend Developer</h3>
              <p className="text-sm text-gray-500">TechStart Inc.</p>
              <div className="text-xs text-green-600 mt-1">Matches your profile: React, CSS</div>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Top Match</span>
          </div>

          <p className="text-sm text-gray-700 mb-3">We're looking for a React dev to join our team remotely. Great for junior devs eager to learn fast.</p>

          <div className="flex flex-wrap gap-2 text-xs mb-3">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">React</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">CSS</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Remote</span>
          </div>

          <div className="flex gap-4 text-xs text-gray-500 mb-2">
            <span>Est. 15 hrs/week</span>
            <span>$200 - $400/mo</span>
            <span>Remote</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t mt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Users size={14} className="mr-1" />
              <span>24 applicants</span>
            </div>
            <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Apply</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-900">Open Source Contributor</h3>
                <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Micro-Task</span>
              </div>
              <p className="text-sm text-gray-500">Mozilla Foundation</p>
              <div className="text-xs text-purple-700 mt-1">Earn public profile badge</div>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-3">Contribute to our documentation site to improve accessibility. Great starter task.</p>

          <div className="flex flex-wrap gap-2 text-xs mb-3">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">HTML</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">CSS</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Accessibility</span>
          </div>

          <div className="flex gap-4 text-xs text-gray-500 mb-2">
            <span>Est. 5 hrs</span>
            <span>Volunteer</span>
            <span>Remote</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t mt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Code size={14} className="mr-1" />
              <span>Beginner-friendly</span>
            </div>
            <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Contribute</button>
          </div>
        </div>

        {/* Job Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-gray-900">API Integration Challenge</h3>
              <p className="text-sm text-gray-500">CloudSystems Corp.</p>
              <div className="text-xs text-amber-700 mt-1">Top submissions earn interviews</div>
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">1 day left</span>
          </div>

          <p className="text-sm text-gray-700 mb-3">Solve a real-world API challenge. Top 10 submissions get fast-tracked to backend interviews.</p>

          <div className="flex flex-wrap gap-2 text-xs mb-3">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Node.js</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">REST API</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Backend</span>
          </div>

          <div className="flex gap-4 text-xs text-gray-500 mb-2">
            <span>1 day to complete</span>
            <span>Remote</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t mt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Users size={14} className="mr-1" />
              <span>42 submissions</span>
            </div>
            <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Start Challenge</button>
          </div>
        </div>
      </div>
  
    </div>
  );
}