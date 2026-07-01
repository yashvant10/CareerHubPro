import { Link } from 'react-router-dom';
export default function AccessDenied() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-red-600 mb-4">403 Unauthorized</h1>
      <p className="text-slate-600 mb-8">You do not have permission to view this page with your current user role.</p>
      <Link to="/" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl">Back to Home</Link>
    </div>
  );
}