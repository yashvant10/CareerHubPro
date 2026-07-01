import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Landing() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-5xl relative z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
            🚀 The #1 Hiring Platform in 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Find Your Dream Job with <br/>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">CareerHub Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most advanced AI-powered job board platform. Connect with elite employers and discover opportunities that accelerate your career.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            {(!user || user.role === 'applicant') && (
              <Link to={user ? "/applicant" : "/login"} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:-translate-y-1">
                <FiSearch className="w-5 h-5" /> Browse Open Roles
              </Link>
            )}
            {(!user || user.role === 'employer') && (
              <Link to={user ? "/employer" : "/login"} className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                <FiBriefcase className="w-5 h-5" /> Post a Job Now
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose CareerHub Pro?</h2>
            <p className="mt-4 text-lg text-slate-600">Everything you need to hire or get hired.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiBriefcase />} 
              title="10,000+ Active Jobs" 
              desc="New opportunities posted every single day across hundreds of different industries and categories." 
            />
            <FeatureCard 
              icon={<FiUsers />} 
              title="Top Global Companies" 
              desc="We partner with Fortune 500s and fast-growing startups to bring you the best opportunities." 
            />
            <FeatureCard 
              icon={<FiTrendingUp />} 
              title="Accelerated Growth" 
              desc="Use our advanced AI tools and resources to level up your career and stand out." 
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>© 2026 CareerHub Pro. All rights reserved. Capstone Project.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-white border border-slate-200 shadow-sm rounded-3xl"
    >
      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center gap-2 text-indigo-600 font-semibold text-sm">
        <FiCheckCircle /> Verified Feature
      </div>
    </motion.div>
  );
}
