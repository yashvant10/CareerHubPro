import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { FiUsers, FiBriefcase, FiFileText, FiTarget, FiArrowRight } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0, companies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('auth/users/').catch(() => ({ data: [] })),
      api.get('jobs/').catch(() => ({ data: { results: [] } })),
      api.get('applications/').catch(() => ({ data: [] })),
      api.get('companies/').catch(() => ({ data: [] }))
    ]).then(([usersRes, jobsRes, appsRes, compRes]) => {
      const usersData = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.results || [];
      const jobsData = Array.isArray(jobsRes.data) ? jobsRes.data : jobsRes.data.results || [];
      const appsData = Array.isArray(appsRes.data) ? appsRes.data : appsRes.data.results || [];
      const compData = Array.isArray(compRes.data) ? compRes.data : compRes.data.results || [];
      
      setStats({
        users: usersData.length,
        jobs: jobsData.length,
        applications: appsData.length,
        companies: compData.length
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider">SuperAdmin Console</span>
        <h1 className="text-4xl font-black text-slate-900 mt-2">Platform Overview</h1>
        <p className="text-slate-600 font-medium mt-1">Monitor high-level metrics and access administrative modules.</p>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-500 animate-pulse font-bold">Aggregating Platform Data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: stats.users, icon: <FiUsers />, color: 'bg-indigo-100 text-indigo-700' },
            { label: 'Active Jobs', value: stats.jobs, icon: <FiBriefcase />, color: 'bg-green-100 text-green-700' },
            { label: 'Total Companies', value: stats.companies, icon: <FiTarget />, color: 'bg-purple-100 text-purple-700' },
            { label: 'Applications', value: stats.applications, icon: <FiFileText />, color: 'bg-orange-100 text-orange-700' },
          ].map((stat, i) => (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.color} text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Administrative Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Manage Users', desc: 'View, edit, or remove user accounts (Employers & Applicants).', link: '/admin/users' },
          { title: 'Manage Jobs', desc: 'Override or moderate job postings on the platform.', link: '/admin/jobs' },
          { title: 'Manage Companies', desc: 'Audit registered employer companies.', link: '/admin/companies' },
          { title: 'Manage Applications', desc: 'View full platform application pipeline.', link: '/admin/applications' },
          { title: 'Reports & Analytics', desc: 'Deep dive into platform growth and metrics.', link: '/admin/reports' },
        ].map((module, i) => (
          <Link to={module.link} key={i} className="group block bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
              {module.title}
              <FiArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-slate-500 mt-2">{module.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
