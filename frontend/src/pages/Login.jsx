import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import heroLanding from '../assets/hero_landing.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decodedUser = await login(username, password);
      if (decodedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (decodedUser.role === 'employer') {
        navigate('/employer');
      } else {
        navigate('/applicant');
      }
    } catch (err) {
      if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        setError('Backend API server is currently offline.');
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Column: Visual Brand Banner */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-50/50 relative overflow-hidden">
        <div className="max-w-md mx-auto my-auto flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Welcome Back!</h1>
          <p className="text-slate-600 mb-8 font-medium leading-relaxed">
            Sign in to continue your journey and discover amazing opportunities designed for you.
          </p>
          <img 
            src={heroLanding} 
            alt="Welcome Banner" 
            className="w-full max-w-[340px] h-auto object-contain mb-8 drop-shadow-lg"
          />
          <div className="w-full py-4 px-6 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/50 flex items-center gap-3 shadow-sm">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl text-lg">🛡️</span>
            <span className="text-xs font-bold text-slate-600 text-left">Your career journey starts here. Let's build your future together!</span>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm">
              <FiLock />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Sign In</h2>
            <p className="text-sm text-slate-500 mt-1.5 font-medium">Welcome back! Please sign in to your account</p>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-semibold text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email or Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Enter your email or username"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 text-sm font-medium"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 text-sm font-medium"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm font-semibold mb-4">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Sign In <FiArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase">or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2.5 px-4 py-3.5 border border-slate-200 rounded-2xl font-bold text-slate-700 text-sm hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 px-4 py-3.5 border border-slate-200 rounded-2xl font-bold text-slate-700 text-sm hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.8 16.32 4.67 9.17 9.38 8.93c1.23.08 2.06.67 2.76.67.72 0 1.76-.78 3.25-.6 1.54.18 2.72.78 3.39 1.83-3.12 1.87-2.38 5.92.27 6.99-.68 1.7-1.46 3.51-2 4.46zM12.03 8.75c-.08-2.6 2.13-4.82 4.72-4.88.29 2.97-2.9 5.35-4.72 4.88z"/>
              </svg>
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-slate-500 font-semibold text-sm">
            Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
