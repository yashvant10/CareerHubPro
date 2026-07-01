import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Engineering',
    work_model: 'Remote',
    job_type: 'Full Time',
    location: '',
    min_salary: '',
    max_salary: '',
    currency: 'USD',
    vacancies: 1,
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: ''
  });

  useState(() => {
    api.get('companies/mine/').then(res => {
      if (res.data && res.data.length > 0) {
        setCompanyId(res.data[0].id);
      }
    }).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        company: companyId || 1,
        min_salary: Number(formData.min_salary) || 0,
        max_salary: Number(formData.max_salary) || 0,
        vacancies: Number(formData.vacancies) || 1
      };
      await api.post('jobs/', payload);
      setLoading(false);
      alert('Job Opportunity Published Successfully!');
      navigate('/employer/manage-jobs');
    } catch (err) {
      setLoading(false);
      alert('Error publishing job. Please ensure your employer profile and company are active.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase">Recruitment Console</span>
        <h1 className="text-4xl font-black text-slate-900 mt-2">Publish New Career Vacancy</h1>
        <p className="text-slate-600 mt-1">Create an advanced job posting with comprehensive requirements, compensation parameters, and perks.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Job Title *</label>
            <input 
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Lead Full Stack Architect"
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Job Category *</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium bg-white"
            >
              <option value="Engineering">Engineering & Software</option>
              <option value="Data Science">AI & Data Science</option>
              <option value="Design">UI/UX & Product Design</option>
              <option value="DevOps">Cloud & DevOps</option>
              <option value="Product">Product Management</option>
              <option value="Security">Cybersecurity</option>
              <option value="Marketing">Growth & Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Work Model *</label>
            <select 
              name="work_model"
              value={formData.work_model}
              onChange={handleChange}
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium bg-white"
            >
              <option value="Remote">Remote (100% Work from Anywhere)</option>
              <option value="Hybrid">Hybrid (Flexible Office & Home)</option>
              <option value="On-site">On-site (Physical HQ Location)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Employment Type *</label>
            <select 
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium bg-white"
            >
              <option value="Full Time">Full Time</option>
              <option value="Contract">Contract / Freelance</option>
              <option value="Internship">Internship</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Location / City *</label>
            <input 
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA or Global Remote"
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Number of Vacancies *</label>
            <input 
              type="number"
              min="1"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Minimum Salary ($ USD) *</label>
            <input 
              type="number"
              required
              name="min_salary"
              value={formData.min_salary}
              onChange={handleChange}
              placeholder="e.g. 110000"
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Maximum Salary ($ USD) *</label>
            <input 
              type="number"
              required
              name="max_salary"
              value={formData.max_salary}
              onChange={handleChange}
              placeholder="e.g. 165000"
              className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Detailed Job Description *</label>
          <textarea 
            required
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the mission of the role, team culture, and impact..."
            className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Candidate Requirements & Qualifications *</label>
          <textarea 
            required
            rows={4}
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="• 4+ years of React / Python experience&#10;• Experience with distributed cloud systems&#10;• Strong communication skills"
            className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Key Responsibilities *</label>
          <textarea 
            required
            rows={3}
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="• Lead architecture and technical direction&#10;• Mentor junior developers and run code reviews"
            className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Perks & Benefits Offered</label>
          <textarea 
            rows={2}
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Health insurance, 401k match, unlimited PTO, annual wellness stipend"
            className="w-full p-4 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 font-medium"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all text-base"
        >
          {loading ? 'Publishing Vacancy...' : 'Launch & Publish Career Listing'}
        </button>
      </form>
    </div>
  );
}
