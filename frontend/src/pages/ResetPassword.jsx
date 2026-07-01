export default function ResetPassword() {
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Set New Password</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert("Password updated successfully!"); }} className="space-y-4">
          <input type="password" placeholder="New Password" required className="w-full px-4 py-3 border rounded-xl outline-none" />
          <input type="password" placeholder="Confirm Password" required className="w-full px-4 py-3 border rounded-xl outline-none" />
          <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl">Reset Password</button>
        </form>
      </div>
    </div>
  );
}