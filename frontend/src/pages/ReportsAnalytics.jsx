import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { FiArrowLeft, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';

export default function ReportsAnalytics() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0, companies: 0 });
  const [roleBreakdown, setRoleBreakdown] = useState({ employers: 0, applicants: 0, admins: 0 });
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

      const roles = { employers: 0, applicants: 0, admins: 0 };
      usersData.forEach(u => {
        if (u.role === 'employer') roles.employers++;
        else if (u.role === 'applicant') roles.applicants++;
        else roles.admins++;
      });
      setRoleBreakdown(roles);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Admin Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-600 mt-1">Deep dive into platform growth and engagement metrics.</p>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-500 font-bold animate-pulse">Aggregating Metrics...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><FiPieChart className="text-indigo-600" /> User Demographics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-700">
                  <span>Applicants</span>
                  <span>{roleBreakdown.applicants} ({Math.round((roleBreakdown.applicants / Math.max(1, stats.users)) * 100)}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div className="bg-indigo-500 h-4 rounded-full" style={{ width: `${(roleBreakdown.applicants / Math.max(1, stats.users)) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-700">
                  <span>Employers</span>
                  <span>{roleBreakdown.employers} ({Math.round((roleBreakdown.employers / Math.max(1, stats.users)) * 100)}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(roleBreakdown.employers / Math.max(1, stats.users)) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-700">
                  <span>Administrators</span>
                  <span>{roleBreakdown.admins}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div className="bg-red-500 h-4 rounded-full" style={{ width: `${(roleBreakdown.admins / Math.max(1, stats.users)) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><FiTrendingUp className="text-indigo-600" /> Platform Engagement</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center">
                <span className="font-bold text-indigo-900">Total Applications Processed</span>
                <span className="text-3xl font-black text-indigo-600">{stats.applications}</span>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex justify-between items-center">
                <span className="font-bold text-green-900">Active Job Postings</span>
                <span className="text-3xl font-black text-green-600">{stats.jobs}</span>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex justify-between items-center">
                <span className="font-bold text-purple-900">Registered Companies</span>
                <span className="text-3xl font-black text-purple-600">{stats.companies}</span>
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
}
