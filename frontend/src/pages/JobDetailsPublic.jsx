import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { FiMapPin, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

export default function JobDetailsPublic() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`jobs/${id}/`).then(res => { setJob(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 text-center text-slate-500 animate-pulse">Loading job details...</div>;
  if (!job) return <div className="p-20 text-center text-slate-500">Job position not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">{job.job_type}</span>
        <h1 className="text-4xl font-black text-slate-900 mt-4">{job.title}</h1>
        <p className="text-lg text-slate-600 mt-2">{job.company_details?.name}</p>
        <div className="flex flex-wrap gap-6 mt-6 text-sm text-slate-700 font-medium">
          <span className="flex items-center gap-2"><FiMapPin className="text-indigo-600"/> {job.location}</span>
          <span className="flex items-center gap-2"><FiBriefcase className="text-indigo-600"/> {job.work_model}</span>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
          <Link to={`/applicant/job/${job.id}`} className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">Apply Now</Link>
        </div>
      </div>
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Description</h3>
          <p className="text-slate-600 whitespace-pre-line leading-relaxed">{job.description}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Requirements</h3>
          <p className="text-slate-600 whitespace-pre-line leading-relaxed">{job.requirements}</p>
        </div>
      </div>
    </div>
  );
}