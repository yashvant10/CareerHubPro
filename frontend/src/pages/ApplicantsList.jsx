import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiFileText, FiUser, FiDownload, FiDollarSign, FiFilter, FiRefreshCw } from 'react-icons/fi';

export default function ApplicantsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterJobId = searchParams.get('job');
  const filterJobTitle = searchParams.get('title');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAppId, setActiveAppId] = useState(null);
  const [interviewTime, setInterviewTime] = useState('July 3, 2026 at 2:00 PM EST');
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">Employer Console</span>
          <h1 className="text-4xl font-black text-slate-900 mt-2">Candidate Applications Review</h1>
          <p className="text-slate-600 mt-1">Review candidate resumes, cover letters, and approve or reject recruitment submissions.</p>
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

      {filterJobId && (
        <div className="p-5 bg-indigo-50/80 border border-indigo-200 rounded-2xl mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiFilter className="text-indigo-600 text-xl" />
            <div>
              <h4 className="font-bold text-indigo-950 text-sm">Active Filter: Showing candidates for job role</h4>
              <p className="text-xs text-indigo-700 font-semibold mt-0.5">{filterJobTitle || `Job ID #${filterJobId}`}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white text-indigo-700 font-black rounded-xl text-xs shadow-sm">
            {displayedApplications.length} {displayedApplications.length === 1 ? 'Candidate' : 'Candidates'}
          </span>
        </div>
      )}

      {loading ? (
        <div className="p-16 text-center text-slate-500 animate-pulse font-medium">Loading candidate submissions...</div>
      ) : displayedApplications.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center">
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
          {displayedApplications.map(app => (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={app.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{app.job_details?.title || 'Job Application'}</span>
                  {app.job_details?.location && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">{app.job_details.location}</span>
                  )}
                  {app.job_details?.work_model && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">{app.job_details.work_model}</span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-indigo-100 text-indigo-800'
                  }`}>Status: {app.status}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-3 flex items-center gap-2">
                  <FiUser className="text-indigo-600" /> {app.applicant_details?.username || 'Applicant User'}
                  <span className="text-sm font-normal text-slate-500">({app.applicant_details?.email})</span>
                </h3>

                {app.expected_salary && (
                  <p className="text-sm text-slate-700 font-medium mt-1 flex items-center gap-1">
                    <FiDollarSign className="text-green-600" /> Expected Salary: <span className="font-bold">{app.expected_salary}</span>
                  </p>
                )}

                {app.cover_letter && (
                  <p className="text-slate-600 text-sm mt-4 bg-slate-50 p-4 rounded-2xl italic border border-slate-100">
                    "{app.cover_letter}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <Link 
                  to={`/employer/applicant/${app.id}`} 
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  👁️ Inspect Profile & Gmail
                </Link>

                {app.resume ? (
                  <a 
                    href={app.resume} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-sm transition-colors border border-blue-200"
                  >
                    <FiDownload /> View Resume PDF
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic px-2">No file uploaded</span>
                )}

                <button onClick={() => handleStatusChange(app.id, 'Shortlisted')} className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-sm transition-colors border border-indigo-200">
                  📅 Schedule Interview / Shortlist
                </button>
                {app.status === 'Shortlisted' && (
                  <Link to={`/interview/${app.interview_room || 'techgiant-room-1'}`} className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md animate-pulse">
                    🎥 Enter Live Room
                  </Link>
                )}
                
                <button onClick={() => handleStatusChange(app.id, 'Accepted')} className="flex items-center gap-1.5 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors">
                  <FiCheckCircle /> Approve / Hire
                </button>
                
                <button onClick={() => handleStatusChange(app.id, 'Rejected')} className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-colors">
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
