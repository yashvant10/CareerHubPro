import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiSearch, FiDollarSign } from 'react-icons/fi';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'applications'

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('jobs/');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await api.get('applications/');
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = (jobId) => {
    navigate(`/applicant/job/${jobId}`);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company_details?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Applicant Dashboard</h1>
          <p className="text-slate-500 mt-1">Find and manage your next career move.</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab('browse')} className={`px-6 py-3 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'browse' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Browse Jobs
        </button>
        <button onClick={() => setActiveTab('applications')} className={`px-6 py-3 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'applications' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          My Applications ({applications.length})
        </button>
      </div>

      {activeTab === 'browse' && (
        <>
          <div className="relative mb-8 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <FiSearch />
            </div>
            <input 
              type="text" 
              placeholder="Search jobs by title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <motion.div key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{job.title}</h3>
                    <p className="text-indigo-600 font-semibold text-lg">{job.company_details?.name}</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xl">
                    {job.company_details?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg flex items-center gap-1"><FiMapPin /> {job.location}</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg flex items-center gap-1"><FiBriefcase /> {job.work_model}</span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm font-medium rounded-lg flex items-center gap-1"><FiClock /> {job.job_type}</span>
                  {job.salary_range && <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg flex items-center gap-1"><FiDollarSign /> {job.salary_range}</span>}
                </div>

                <p className="text-slate-600 line-clamp-3 mb-8 flex-grow">{job.description}</p>
                
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center mt-auto">
                  <span className="text-sm text-slate-500">Posted recently</span>
                  <button 
                    onClick={() => handleApply(job.id)}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5 text-xs"
                  >
                    Fill Application Details ➔
                  </button>
                </div>
              </motion.div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No jobs found</h3>
                <p className="text-slate-500">Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-2">
          {applications.map(app => (
            <div key={app.id} className="p-6 border-b border-slate-100 last:border-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 rounded-2xl transition-colors">
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">{app.job_details?.title}</h4>
                <p className="text-slate-600 font-medium">{app.job_details?.company_details?.name}</p>
                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><FiMapPin /> {app.job_details?.location}</span>
                  <span className="flex items-center gap-1"><FiClock /> {new Date(app.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-3 mt-4 sm:mt-0">
                <span className={`px-4 py-2 rounded-xl text-sm font-black ${
                  app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'Shortlisted' || app.status === 'Interview' ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' : 'bg-red-100 text-red-800'
                }`}>
                  Status: {app.status}
                </span>

                {(app.status === 'Shortlisted' || app.status === 'Interview') && (
                  <div className="p-4 bg-indigo-950 text-white rounded-2xl border border-indigo-800 shadow-xl max-w-md text-left">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                      📅 Scheduled Virtual Interview
                    </div>
                    <p className="text-sm font-black text-white">
                      Time: {app.interview_time || 'July 3, 2026 at 2:00 PM EST'}
                    </p>
                    <Link 
                      to={`/interview/${app.interview_room || 'techgiant-room-8821'}`} 
                      className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs shadow-md transition-all animate-pulse"
                    >
                      🎥 Attend Live Interview Room Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
          {applications.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              You haven't applied to any jobs yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
