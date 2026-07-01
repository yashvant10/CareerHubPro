import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    api.get(`companies/${id}/`).then(res => setCompany(res.data)).catch(() => {});
  }, [id]);

  if (!company) return <div className="p-20 text-center text-slate-500">Loading company profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-4xl font-black text-slate-900">{company.name}</h1>
        <p className="text-slate-500 mt-2 font-medium">{company.location}</p>
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">About the Company</h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">{company.description}</p>
        </div>
      </div>
    </div>
  );
}