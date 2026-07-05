import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import heroLanding from '../assets/hero_landing.png';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
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
    if (locationTerm) {
      result = result.filter(j => 
        (j?.location || '').toLowerCase().includes(locationTerm.toLowerCase())
      );
    }
    setFilteredJobs(result);
  }, [searchTerm, locationTerm, jobs]);

  // A list of round avatars to assign dynamically for premium visuals
  const avatars = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Nala"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50/20">
      {/* Top Banner Grid */}
      <div className="bg-indigo-50/50 rounded-3xl p-8 lg:p-12 mb-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 relative overflow-hidden">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 inline-block">Find Your Dream Role</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Explore Open <br/>
            Career Opportunities
          </h1>
          <p className="text-slate-600 mt-4 max-w-md font-medium text-sm leading-relaxed">
            Find the role that fits your ambition across thousands of companies.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img 
            src={heroLanding} 
            alt="Search Illustration" 
            className="w-full max-w-[280px] h-auto object-contain drop-shadow-md"
          />
        </div>
      </div>

      {/* Search Panel */}
      <div className="bg-white p-3 rounded-2xl lg:rounded-full border border-slate-200 shadow-xl shadow-slate-100/50 flex flex-col lg:flex-row items-center gap-3 max-w-5xl mx-auto mb-12">
        {/* Search Job */}
        <div className="flex items-center gap-2 px-3 py-2 border-b lg:border-b-0 lg:border-r border-slate-100 w-full">
          <FiSearch className="text-slate-400 w-5 h-5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search job titles or keywords..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm font-medium"
          />
        </div>

        {/* Location Dropdown/Input */}
        <div className="flex items-center gap-2 px-3 py-2 border-b lg:border-b-0 lg:border-r border-slate-100 w-full">
          <FiMapPin className="text-slate-400 w-5 h-5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="All Locations" 
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm font-medium"
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 w-full text-slate-400 cursor-pointer">
          <div className="flex items-center gap-2">
            <FiBriefcase className="text-slate-400 w-5 h-5 flex-shrink-0" />
            <span className="text-slate-500 text-sm font-medium">All Job Types</span>
          </div>
          <FiChevronDown className="w-4 h-4" />
        </div>

        {/* Search Button */}
        <button 
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl lg:rounded-full transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 w-full lg:w-auto flex-shrink-0"
        >
          Search Jobs
        </button>
      </div>

      {/* Main Grid Section */}
      {loading ? (
        <div className="p-20 text-center text-slate-500 animate-pulse font-bold">Querying Job Listings...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center max-w-2xl mx-auto">
          <FiBriefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No matching job positions found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your filters or searching for keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.05 }}
              key={job.id} 
              className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-extrabold uppercase tracking-wide">{job.job_type || 'Full Time'}</span>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50/50 p-2 flex items-center justify-center border border-slate-100">
                    <img src={avatars[idx % avatars.length]} alt="Category Avatar" className="w-full h-full object-contain" />
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug mb-1">{job.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">{job.company_details?.name || 'TechGiant Global'}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1.5"><FiMapPin className="text-indigo-600 w-3.5 h-3.5" /> {job.location}</span>
                  <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1.5"><FiBriefcase className="text-indigo-600 w-3.5 h-3.5" /> {job.work_model}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
                <Link 
                  to={`/applicant/job/${job.id}`} 
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                >
                  View Details <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
