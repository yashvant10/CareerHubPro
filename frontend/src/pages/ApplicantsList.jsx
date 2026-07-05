import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiFileText, FiUser, FiDownload, FiDollarSign, FiFilter, FiRefreshCw, FiMail, FiCalendar, FiVideo } from 'react-icons/fi';

export default function ApplicantsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterJobId = searchParams.get('job');
  const filterJobTitle = searchParams.get('title');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAppId, setActiveAppId] = useState(null);
  const [interviewTime, setInterviewTime] = useState('July 5, 2026 at 2:00 PM EST');
  const [interviewRoom, setInterviewRoom] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    api.get('applications/')
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === 'Shortlisted' || newStatus === 'Interview') {
      setActiveAppId(id);
      setInterviewRoom(`techgiant-room-${id}`);
      setModalOpen(true);
      return;
    }

    executeStatusUpdate(id, newStatus, null, null);
  };

  const confirmInterview = () => {
    executeStatusUpdate(activeAppId, 'Shortlisted', interviewTime, interviewRoom);
    setModalOpen(false);
  };

  const executeStatusUpdate = (id, newStatus, time, room) => {
    api.patch(`applications/${id}/update_status/`, { status: newStatus, interview_time: time, interview_room: room })
      .then(() => {
        alert(`Candidate ${newStatus}!`);
        fetchApplications();
      })
      .catch(err => alert("Error updating status"));
  };

  const displayedApplications = filterJobId
    ? applications.filter(a => String(a.job) === String(filterJobId) || String(a.job_details?.id) === String(filterJobId))
    : applications;

  // A list of round avatars to assign dynamically for premium visuals
  const avatars = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Nala",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50/20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-extrabold uppercase tracking-wide">Employer Console</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mt-2">Candidate Applications Review</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm">Review candidate resumes, cover letters, and approve or reject recruitment submissions.</p>
        </div>

        {filterJobId && (
          <button 
            onClick={() => setSearchParams({})}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs transition-colors shadow-sm"
          >
            <FiRefreshCw /> Show All Applicants Across All Jobs
          </button>
        )}
      </div>

      {/* Active Filter Banner */}
      {filterJobId && (
        <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-3xl mb-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <FiFilter className="text-indigo-600 text-xl" />
            <div>
              <h4 className="font-extrabold text-indigo-950 text-sm">Active Filter: Showing candidates for</h4>
              <p className="text-xs text-indigo-700 font-semibold mt-0.5">{filterJobTitle || `Job ID #${filterJobId}`}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-white text-indigo-700 font-black rounded-xl text-xs shadow-sm border border-slate-100">
            {displayedApplications.length} {displayedApplications.length === 1 ? 'Candidate' : 'Candidates'}
          </span>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="p-16 text-center text-slate-500 animate-pulse font-bold">Querying Candidate Pipeline...</div>
      ) : displayedApplications.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center max-w-2xl mx-auto">
          <FiUser className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No Candidates Found</h3>
          <p className="text-slate-500 mt-1">
            {filterJobId 
              ? `No candidates have submitted applications specifically for "${filterJobTitle || 'this position'}" yet.`
              : "Applications submitted by job seekers will appear here immediately."}
          </p>
          {filterJobId && (
            <button 
              onClick={() => setSearchParams({})}
              className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md hover:bg-indigo-700"
            >
              View All Applications Across Other Jobs
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayedApplications.map((app, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.05 }}
              key={app.id} 
              className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:shadow-md transition-all"
            >
              <div className="flex gap-4 items-start flex-grow">
                {/* Profile Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-indigo-50/50 p-2 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                  <img src={avatars[idx % avatars.length]} alt="Candidate Avatar" className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold text-slate-900 leading-none">
                    {app.applicant_details?.username || 'Applicant User'}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1"><FiMail /> {app.applicant_details?.email}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-extrabold uppercase tracking-wide">{app.job_details?.title || 'Job Application'}</span>
                    {app.job_details?.location && (
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-extrabold uppercase tracking-wide">{app.job_details.location}</span>
                    )}
                    {app.job_details?.work_model && (
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-extrabold uppercase tracking-wide">{app.job_details.work_model}</span>
                    )}
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide ${
                      app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' :
                      app.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                    }`}>Status: {app.status}</span>
                  </div>
                </div>
              </div>

              {/* Actions Grid */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex-shrink-0">
                <Link 
                  to={`/employer/applicant/${app.id}`} 
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-sm shadow-indigo-600/10"
                >
                  Inspect Profile & Gmail
                </Link>

                <button 
                  onClick={() => handleStatusChange(app.id, 'Shortlisted')} 
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl text-xs transition-colors"
                >
                  <FiCalendar /> Schedule Interview / Shortlist
                </button>

                {app.status === 'Shortlisted' && (
                  <Link 
                    to={`/interview/${app.interview_room || 'techgiant-room-1'}`} 
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl text-xs transition-colors shadow-md animate-pulse"
                  >
                    <FiVideo /> Enter Live Room
                  </Link>
                )}
                
                <button 
                  onClick={() => handleStatusChange(app.id, 'Accepted')} 
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-sm transition-colors"
                >
                  <FiCheckCircle /> Approve / Hire
                </button>
                
                <button 
                  onClick={() => handleStatusChange(app.id, 'Rejected')} 
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold rounded-2xl text-xs transition-colors"
                >
                  <FiXCircle /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Schedule Interview Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Schedule Interview</h3>
            <p className="text-slate-500 mb-6 text-sm">Set up a live virtual interview room for this candidate.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Date & Time</label>
                <input 
                  type="text" 
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Virtual Room ID</label>
                <input 
                  type="text" 
                  value={interviewRoom}
                  onChange={(e) => setInterviewRoom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={confirmInterview} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">
                Confirm Schedule
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
