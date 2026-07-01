import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiTrash2, FiEdit3, FiUsers, FiPlusCircle } from 'react-icons/fi';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = () => {
    api.get('jobs/mine/')
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(() => {
        api.get('jobs/').then(res => { setJobs(res.data); setLoading(false); });
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job vacancy?")) {
      try {
        await api.delete(`jobs/${id}/`);
        setJobs(jobs.filter(j => j.id !== id));
        alert("Listing removed successfully!");
      } catch (err) {
        alert("Error removing listing.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">Employer Console</span>
          <h1 className="text-4xl font-black text-slate-900 mt-2">Manage Career Listings</h1>
          <p className="text-slate-600 mt-1">Monitor, edit, and audit active job postings and candidate pipelines.</p>
        </div>
        <Link 
          to="/employer/post-job" 
          className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
        >
          <FiPlusCircle className="text-lg" /> Publish New Vacancy
        </Link>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-500 animate-pulse">Loading listings table...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center">
          <FiBriefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No Active Job Postings</h3>
          <p className="text-slate-500 mt-1">Launch your first career vacancy to start receiving high-impact candidate resumes.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <th className="p-6">Job Title & Category</th>
                  <th className="p-6">Work Model & Location</th>
                  <th className="p-6">Compensation</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-6 font-bold text-slate-900">
                      <div className="text-lg">{job.title}</div>
                      <div className="text-xs font-semibold text-indigo-600 mt-0.5">{job.category || 'Engineering'}</div>
                    </td>
                    <td className="p-6 text-slate-600">
                      <div className="font-medium flex items-center gap-1.5"><FiMapPin className="text-indigo-600"/> {job.location}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{job.work_model} • {job.job_type}</div>
                    </td>
                    <td className="p-6 font-bold text-slate-800">
                      {job.min_salary && job.max_salary ? `$${job.min_salary.toLocaleString()} - $${job.max_salary.toLocaleString()}` : job.salary_range || 'Competitive'}
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Published</span>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      <Link 
                        to={`/employer/applicants?job=${job.id}&title=${encodeURIComponent(job.title)}`} 
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
                      >
                        <FiUsers /> View Applicants
                      </Link>
                      <Link 
                        to={`/jobs/${job.id}`} 
                        className="inline-flex items-center gap-1 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Inspect Listing
                      </Link>
                      <button 
                        onClick={() => handleDelete(job.id)} 
                        className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-colors"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
