import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiTrash2, FiArrowLeft, FiSearch, FiExternalLink } from 'react-icons/fi';

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCompanies = () => {
    api.get('companies/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setCompanies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this company and all its jobs?")) {
      api.delete(`companies/${id}/`)
        .then(() => {
          alert('Company deleted.');
          fetchCompanies();
        })
        .catch(() => alert('Failed to delete company.'));
    }
  };

  const filteredCompanies = companies.filter(c => 
    (c.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (c.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Admin Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Manage Companies</h1>
          <p className="text-slate-600 mt-1">Audit and moderate registered employers.</p>
        </div>
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search companies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-500 font-bold animate-pulse">Loading companies...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Website</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-slate-500">No companies found.</td></tr>
                ) : filteredCompanies.map(company => (
                  <tr key={company.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold">#{company.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{company.name}</td>
                    <td className="px-6 py-4">{company.location || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {company.website ? (
                        <a href={company.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                          Visit <FiExternalLink />
                        </a>
                      ) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                      <button onClick={() => handleDelete(company.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
