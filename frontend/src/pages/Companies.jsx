import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiGlobe, FiMapPin } from 'react-icons/fi';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('companies/').then(res => { setCompanies(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 mb-8">Featured Companies</h1>
      {loading ? <div className="p-12 text-center">Loading companies...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companies.map(c => (
            <div key={c.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                {c.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{c.name}</h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-3">{c.description}</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-600"><FiMapPin /> {c.location}</div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link to={`/companies/${c.id}`} className="text-indigo-600 font-bold text-sm hover:underline">View Company Profile &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}