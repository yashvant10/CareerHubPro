import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiBriefcase, FiMapPin } from 'react-icons/fi';

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('applications/')
      .then(res => { setApplications(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">Candidate Tracker</span>
        <h1 className="text-4xl font-black text-slate-900 mt-2">Applied Jobs History</h1>
        <p className="text-slate-600 mt-1">Track the review timeline and hiring status of all your submitted applications.</p>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-500 animate-pulse">Loading application history...</div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center">
          <FiBriefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No Applications Submitted</h3>
          <p className="text-slate-500 mt-1">Explore open career listings and apply with 1-click to start tracking.</p>
          <Link to="/jobs" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm">Explore Open Jobs</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{app.job_details?.job_type || 'Full Time'}</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{app.job_details?.title || 'Applied Position'}</h3>
                <p className="text-slate-500 text-sm mt-1">{app.job_details?.company_details?.name || 'Enterprise Employer'}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm border border-indigo-100 flex items-center gap-1.5">
                  <FiCheckCircle /> Status: {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
