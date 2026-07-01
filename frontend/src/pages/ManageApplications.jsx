import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiTrash2, FiArrowLeft, FiSearch, FiFileText } from 'react-icons/fi';

export default function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchApplications = () => {
    api.get('applications/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this application?")) {
      api.delete(`applications/${id}/`)
        .then(() => {
          alert('Application deleted.');
          fetchApplications();
        })
        .catch(() => alert('Failed to delete application.'));
    }
  };

  const filteredApps = applications.filter(a => 
    (a.applicant_details?.username || '').toLowerCase().includes(search.toLowerCase()) || 
    (a.job_details?.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Admin Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Manage Applications</h1>
          <p className="text-slate-600 mt-1">Audit all candidate submissions across the platform.</p>
        </div>
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search applicants..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-500 font-bold animate-pulse">Loading applications...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Target Job</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-slate-500">No applications found.</td></tr>
                ) : filteredApps.map(app => (
                  <tr key={app.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold">#{app.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                      <FiFileText className="text-indigo-400" /> {app.applicant_details?.username || 'Unknown'}
                    </td>
                    <td className="px-6 py-4">{app.job_details?.title || 'Unknown Job'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        app.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>{app.status}</span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                      <button onClick={() => handleDelete(app.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
