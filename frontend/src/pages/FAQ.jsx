import { motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    { q: 'How do I apply for a job?', a: 'Simply create an Applicant account, browse the job listings, and click Apply.' },
    { q: 'Is CareerHub Pro free?', a: 'Yes! CareerHub Pro is 100% free for applicants.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-5xl font-black text-slate-900 mb-4">Frequently Asked Questions</h1>
      </motion.div>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.q}</h3>
            <p className="text-slate-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
