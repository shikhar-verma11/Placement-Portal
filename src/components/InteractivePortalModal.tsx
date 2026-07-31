import React, { useState } from 'react';
import { X, Filter, Send, Search, CheckCircle2, AlertCircle, Sparkles, Terminal, Award } from 'lucide-react';
import { MOCK_SIMULATION_STUDENTS } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractivePortalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [minCpi, setMinCpi] = useState<number>(8.0);
  const [allowBacklogs, setAllowBacklogs] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [queryTime, setQueryTime] = useState<number>(0.021);
  const [isNotifying, setIsNotifying] = useState<boolean>(false);
  const [notifySuccess, setNotifySuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter students
  const filteredStudents = MOCK_SIMULATION_STUDENTS.filter((st) => {
    if (st.cpi < minCpi) return false;
    if (!allowBacklogs && st.backlogs > 0) return false;
    if (selectedBranch !== 'All' && !st.branch.includes(selectedBranch)) return false;
    return true;
  });

  const handleFilterChange = (newCpi: number) => {
    soundEngine.playClick();
    setMinCpi(newCpi);
    setQueryTime(parseFloat((0.012 + Math.random() * 0.015).toFixed(3)));
  };

  const dispatchDriveNotice = () => {
    soundEngine.playChime(680, 0.3);
    setIsNotifying(true);
    setTimeout(() => {
      setIsNotifying(false);
      setNotifySuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00FFC6', '#14F1D9'],
      });
      setTimeout(() => setNotifySuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071320]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border-[#14F1D9]/40 bg-[#0F172A] shadow-[0_0_60px_rgba(20,241,217,0.3)] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#00FFC6]/20 border border-[#00FFC6] flex items-center justify-center text-[#00FFC6]">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-[#00FFC6] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> LIVE INTERACTIVE PORTAL SIMULATOR
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-white">
              TPO Eligibility & Drive Dispatch Engine
            </h3>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#071320] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs font-mono">
          {/* CPI Threshold Slider */}
          <div>
            <label className="text-slate-400 block mb-1">Min CPI Threshold: <span className="text-[#00FFC6] font-bold">{minCpi}</span></label>
            <input
              type="range"
              min="6.0"
              max="9.5"
              step="0.1"
              value={minCpi}
              onChange={(e) => handleFilterChange(parseFloat(e.target.value))}
              className="w-full accent-[#00FFC6]"
            />
          </div>

          {/* Branch Filter */}
          <div>
            <label className="text-slate-400 block mb-1">Branch Filter:</label>
            <select
              value={selectedBranch}
              onChange={(e) => {
                soundEngine.playClick();
                setSelectedBranch(e.target.value);
              }}
              className="w-full p-2 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#00FFC6]"
            >
              <option value="All">All Departments</option>
              <option value="Computer">Computer Science</option>
              <option value="Information">Information Tech</option>
              <option value="Electronics">Electronics</option>
              <option value="AI">AI & Data Science</option>
            </select>
          </div>

          {/* Backlog Policy Switch */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <label className="text-slate-400">Allow Backlogs:</label>
            <button
              onClick={() => {
                soundEngine.playClick();
                setAllowBacklogs(!allowBacklogs);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                allowBacklogs
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-[#00FFC6]/20 text-[#00FFC6] border-[#00FFC6]/40'
              }`}
            >
              {allowBacklogs ? 'Yes (Backlogs Allowed)' : 'No (Strict 0 Backlogs)'}
            </button>
          </div>
        </div>

        {/* Live Filter Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 mb-6 text-xs font-mono">
          <span className="text-slate-300">
            Query Execution Time: <strong className="text-[#00FFC6]">{queryTime}s</strong>
          </span>
          <span className="text-slate-300">
            Eligible Candidates: <strong className="text-[#00FFC6]">{filteredStudents.length} / {MOCK_SIMULATION_STUDENTS.length}</strong>
          </span>
          <span className="text-[#00FFC6] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Policy Locked
          </span>
        </div>

        {/* Filtered Candidate Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071320] mb-6">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-[#0F172A] text-[#00FFC6] uppercase border-b border-white/10">
              <tr>
                <th className="p-3">Candidate</th>
                <th className="p-3">Roll No</th>
                <th className="p-3">Branch</th>
                <th className="p-3">CPI</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500 italic">
                    No candidates match this CPI / Backlog filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{st.name}</td>
                    <td className="p-3 text-slate-400">{st.roll}</td>
                    <td className="p-3 text-slate-300">{st.branch}</td>
                    <td className="p-3 text-[#00FFC6] font-bold">{st.cpi}</td>
                    <td className="p-3 text-emerald-400 font-bold">{st.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Action Button: Broadcast Drive Notice */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            {notifySuccess && (
              <span className="text-xs font-mono text-[#00FFC6] font-bold flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" /> Real-time alerts dispatched to {filteredStudents.length} candidates via Celery Queue!
              </span>
            )}
          </div>

          <button
            onClick={dispatchDriveNotice}
            disabled={isNotifying || filteredStudents.length === 0}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
              isNotifying
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#14F1D9] to-[#00FFC6] text-[#071320] shadow-[0_0_20px_rgba(20,241,217,0.4)] hover:scale-105 active:scale-95'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{isNotifying ? 'Dispatching via Redis Queue...' : `Broadcast Drive Notice to ${filteredStudents.length} Eligible Students`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
