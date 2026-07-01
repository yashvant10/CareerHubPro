import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
export default function SuccessConfirmation() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-slate-900 mb-2">Success!</h1>
        <p className="text-slate-600 mb-8">Your operation completed successfully and has been recorded in the database.</p>
        <Link to="/" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl">Return Home</Link>
      </div>
    </div>
  );
}