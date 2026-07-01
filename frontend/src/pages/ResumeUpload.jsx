import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiTrash2, FiDownload } from 'react-icons/fi';

export default function ResumeUpload() {
  const [resumes, setResumes] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = () => {
    api.get('applications/resumes/')
      .then(res => {
        setResumes(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a resume file (.pdf or .docx)");

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);

    try {
      await api.post('applications/resumes/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Resume Uploaded Successfully!');
      setFile(null);
      setUploading(false);
      fetchResumes();
    } catch (err) {
      setUploading(false);
      alert('Error uploading resume document.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this resume file?")) {
      try {
        await api.delete(`applications/resumes/${id}/`);
        setResumes(resumes.filter(r => r.id !== id));
      } catch (err) {
        alert("Error removing file.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">Candidate Vault</span>
        <h1 className="text-4xl font-black text-slate-900 mt-2">Resume Document Management</h1>
        <p className="text-slate-600 mt-1">Upload and store your PDF or DOCX resume documents for instant 1-click job submissions.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Upload New Resume Document</h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-300 rounded-3xl cursor-pointer hover:bg-indigo-50/50 transition-colors bg-slate-50 text-center">
            <FiUploadCloud className="w-12 h-12 text-indigo-600 mb-3" />
            <span className="text-base font-bold text-slate-800">
              {file ? file.name : 'Click to choose resume file (.pdf, .doc, .docx)'}
            </span>
            <span className="text-xs text-slate-400 mt-1">Maximum file size: 10MB</span>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
          </label>

          {file && (
            <button 
              type="submit" 
              disabled={uploading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
            >
              <FiFileText />
              {uploading ? 'Uploading to Server...' : `Save & Upload "${file.name}"`}
            </button>
          )}
        </form>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Stored Resumes ({resumes.length})</h3>
        {loading ? (
          <p className="text-slate-500 animate-pulse text-center py-6">Loading saved documents...</p>
        ) : resumes.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <FiFileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p>No resume documents stored yet. Upload your first file above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map(res => (
              <div key={res.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <h4 className="font-bold text-slate-900">{res.title || 'Professional Resume Document'}</h4>
                    <span className="text-xs text-slate-400">Uploaded on {new Date(res.uploaded_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {res.file && (
                    <a 
                      href={res.file} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
                    >
                      <FiDownload /> Download / Preview
                    </a>
                  )}
                  <button 
                    onClick={() => handleDelete(res.id)} 
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete resume"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
