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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Employer Dashboard</h1>
        <p className="text-slate-500 mt-1 font-medium">Managing <span className="text-indigo-600 font-bold">{company.name}</span></p>
      </div>

      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('jobs')} 
          className={`px-8 py-3.5 font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'jobs' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiBriefcase /> Active Jobs ({jobs.length})
        </button>

        <button 
          onClick={() => setActiveTab('applications')} 
          className={`px-8 py-3.5 font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'applications' ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiUsers /> Applications ({applications.length})
        </button>
      </div>

      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <motion.div key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Active</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                <div className="space-y-1.5 mb-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><FiMapPin className="text-indigo-600" /> {job.location}</div>
                  <div className="flex items-center gap-2"><FiClock className="text-indigo-600" /> {job.job_type}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                <span className="text-sm font-bold text-slate-700">
                  <FiUsers className="inline mr-1 text-indigo-600" /> {applications.filter(a => String(a.job) === String(job.id)).length} Applications
                </span>
                <Link to={`/employer/applicants?job=${job.id}&title=${encodeURIComponent(job.title)}`} className="text-xs font-bold text-indigo-600 hover:underline">
                  View Applications
                </Link>
              </div>
            </motion.div>
          ))}
          {jobs.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">You haven't posted any jobs yet.</p>
              <Link to="/employer/post-job" className="inline-block mt-4 text-indigo-600 font-bold hover:underline">Post a job now</Link>
            </div>
          )}
        </div>
      )}

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
