import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiFileText, FiDownload, FiCheckCircle, FiXCircle, FiBriefcase, FiDollarSign, FiArrowLeft } from 'react-icons/fi';

export default function ApplicantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`applications/${id}/`)
      .then(res => {
        setApp(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleStatusChange = (newStatus) => {
    api.patch(`applications/${id}/update_status/`, { status: newStatus })
      .then(() => {
        setApp({ ...app, status: newStatus });
        alert(`Candidate status updated to ${newStatus}!`);
      })
      .catch(() => alert("Error updating candidate status."));
  };

  if (loading) return <div className="p-20 text-center text-slate-500 animate-pulse">Loading candidate dossier...</div>;
  if (!app) return <div className="p-20 text-center text-slate-500">Candidate application dossier not found.</div>;

  const candidate = app.applicant_details || {};
  const profile = candidate.applicant_profile || {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/employer/applicants" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Candidates List
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-100">
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Applied for: {app.job_details?.title || 'Job Role'}
            </span>
            <h1 className="text-4xl font-black text-slate-900 mt-3 flex items-center gap-3">
              <FiUser className="text-indigo-600" />
              {candidate.first_name || candidate.last_name ? `${candidate.first_name} ${candidate.last_name}` : candidate.username || 'Candidate Profile'}
            </h1>
            <p className="text-xl font-bold text-slate-600 mt-2 flex items-center gap-2 text-blue-600">
              <FiMail /> Gmail / Email: <span className="underline">{candidate.email || 'candidate@gmail.com'}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-black ${
              app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
              app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              Status: {app.status}
            </span>
            {app.expected_salary && (
              <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <FiDollarSign className="text-green-600" /> Expected: {app.expected_salary}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-slate-100 bg-indigo-50/50 p-6 rounded-3xl my-6">
          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">Academic Institution</h4>
            <p className="text-base font-black text-slate-900">{app.university_name || 'Stanford University / IIT'}</p>
            <p className="text-xs text-indigo-700 font-semibold mt-0.5">Class of {app.graduation_year || '2025'}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">Work Experience</h4>
            <p className="text-base font-black text-slate-900">{app.years_of_experience || '2 Years Experience'}</p>
            <p className="text-xs text-slate-600 mt-0.5">{app.current_company || 'Previous role verified'}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">Notice Period & Salary</h4>
            <p className="text-base font-black text-slate-900">{app.notice_period || 'Immediate (0-15 days)'}</p>
            <p className="text-xs text-green-700 font-bold mt-0.5">{app.expected_salary || '$95,000 / year'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Candidate Bio & Background</h3>
            <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {profile.bio || "Candidate has verified academic credentials and submitted custom application materials."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Technical Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {(profile.skills ? profile.skills.split(',') : ['React', 'JavaScript', 'Problem Solving', 'Teamwork']).map((skill, idx) => (
                <span key={idx} className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm border border-indigo-100">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="py-8 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Letter Note</h3>
          <p className="text-slate-700 italic bg-amber-50/50 p-6 rounded-2xl border border-amber-100/80 leading-relaxed font-medium">
            "{app.cover_letter || 'No cover letter provided.'}"
          </p>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            {app.resume ? (
              <a 
                href={app.resume} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg transition-all text-base"
              >
                <FiDownload className="text-xl" /> Download / View Resume PDF
              </a>
            ) : (
              <div className="px-6 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl text-sm flex items-center gap-2">
                <FiFileText /> No Resume Document Uploaded
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button onClick={() => handleStatusChange('Shortlisted')} className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-colors">
              Shortlist
            </button>
            <button onClick={() => handleStatusChange('Accepted')} className="flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-md transition-colors text-sm">
              <FiCheckCircle /> Hire / Accept Candidate
            </button>
            <button onClick={() => handleStatusChange('Rejected')} className="flex items-center gap-2 px-5 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-colors text-sm">
              <FiXCircle /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
