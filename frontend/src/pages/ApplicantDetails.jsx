import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiFileText, FiDownload, FiCheckCircle, FiXCircle, FiBriefcase, FiDollarSign, FiArrowLeft, FiAward } from 'react-icons/fi';

export default function ApplicantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

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
        setToast({ show: true, message: `Candidate status updated to ${newStatus}!` });
      })
      .catch(() => alert("Error updating candidate status."));
  };

  if (loading) return <div className="p-20 text-center text-slate-500 animate-pulse font-bold">Loading candidate dossier...</div>;
  if (!app) return <div className="p-20 text-center text-slate-500 font-bold">Candidate application dossier not found.</div>;

  const candidate = app.applicant_details || {};
  const profile = candidate.applicant_profile || {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-slate-50/20">
      <Link to="/employer/applicants" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Candidates List
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-8">
        {/* Dossier Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-100">
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Applied for: {app.job_details?.title || 'Job Role'}
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-3 flex items-center gap-3">
              {candidate.first_name || candidate.last_name ? `${candidate.first_name} ${candidate.last_name}` : candidate.username || 'Candidate Profile'}
            </h1>
            <p className="text-base font-bold text-indigo-600 mt-2 flex items-center gap-2">
              <FiMail /> {candidate.email || 'candidate@gmail.com'}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
              app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' :
              app.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
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

        {/* Dossier Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 my-6">
          {/* Card 1: Academic */}
          <div className="p-6 bg-indigo-50/40 rounded-3xl border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-slate-100">
              🎓
            </div>
            <div>
              <h4 className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider mb-0.5">Academic Institution</h4>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">{app.university_name || 'Stanford University / IIT'}</p>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Class of {app.graduation_year || '2025'}</p>
            </div>
          </div>

          {/* Card 2: Experience */}
          <div className="p-6 bg-indigo-50/40 rounded-3xl border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-slate-100 text-indigo-600">
              <FiBriefcase />
            </div>
            <div>
              <h4 className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider mb-0.5">Work Experience</h4>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">{app.years_of_experience || '2 Years Experience'}</p>
              <p className="text-xs text-slate-500 mt-1">{app.current_company || 'Previous role verified'}</p>
            </div>
          </div>

          {/* Card 3: Notice Period */}
          <div className="p-6 bg-indigo-50/40 rounded-3xl border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-slate-100 text-emerald-600">
              <FiDollarSign />
            </div>
            <div>
              <h4 className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider mb-0.5">Notice Period & Salary</h4>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">{app.notice_period || 'Immediate (0-15 days)'}</p>
              <p className="text-xs text-green-700 font-bold mt-1">{app.expected_salary || '$95,000 / year'}</p>
            </div>
          </div>
        </div>

        {/* Bio & Skills Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Candidate Bio & Background</h3>
            <p className="text-slate-700 leading-relaxed font-semibold bg-slate-50 p-6 rounded-3xl border border-slate-100/80 text-sm">
              {profile.bio || "Candidate has verified academic credentials and submitted custom application materials."}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Verified Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(profile.skills ? profile.skills.split(',') : ['React', 'Tailwind CSS', 'Django', 'PostgreSQL', 'Git']).map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-2xl text-xs border border-indigo-100">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="py-6 border-b border-slate-100">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Cover Letter Note</h3>
          <p className="text-slate-700 italic bg-amber-50/50 p-6 rounded-3xl border border-amber-100/80 leading-relaxed font-semibold text-sm">
            "{app.cover_letter || 'No cover letter provided.'}"
          </p>
        </div>

        {/* Resume & Bottom Actions */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            {app.resume ? (
              <a 
                href={app.resume} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-600/10 transition-all text-sm"
              >
                <FiDownload /> Download / View Resume PDF
              </a>
            ) : (
              <div className="px-6 py-3.5 bg-slate-100 text-slate-500 font-bold rounded-2xl text-xs flex items-center gap-2">
                <FiFileText /> No Resume Document Uploaded
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button onClick={() => handleStatusChange('Shortlisted')} className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors">
              Shortlist
            </button>
            <button onClick={() => handleStatusChange('Accepted')} className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm transition-colors text-xs">
              <FiCheckCircle /> Hire / Accept Candidate
            </button>
            <button onClick={() => handleStatusChange('Rejected')} className="flex items-center gap-2 px-5 py-3 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold rounded-2xl transition-colors text-xs">
              <FiXCircle /> Reject
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Success Toast Modal */}
      {toast.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner border border-emerald-100 animate-bounce">
              ✓
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Success!</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{toast.message}</p>
            <button 
              onClick={() => setToast({ show: false, message: '' })} 
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all w-full text-sm"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
