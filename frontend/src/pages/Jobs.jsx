import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiDollarSign, FiBriefcase } from 'react-icons/fi';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('jobs/').then(res => {
      const jobData = Array.isArray(res.data) ? res.data : res.data.results || [];
      setJobs(jobData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredJobs = (Array.isArray(jobs) ? jobs : []).filter(j => 
    (j?.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (j?.category || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Explore Open Career Opportunities</h1>
        <p className="text-lg text-slate-600">Find the role that fits your ambition across thousands of companies.</p>
        <div className="mt-8 max-w-2xl mx-auto flex bg-white rounded-full shadow-lg p-2 border border-slate-200">
          <div className="flex-1 flex items-center px-4 gap-2 text-slate-400">
            <FiSearch className="text-xl" />
            <input type="text" placeholder="Search job titles or keywords..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent outline-none text-slate-800" />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1,2,3,4].map(n => <div key={n} className="h-48 bg-slate-200 rounded-3xl" />)}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-xl text-slate-500 font-semibold">No job listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <motion.div whileHover={{ y: -4 }} key={job.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">{job.job_type}</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4">{job.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{job.company_details?.name || 'Confident Company'}</p>
                <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-1"><FiMapPin className="text-indigo-500"/> {job.location}</span>
                  <span className="flex items-center gap-1"><FiBriefcase className="text-indigo-500"/> {job.work_model}</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link to={`/jobs/${job.id}`} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">View Details</Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}