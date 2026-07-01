import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiTrash2, FiArrowLeft, FiSearch, FiBriefcase } from 'react-icons/fi';

export default function ManageEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEmployers = () => {
    api.get('auth/users/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setEmployers(data.filter(u => u.role === 'employer'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employer account?")) {
      api.delete(`auth/users/${id}/`)
        .then(() => {
          alert('Employer deleted.');
          fetchEmployers();
        })
        .catch(() => alert('Failed to delete employer.'));
    }
  };

  const filteredEmployers = employers.filter(u => 
    (u.username || '').toLowerCase().includes(search.toLowerCase()) || 
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Admin Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Manage Employers</h1>
          <p className="text-slate-600 mt-1">Total registered employers: {employers.length}</p>
        </div>
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search employers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-500 font-bold animate-pulse">Loading employers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployers.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-500">No employers found.</td></tr>
                ) : filteredEmployers.map(user => (
                  <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold">#{user.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                      <FiBriefcase className="text-indigo-400" /> {user.username}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
