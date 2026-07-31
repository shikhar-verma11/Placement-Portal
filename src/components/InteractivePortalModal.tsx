import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { MOCK_SIMULATION_STUDENTS } from '../data/mockData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractivePortalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [minCpi, setMinCpi] = useState<number>(7.5);
  const [allowBacklogs, setAllowBacklogs] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [queryTime, setQueryTime] = useState<number>(0.021);
  const [isNotifying, setIsNotifying] = useState<boolean>(false);
  const [notifySuccess, setNotifySuccess] = useState<boolean>(false);
  const [notifyProgress, setNotifyProgress] = useState<number>(0);

  if (!isOpen) return null;

  // Filter students
  const filteredStudents = MOCK_SIMULATION_STUDENTS.filter((st) => {
    if (st.cpi < minCpi) return false;
    if (!allowBacklogs && st.backlogs > 0) return false;
    if (selectedBranch !== 'All' && !st.branch.includes(selectedBranch)) return false;
    return true;
  });

  const handleFilterChange = (newCpi: number) => {
    setMinCpi(newCpi);
    setQueryTime(parseFloat((0.012 + Math.random() * 0.015).toFixed(3)));
  };

  const dispatchDriveNotice = () => {
    setIsNotifying(true);
    setNotifyProgress(0);

    // Animate progress bar
    const interval = setInterval(() => {
      setNotifyProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    setTimeout(() => {
      clearInterval(interval);
      setNotifyProgress(100);
      setIsNotifying(false);
      setNotifySuccess(true);
      setTimeout(() => setNotifySuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/20 bg-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> LIVE INTERACTIVE PORTAL SIMULATOR
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-white">
              Infosys Campus Drive — Eligibility Engine
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">CGPA Cutoff: 7.5 • Scenario from Requirements</p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs font-mono">
          {/* CPI Threshold Slider */}
          <div>
            <label className="text-slate-400 block mb-1">
              Min CPI Threshold: <span className="text-emerald-400 font-bold">{minCpi}</span>
            </label>
            <input
              type="range"
              min="6.0"
              max="9.5"
              step="0.1"
              value={minCpi}
              onChange={(e) => handleFilterChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Branch Filter */}
          <div>
            <label className="text-slate-400 block mb-1">Branch Filter:</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
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
              onClick={() => setAllowBacklogs(!allowBacklogs)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                allowBacklogs
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}
            >
              {allowBacklogs ? 'Yes (Backlogs Allowed)' : 'No (Strict 0 Backlogs)'}
            </button>
          </div>
        </div>

        {/* Live Filter Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 mb-6 text-xs font-mono">
          <span className="text-slate-300">
            Query Execution Time: <strong className="text-emerald-400">{queryTime}s</strong>
          </span>
          <span className="text-slate-300">
            Eligible Candidates: <strong className="text-emerald-400">{filteredStudents.length} / {MOCK_SIMULATION_STUDENTS.length}</strong>
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Policy Locked
          </span>
        </div>

        {/* Filtered Candidate Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 mb-6">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-slate-900 text-emerald-400 uppercase border-b border-white/10">
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
                  <tr key={i} className="hover:bg-white/5 transition-colors animate-fadeIn" style={{ animationDelay: `${i * 40}ms` }}>
                    <td className="p-3 font-bold text-white flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0 border border-emerald-500/10">
                        {st.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      {st.name}
                    </td>
                    <td className="p-3 text-slate-400">{st.roll}</td>
                    <td className="p-3 text-slate-300">{st.branch}</td>
                    <td className="p-3 text-emerald-400 font-bold">{st.cpi}</td>
                    <td className="p-3 text-emerald-400 font-bold">{st.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          {/* Progress bar during dispatch */}
          {isNotifying && (
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-100"
                style={{ width: `${notifyProgress}%` }}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div>
              {notifySuccess && (
                <span className="text-xs font-mono text-green-400 font-bold flex items-center gap-1.5 animate-fadeIn">
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
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 active:scale-95'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isNotifying ? 'Dispatching via Redis Queue...' : `Broadcast Drive Notice to ${filteredStudents.length} Eligible Students`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
