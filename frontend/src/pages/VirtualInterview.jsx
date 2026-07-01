import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiVideo, FiMic, FiMicOff, FiVideoOff, FiMessageSquare, FiFileText, FiShare2, FiPhoneCall, FiCheckCircle } from 'react-icons/fi';

export default function VirtualInterview() {
  const { room } = useParams();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Recruiter (System)', text: 'Welcome to the CareerHub Pro Virtual Interview Room! Your camera and microphone are connected.', time: 'Just now' },
    { sender: 'Lead Engineering Interviewer', text: 'Hello! Please review the technical problem prompt on your screen when ready.', time: '1 min ago' }
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: 'You (Candidate)', text: chatInput, time: 'Now' }]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <h1 className="text-xl font-black tracking-wide text-white">Live Virtual Interview Session</h1>
          <span className="px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 rounded-full text-xs font-bold font-mono">
            Room: {room || 'techgiant-room-1'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Encrypted WebRTC Session Active</span>
          <Link 
            to="/" 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <FiPhoneCall className="rotate-135" /> Leave Interview
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 mt-6">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="relative flex-1 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex items-center justify-center min-h-[420px] shadow-2xl">
            {videoOn ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 relative">
                <div className="w-32 h-32 rounded-full bg-indigo-600/20 border-2 border-indigo-500/50 flex items-center justify-center mb-4 shadow-inner animate-pulse">
                  <FiVideo className="w-12 h-12 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Live Video Feed Stream Connected</h3>
                <p className="text-xs text-slate-400 mt-1">HD 1080p WebRTC Session with Lead Recruiter</p>

                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Candidate Video (Active)
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <FiVideoOff className="w-16 h-16 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-400">Your Video Feed is Disabled</h3>
              </div>
            )}

            <div className="absolute top-4 right-4 w-48 h-36 bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500 mx-auto flex items-center justify-center text-xs font-bold mb-1">HR</div>
                <span className="text-[10px] font-bold text-slate-300">Interviewer Feed</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-center items-center gap-4">
            <button 
              onClick={() => setMicOn(!micOn)} 
              className={`p-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500 text-white'
              }`}
            >
              {micOn ? <FiMic className="text-lg text-green-400" /> : <FiMicOff className="text-lg" />}
              {micOn ? 'Microphone On' : 'Muted'}
            </button>

            <button 
              onClick={() => setVideoOn(!videoOn)} 
              className={`p-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                videoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500 text-white'
              }`}
            >
              {videoOn ? <FiVideo className="text-lg text-blue-400" /> : <FiVideoOff className="text-lg" />}
              {videoOn ? 'Camera Active' : 'Video Off'}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col h-full">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pb-4 border-b border-slate-800 flex items-center gap-2">
            <FiMessageSquare className="text-indigo-400" /> Interview Discussion
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 my-4 max-h-[350px] pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-indigo-400">{m.sender}</span>
                  <span className="text-[10px] text-slate-500">{m.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 pt-4 border-t border-slate-800">
            <input 
              type="text" 
              placeholder="Type message to interviewer..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
            />
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
