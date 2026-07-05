import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiUsers, FiEye } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

export default function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs', 'applications'

  useEffect(() => {
    fetchCompany();
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await api.get('companies/mine/');
      if (res.data.length > 0) setCompany(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get('jobs/mine/');
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

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      await api.post('companies/', Object.fromEntries(formData));
      fetchCompany();
    } catch (err) {
      console.error(err);
      alert(err.response?.data ? JSON.stringify(err.response.data) : 'Error creating company.');
    }
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to CareerHub Pro!</h2>
          <p className="text-slate-600 mb-8">Before you can manage your dashboard, please set up your company profile.</p>
          <form onSubmit={handleCreateCompany} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input type="text" name="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" name="location" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md mt-4">
              Create Company
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // A list of round avatars to assign dynamically for premium visuals
  const avatars = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Nala"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50/20">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            Employer Dashboard 👋
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Manage your job postings and track applications.
          </p>
        </div>
        <Link 
          to="/employer/post-job" 
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-600/10 text-sm flex items-center gap-2"
        >
          + Create New Job
        </Link>
      </div>

      {/* Styled Tabs */}
      <div className="bg-slate-100 p-1 rounded-full flex gap-1 w-fit mb-8 shadow-inner border border-slate-200/50">
        <button 
          onClick={() => setActiveTab('jobs')} 
          className={`px-6 py-2.5 font-bold text-xs rounded-full transition-all flex items-center gap-2 ${
            activeTab === 'jobs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiBriefcase /> Active Jobs ({jobs.length})
        </button>

        <button 
          onClick={() => setActiveTab('applications')} 
          className={`px-6 py-2.5 font-bold text-xs rounded-full transition-all flex items-center gap-2 ${
            activeTab === 'applications' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiUsers /> Applications ({applications.length})
        </button>
      </div>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, idx) => {
            const jobAppsCount = applications.filter(a => String(a.job) === String(job.id)).length;
            return (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-50 text-green-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                    <button className="text-slate-400 hover:text-slate-600 text-lg font-bold">•••</button>
                  </div>
                  
                  {/* Category Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50/50 p-2 flex items-center justify-center border border-slate-100 mb-4">
                    <img src={avatars[idx % avatars.length]} alt="Category Avatar" className="w-full h-full object-contain" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug mb-1">{job.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">{company.name}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1.5"><FiMapPin className="text-indigo-600 w-3.5 h-3.5" /> {job.location}</span>
                    <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1.5"><FiClock className="text-indigo-600 w-3.5 h-3.5" /> {job.job_type}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                  <span className="text-xs font-bold text-slate-500">
                    <FiUsers className="inline mr-1 text-indigo-600" /> {jobAppsCount} Applications
                  </span>
                  <Link 
                    to={`/employer/applicants?job=${job.id}&title=${encodeURIComponent(job.title)}`} 
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                  >
                    View Applications <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            );
          })}
          {jobs.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">You haven't posted any jobs yet.</p>
              <Link to="/employer/post-job" className="inline-block mt-4 text-indigo-600 font-bold hover:underline">Post a job now</Link>
            </div>
          )}
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {applications.map(app => {
              const applicantName = app.applicant_details?.first_name 
                ? `${app.applicant_details.first_name} ${app.applicant_details.last_name}` 
                : app.applicant_details?.username || 'Candidate';
                
              return (
                <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="text-lg font-black text-slate-900">{applicantName}</h4>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">Applied for: {app.job_details?.title || 'Position Application'}</p>
                  </div>

                  <Link 
                    to={`/employer/applicant/${app.id}`} 
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
                  >
                    <FiEye /> View Application
                  </Link>
                </div>
              );
            })}
            {applications.length === 0 && (
              <div className="p-16 text-center text-slate-500 font-medium">No applications received yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
