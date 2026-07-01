import { useState } from 'react';
export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Forgot Password</h2>
        {sent ? <p className="text-green-600 font-semibold">Password reset link sent to your email!</p> : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <input type="email" placeholder="Enter your registered email" required className="w-full px-4 py-3 border rounded-xl outline-none" />
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl">Send Reset OTP</button>
          </form>
        )}
      </div>
    </div>
  );
}