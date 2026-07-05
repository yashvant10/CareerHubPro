import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiMapPin, 
  FiBriefcase, 
  FiChevronDown, 
  FiUsers, 
  FiTrendingUp, 
  FiStar, 
  FiShield, 
  FiPhoneCall, 
  FiCompass, 
  FiArrowRight 
} from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import heroLanding from '../assets/hero_landing.png';
import binocularsLanding from '../assets/binoculars_landing.png';

export default function Landing() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Heading and Search */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Badge */}
              <div className="flex items-center gap-1.5 py-1.5 px-3.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full w-fit border border-indigo-100 shadow-sm mb-6">
                <FiStar className="text-amber-500 fill-amber-500" /> The #1 Hiring Platform in 2026
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
                Find Your <span className="text-indigo-600">Dream Job</span> <br/>
                Build Your Future
              </h1>

              {/* Subheading */}
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Discover top opportunities, connect with leading employers, and take the next big step in your career.
              </p>

              {/* Search Bar Container */}
              <div className="bg-white p-3 rounded-2xl lg:rounded-full border border-slate-200 shadow-xl shadow-slate-100 flex flex-col lg:flex-row items-center gap-3 max-w-3xl">
                {/* Job Title Input */}
                <div className="flex items-center gap-2 px-3 py-2 border-b lg:border-b-0 lg:border-r border-slate-100 w-full">
                  <FiSearch className="text-slate-400 w-5 h-5 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Job title, keywords, or company" 
                    className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm"
                  />
                </div>

                {/* Location Input */}
                <div className="flex items-center gap-2 px-3 py-2 border-b lg:border-b-0 lg:border-r border-slate-100 w-full">
                  <FiMapPin className="text-slate-400 w-5 h-5 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm"
                  />
                </div>

                {/* Categories Dropdown */}
                <div className="flex items-center justify-between gap-2 px-3 py-2 w-full text-slate-400 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FiBriefcase className="text-slate-400 w-5 h-5 flex-shrink-0" />
                    <span className="text-slate-500 text-sm font-medium">All Categories</span>
                  </div>
                  <FiChevronDown className="w-4 h-4" />
                </div>

                {/* Search Button */}
                <Link 
                  to={user ? (user.role === 'employer' ? "/employer" : "/applicant") : "/login"} 
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl lg:rounded-full transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 w-full lg:w-auto flex-shrink-0"
                >
                  Search Jobs
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Hero Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative flex justify-center lg:justify-end"
            >
              <img 
                src={heroLanding} 
                alt="Job Seeker Illustration" 
                className="w-full max-w-[540px] h-auto object-contain drop-shadow-xl"
              />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem icon={<FiBriefcase className="text-indigo-600 w-6 h-6" />} count="10,000+" label="Active Jobs" />
            <StatItem icon={<FiUsers className="text-emerald-600 w-6 h-6" />} count="5,000+" label="Companies" />
            <StatItem icon={<FiUsers className="text-amber-600 w-6 h-6" />} count="2M+" label="Active Users" />
            <StatItem icon={<FiShield className="text-blue-600 w-6 h-6" />} count="98%" label="Success Rate" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900">Why Choose CareerHub Pro?</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">Everything you need to find the best career opportunities or hire elite candidate profiles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FiCompass className="text-indigo-600" />} 
              title="Smart Job Matching" 
              desc="Our AI matches you with the most relevant jobs based on your skills and preferences." 
            />
            <FeatureCard 
              icon={<FiShield className="text-indigo-600" />} 
              title="Verified Employers" 
              desc="All companies are verified to ensure genuine opportunities and safe applications." 
            />
            <FeatureCard 
              icon={<FiTrendingUp className="text-indigo-600" />} 
              title="Career Growth" 
              desc="Access career resources, resume tips, and expert guides to grow faster." 
            />
            <FeatureCard 
              icon={<FiPhoneCall className="text-indigo-600" />} 
              title="24/7 Support" 
              desc="Our support team is always here to help you on your career journey." 
            />
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-3xl p-10 lg:p-14 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 z-10">
              <img 
                src={binocularsLanding} 
                alt="Binoculars Illustration" 
                className="w-20 h-20 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Ready to take the next step in your career?</h3>
                <p className="text-indigo-100 text-sm max-w-xl">Join thousands of professionals who found their dream jobs with CareerHub Pro.</p>
              </div>
            </div>
            <Link 
              to={user ? (user.role === 'employer' ? "/employer" : "/applicant") : "/login"} 
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-lg z-10 flex-shrink-0 group"
            >
              Get Started Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm font-medium">
          <p>© 2026 CareerHub Pro. All rights reserved. Capstone Project.</p>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ icon, count, label }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-black text-slate-900 leading-tight">{count}</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-300/50 transition-all">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
