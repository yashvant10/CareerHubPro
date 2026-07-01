import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiBriefcase, FiLogOut, FiFileText, FiPlusCircle, FiList } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              C
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">CareerHub<span className="text-indigo-600">Pro</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Explore Jobs</Link>
            <Link to="/companies" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Companies</Link>
            <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">About</Link>
            <Link to="/faq" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">FAQ</Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2">Log in</Link>
                <Link to="/register" className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-sm">
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {user.role === 'applicant' && (
                  <div className="hidden sm:flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <Link to="/applicant/browse-jobs" className="hover:text-indigo-600">Browse</Link>
                    <Link to="/applicant/applied-jobs" className="hover:text-indigo-600">Applications</Link>
                    <Link to="/applicant/resume-upload" className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg"><FiFileText /> Upload Resume</Link>
                  </div>
                )}
                {user.role === 'employer' && (
                  <div className="hidden sm:flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <Link to="/employer/post-job" className="flex items-center gap-1.5 text-white bg-indigo-600 px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-indigo-700"><FiPlusCircle /> Post Job</Link>
                  </div>
                )}
                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                <Link 
                  to={user.role === 'employer' ? '/employer/dashboard' : '/applicant/dashboard'}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-bold text-slate-800 pr-1">{user.username}</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
