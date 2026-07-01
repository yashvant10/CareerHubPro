import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FiMapPin, FiBriefcase, FiCheckCircle, FiUpload, FiFileText, FiUser, FiBookOpen, FiDollarSign, FiClock, FiArrowLeft } from 'react-icons/fi';

export default function JobDetailsApplicant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [appliedStatus, setAppliedStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    university_name: '',
    graduation_year: '2025',
    years_of_experience: '2 Years',
    current_company: '',
    expected_salary: '$95,000 / year',
    notice_period: 'Immediate (0-15 days)',
    cover_letter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`jobs/${id}/`),
      api.get('applications/')
    ])
      .then(([jobRes, appsRes]) => {
        setJob(jobRes.data);
        const existingApp = appsRes.data.find(a => String(a.job) === String(id) || String(a.job_details?.id) === String(id));
        if (existingApp) {
          setAppliedStatus(existingApp.status);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please attach your professional PDF or DOCX resume document before submitting!");
    if (!formData.university_name) return alert("Please enter your University / College Name.");

    setApplying(true);
    const payload = new FormData();
    payload.append('job', id);
    payload.append('university_name', formData.university_name);
    payload.append('graduation_year', formData.graduation_year);
    payload.append('years_of_experience', formData.years_of_experience);
    payload.append('current_company', formData.current_company);
    payload.append('expected_salary', formData.expected_salary);
    payload.append('notice_period', formData.notice_period);
    payload.append('cover_letter', formData.cover_letter || `Application submitted by ${formData.full_name || 'Candidate'}.`);
    payload.append('resume', resumeFile);

    api.post('applications/', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setAppliedStatus(res.data.status || 'Pending');
        setApplying(false);
        alert("🎉 Application Package Submitted Successfully! Your details, resume, and university credentials have been sent directly to the employer.");
        navigate('/applicant/dashboard');
      })
      .catch(err => {
        setApplying(false);
        alert("Error submitting application. Ensure all fields are filled.");
      });
  };

  if (loading) return <div className="p-20 text-center text-slate-500 animate-pulse font-medium">Loading position & application requirements...</div>;
  if (!job) return <div className="p-20 text-center text-slate-500">Job position not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/applicant/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6">
        <FiArrowLeft /> Back to Job Listings
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-slate-100">
          <div>
            <span className="px-3.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider">
              {job.category || 'Career Opportunity'}
            </span>
            <h1 className="text-4xl font-black text-slate-900 mt-3">{job.title}</h1>
            <p className="text-xl font-bold text-slate-600 mt-1">{job.company_details?.name || 'Confident Enterprise'}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-xl font-black text-slate-800 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-200">
              {job.min_salary && job.max_salary ? `$${job.min_salary.toLocaleString()} - $${job.max_salary.toLocaleString()}` : job.salary_range || 'Competitive Compensation'}
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1"><FiMapPin className="text-indigo-600"/> {job.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FiBriefcase className="text-indigo-600"/> {job.work_model}</span>
            </div>
          </div>
        </div>

        <div className="py-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Role Overview & Responsibilities</h3>
          <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-100">
            {job.description}
          </p>
        </div>

        {appliedStatus ? (
          <div className="p-8 bg-green-50 border-2 border-green-300 rounded-3xl text-center">
            <FiCheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-black text-green-950">Application Package Active</h3>
            <p className="text-green-800 font-medium mt-1">
              You have already applied for this position. Your current recruitment status is: <span className="font-bold underline">{appliedStatus}</span>.
            </p>
          </div>
        ) : (
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900">Official Candidate Application Form</h2>
              <p className="text-slate-600 mt-1">Please provide your complete academic credentials, work history, and resume document for recruiter evaluation.</p>
            </div>

            <form onSubmit={handleApply} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Full Legal Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      name="full_name" 
                      required 
                      placeholder="e.g. Alex Turner" 
                      value={formData.full_name} 
                      onChange={handleChange} 
                      className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">University / College Name *</label>
                  <div className="relative">
                    <FiBookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      name="university_name" 
                      required 
                      placeholder="e.g. Stanford University / IIT Delhi" 
                      value={formData.university_name} 
                      onChange={handleChange} 
                      className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Graduation Year *</label>
                  <select 
                    name="graduation_year" 
                    value={formData.graduation_year} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600 bg-white"
                  >
                    {['2027', '2026', '2025', '2024', '2023', '2022', '2021', '2020 or earlier'].map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Total Years of Experience *</label>
                  <select 
                    name="years_of_experience" 
                    value={formData.years_of_experience} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600 bg-white"
                  >
                    {['Fresher / Student (0 Years)', '1 Year', '2 Years', '3-5 Years', '6+ Senior Experience'].map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Current Company & Designation</label>
                  <input 
                    type="text" 
                    name="current_company" 
                    placeholder="e.g. Software Engineer at Infosys / Student at College" 
                    value={formData.current_company} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600"
                  >
                  </input>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Expected Annual Compensation *</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      name="expected_salary" 
                      placeholder="e.g. $95,000 / year or ₹12,00,000 PA" 
                      value={formData.expected_salary} 
                      onChange={handleChange} 
                      className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Notice Period *</label>
                  <div className="relative">
                    <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      name="notice_period" 
                      value={formData.notice_period} 
                      onChange={handleChange} 
                      className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600 bg-white"
                    >
                      <option value="Immediate (0-15 days)">Immediate (0-15 days)</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months or more">3 Months or more</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Attach Official Resume Document (.PDF / .DOCX) *</label>
                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-400 rounded-3xl cursor-pointer hover:bg-indigo-50/50 transition-colors bg-slate-50 text-center">
                  <FiUpload className="w-10 h-10 text-indigo-600 mb-2" />
                  <span className="text-sm font-black text-slate-800">
                    {resumeFile ? `Attached: "${resumeFile.name}"` : 'Click here to attach your PDF or DOCX Resume Document'}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">Maximum file size: 10MB</span>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Custom Cover Letter Note to Recruiter</label>
                <textarea 
                  name="cover_letter" 
                  rows="4" 
                  placeholder="Summarize your qualifications, academic projects, or why you are a great fit for this position..." 
                  value={formData.cover_letter} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3.5 border border-slate-300 rounded-2xl text-sm font-medium outline-none focus:border-indigo-600"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={applying} 
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl transition-all text-base flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <FiFileText className="text-xl" />
                {applying ? 'Submitting Application Package to Recruiter...' : 'Submit Complete Application & Attach Resume 🚀'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
