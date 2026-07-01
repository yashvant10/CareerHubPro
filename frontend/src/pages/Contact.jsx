import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
        <h1 className="text-5xl font-black text-slate-900 mb-6">Get in Touch</h1>
        <p className="text-xl text-slate-600 mb-12">Have questions about CareerHub Pro? Our team is here to help you succeed.</p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-slate-700">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl"><FiMail /></div>
            <div>
              <p className="font-bold text-slate-900">Email Us</p>
              <p>support@careerhubpro.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
