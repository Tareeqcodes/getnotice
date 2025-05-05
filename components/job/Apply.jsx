'use client';
import { useState } from 'react';
import { X, Send, Paperclip, AlertCircle } from 'lucide-react';
import { databases, ID, storage } from '@/config/appwrite';
import { useAuth } from '@/context/authContext';

export default function Apply({ job, onClose, onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    portfolioUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      // Limit file size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setResumeFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to apply');
      setLoading(false);
      return;
    }

    try {
      let resumeFileId = null;

      // Upload resume file if provided
      if (resumeFile) {
        const fileUpload = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
          ID.unique(),
          resumeFile
        );
        resumeFileId = fileUpload.$id;
      }

      // Submit application to database
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
        process.env.NEXT_PUBLIC_APPWRITE_APPLICATIONS_ID,
        ID.unique(),
        {
          job_id: job.$id,
          job_title: job.title,
          company: job.company,
          user_id: user.$id,
          user_name: user.name || 'Applicant',
          user_email: formData.contactEmail,
          user_phone: formData.contactPhone,
          cover_letter: formData.coverLetter,
          portfolio_url: formData.portfolioUrl,
          resume_file_id: resumeFileId,
          status: 'pending',
          applied_at: new Date().toISOString()
        }
      );

      // Update application count on the job
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
        process.env.NEXT_PUBLIC_APPWRITE_JOBS_ID,
        job.$id,
        {
          applicants: (job.applicants || 0) + 1
        }
      );

      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Apply for {job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600">
              Your application for {job.title} at {job.company} has been successfully submitted.
              You'll be notified of any updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">About this opportunity</h3>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">{job.title} • {job.company}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.jobType && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{job.jobType}</span>}
                  {job.location && <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{job.location}</span>}
                </div>
                {job.compensation && <p className="text-xs text-gray-500">Compensation: {job.compensation}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email*
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="(Optional) Your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume / CV
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="resume-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                      <span>Upload a file</span>
                      <input
                        id="resume-upload"
                        name="resume-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC up to 5MB</p>
                  {resumeFile && (
                    <p className="text-sm text-green-600 mt-2">
                      {resumeFile.name} selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio / Github URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter / Additional Info
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell the employer why you're interested and why you'd be a good fit..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
                <Send size={16} className="ml-2" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}