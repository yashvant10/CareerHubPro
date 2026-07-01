import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6">Our Story</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          CareerHub Pro was founded with a single mission: to bridge the gap between world-class talent and innovative companies.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Mission</h3>
          <p className="text-slate-600">To empower professionals by providing access to the best career opportunities globally.</p>
        </div>
      </div>
    </div>
  );
}
