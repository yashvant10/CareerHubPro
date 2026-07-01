import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Landing from './pages/Landing';
import Jobs from './pages/Jobs';
import JobDetailsPublic from './pages/JobDetailsPublic';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Authentication Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Applicant Suite
import ApplicantDashboard from './pages/ApplicantDashboard';
import BrowseJobs from './pages/BrowseJobs';
import SearchResults from './pages/SearchResults';
import JobDetailsApplicant from './pages/JobDetailsApplicant';
import SavedJobs from './pages/SavedJobs';
import AppliedJobs from './pages/AppliedJobs';
import ApplicationDetails from './pages/ApplicationDetails';
import ApplicationStatus from './pages/ApplicationStatus';
import ResumeUpload from './pages/ResumeUpload';
import ResumePreview from './pages/ResumePreview';
import EditResume from './pages/EditResume';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';
import ApplicantNotifications from './pages/ApplicantNotifications';
import AccountSettings from './pages/AccountSettings';

// Employer Suite
import EmployerDashboard from './pages/EmployerDashboard';
import CompanyProfile from './pages/CompanyProfile';
import EditCompanyProfile from './pages/EditCompanyProfile';
import PostJob from './pages/PostJob';
import EditJob from './pages/EditJob';
import ManageJobs from './pages/ManageJobs';
import JobAnalytics from './pages/JobAnalytics';
import ApplicantsList from './pages/ApplicantsList';
import ApplicantDetails from './pages/ApplicantDetails';
import EmployerNotifications from './pages/EmployerNotifications';
import EmployerSettings from './pages/EmployerSettings';

// Admin Suite
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageEmployers from './pages/ManageEmployers';
import ManageApplicants from './pages/ManageApplicants';
import ManageCompanies from './pages/ManageCompanies';
import ManageJobsAdmin from './pages/ManageJobsAdmin';
import ManageApplications from './pages/ManageApplications';
import ReportsAnalytics from './pages/ReportsAnalytics';

// System Pages
import SuccessConfirmation from './pages/SuccessConfirmation';
import AccessDenied from './pages/AccessDenied';
import VirtualInterview from './pages/VirtualInterview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetailsPublic />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Applicant Suite */}
              <Route path="/applicant" element={<ProtectedRoute allowedRole="applicant"><ApplicantDashboard /></ProtectedRoute>} />
              <Route path="/applicant/dashboard" element={<ProtectedRoute allowedRole="applicant"><ApplicantDashboard /></ProtectedRoute>} />
              <Route path="/applicant/browse-jobs" element={<ProtectedRoute allowedRole="applicant"><BrowseJobs /></ProtectedRoute>} />
              <Route path="/applicant/search" element={<ProtectedRoute allowedRole="applicant"><SearchResults /></ProtectedRoute>} />
              <Route path="/applicant/job/:id" element={<ProtectedRoute allowedRole="applicant"><JobDetailsApplicant /></ProtectedRoute>} />
              <Route path="/applicant/saved-jobs" element={<ProtectedRoute allowedRole="applicant"><SavedJobs /></ProtectedRoute>} />
              <Route path="/applicant/applied-jobs" element={<ProtectedRoute allowedRole="applicant"><AppliedJobs /></ProtectedRoute>} />
              <Route path="/applicant/application/:id" element={<ProtectedRoute allowedRole="applicant"><ApplicationDetails /></ProtectedRoute>} />
              <Route path="/applicant/application-status/:id" element={<ProtectedRoute allowedRole="applicant"><ApplicationStatus /></ProtectedRoute>} />
              <Route path="/applicant/resume-upload" element={<ProtectedRoute allowedRole="applicant"><ResumeUpload /></ProtectedRoute>} />
              <Route path="/applicant/resume-preview" element={<ProtectedRoute allowedRole="applicant"><ResumePreview /></ProtectedRoute>} />
              <Route path="/applicant/resume-edit" element={<ProtectedRoute allowedRole="applicant"><EditResume /></ProtectedRoute>} />
              <Route path="/applicant/profile" element={<ProtectedRoute allowedRole="applicant"><MyProfile /></ProtectedRoute>} />
              <Route path="/applicant/profile-edit" element={<ProtectedRoute allowedRole="applicant"><EditProfile /></ProtectedRoute>} />
              <Route path="/applicant/notifications" element={<ProtectedRoute allowedRole="applicant"><ApplicantNotifications /></ProtectedRoute>} />
              <Route path="/applicant/settings" element={<ProtectedRoute allowedRole="applicant"><AccountSettings /></ProtectedRoute>} />

              {/* Employer Suite */}
              <Route path="/employer" element={<ProtectedRoute allowedRole="employer"><EmployerDashboard /></ProtectedRoute>} />
              <Route path="/employer/dashboard" element={<ProtectedRoute allowedRole="employer"><EmployerDashboard /></ProtectedRoute>} />
              <Route path="/employer/profile" element={<ProtectedRoute allowedRole="employer"><CompanyProfile /></ProtectedRoute>} />
              <Route path="/employer/profile-edit" element={<ProtectedRoute allowedRole="employer"><EditCompanyProfile /></ProtectedRoute>} />
              <Route path="/employer/post-job" element={<ProtectedRoute allowedRole="employer"><PostJob /></ProtectedRoute>} />
              <Route path="/employer/job-edit/:id" element={<ProtectedRoute allowedRole="employer"><EditJob /></ProtectedRoute>} />
              <Route path="/employer/manage-jobs" element={<ProtectedRoute allowedRole="employer"><ManageJobs /></ProtectedRoute>} />
              <Route path="/employer/analytics" element={<ProtectedRoute allowedRole="employer"><JobAnalytics /></ProtectedRoute>} />
              <Route path="/employer/applicants" element={<ProtectedRoute allowedRole="employer"><ApplicantsList /></ProtectedRoute>} />
              <Route path="/employer/applicant/:id" element={<ProtectedRoute allowedRole="employer"><ApplicantDetails /></ProtectedRoute>} />
              <Route path="/employer/notifications" element={<ProtectedRoute allowedRole="employer"><EmployerNotifications /></ProtectedRoute>} />
              <Route path="/employer/settings" element={<ProtectedRoute allowedRole="employer"><EmployerSettings /></ProtectedRoute>} />

              {/* Admin Suite */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/employers" element={<ManageEmployers />} />
              <Route path="/admin/applicants" element={<ManageApplicants />} />
              <Route path="/admin/companies" element={<ManageCompanies />} />
              <Route path="/admin/jobs" element={<ManageJobsAdmin />} />
              <Route path="/admin/applications" element={<ManageApplications />} />
              <Route path="/admin/reports" element={<ReportsAnalytics />} />

              {/* System Routes */}
              <Route path="/success" element={<SuccessConfirmation />} />
              <Route path="/unauthorized" element={<AccessDenied />} />
              <Route path="/interview/:room" element={<VirtualInterview />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
