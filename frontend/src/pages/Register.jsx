import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPlusCircle, FiArrowRight } from 'react-icons/fi';
import heroLanding from '../assets/hero_landing.png';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', role: 'applicant', first_name: '', last_name: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      if (formData.role === 'employer') {
        navigate('/employer');
      } else {
        navigate('/applicant');
      }
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Column: Visual Brand Banner */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-50/50 relative overflow-hidden">
        <div className="max-w-md mx-auto my-auto flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Start Your Journey</h1>
          <p className="text-slate-600 mb-8 font-medium leading-relaxed">
            Create an account to discover top jobs, connect with top-tier employers, and accelerate your career path.
          </p>
          <img 
            src={heroLanding} 
            alt="Sign Up Banner" 
            className="w-full max-w-[340px] h-auto object-contain mb-8 drop-shadow-lg"
          />
          <div className="w-full py-4 px-6 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/50 flex items-center gap-3 shadow-sm">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl text-lg">💡</span>
            <span className="text-xs font-bold text-slate-600 text-left">Setting up takes under a minute. Connect with employers immediately!</span>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm">
              <FiPlusCircle />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
            <p className="text-sm text-slate-500 mt-1.5 font-medium">Join us! Let's get your profile set up</p>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">First Name</label>
                <input 
                  type="text" 
                  name="first_name" 
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 placeholder-slate-400 text-sm font-medium" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Last Name</label>
                <input 
                  type="text" 
                  name="last_name" 
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 placeholder-slate-400 text-sm font-medium" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="username"
                  placeholder="Choose a username"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 placeholder-slate-400 text-sm font-medium" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 placeholder-slate-400 text-sm font-medium" 
                  onChange={handleChange} 
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
                  type="password" 
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 placeholder-slate-400 text-sm font-medium" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">I want to...</label>
              <select 
                name="role" 
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-800 text-sm font-medium cursor-pointer" 
                onChange={handleChange}
              >
                <option value="applicant">Search & Apply for Jobs</option>
                <option value="employer">Post Jobs & Recruit Talent</option>
              </select>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 hover:-translate-y-0.5 mt-6"
            >
              Sign Up <FiArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 font-semibold text-sm">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
