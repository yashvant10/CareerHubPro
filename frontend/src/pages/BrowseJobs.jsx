import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign, FiArrowRight } from 'react-icons/fi';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('jobs/')
      .then(res => {
        const jobData = Array.isArray(res.data) ? res.data : res.data.results || [];
        setJobs(jobData);
        setFilteredJobs(jobData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = Array.isArray(jobs) ? jobs : [];
    if (searchTerm) {
      result = result.filter(j => 
        (j?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (j?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(j => (j.category || 'Engineering') === selectedCategory);
    }
    setFilteredJobs(result);
  }, [searchTerm, selectedCategory, jobs]);

  const categories = ['All', 'Engineering', 'Data Science', 'Design', 'DevOps', 'Product'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">Applicant Job Marketplace</span>
        <h1 className="text-4xl font-black text-slate-900 mt-2">Browse Career Opportunities</h1>
        <p className="text-slate-600 mt-1">Discover your next dream role from world-class tech companies and startups.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input 
            type="text" 
            placeholder="Search roles by keyword, title, or skills..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center text-slate-500 animate-pulse font-medium">Loading live career vacancies...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center">
          <FiBriefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No matching job positions found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your keyword filter or switching category tabs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={job.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase">{job.category || 'Engineering'}</span>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">{job.job_type}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mt-4 mb-1">{job.title}</h3>
                <p className="text-sm font-bold text-slate-500">{job.company_details?.name || 'Confident Enterprise'}</p>

                <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-600 font-semibold">
                  <span className="flex items-center gap-1.5"><FiMapPin className="text-indigo-600"/> {job.location}</span>
                  <span className="flex items-center gap-1.5"><FiBriefcase className="text-indigo-600"/> {job.work_model}</span>
                </div>

                <p className="text-slate-600 text-sm mt-4 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                <div className="text-base font-black text-slate-800">
                  {job.min_salary && job.max_salary ? `$${job.min_salary.toLocaleString()} - $${job.max_salary.toLocaleString()}` : job.salary_range || 'Competitive Compensation'}
                </div>
                <Link 
                  to={`/applicant/job/${job.id}`} 
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-sm text-xs transition-all"
                >
                  View & Apply <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
