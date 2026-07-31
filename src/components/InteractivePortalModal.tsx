import React, { useState } from 'react';
import {
  X,
  Send,
  Search,
  CheckCircle2,
  Sparkles,
  Terminal,
  FileSpreadsheet,
  BarChart3,
  User,
  Activity,
  FileText,
  Upload,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MOCK_SIMULATION_STUDENTS } from '../data/mockData';
import { StudentDashboardView } from './StudentDashboardView';
import { AnalyticsChartsView } from './AnalyticsChartsView';
import { ActivityFeedView } from './ActivityFeedView';
import { ReportsView } from './ReportsView';
import { ExcelImportModal } from './ExcelImportModal';
import { EmptyState } from './EmptyState';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (title: string, message: string, type?: 'success' | 'info') => void;
  initialTab?: 'tpo' | 'student' | 'analytics' | 'activity' | 'reports';
}

export const InteractivePortalModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  initialTab = 'tpo',
}) => {
  const [activeTab, setActiveTab] = useState<'tpo' | 'student' | 'analytics' | 'activity' | 'reports'>(initialTab);
  const [minCpi, setMinCpi] = useState<number>(8.0);
  const [allowBacklogs, setAllowBacklogs] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [sortField, setSortField] = useState<'name' | 'cpi' | 'branch'>('cpi');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const [queryTime, setQueryTime] = useState<number>(0.021);
  const [isNotifying, setIsNotifying] = useState<boolean>(false);
  const [notifySuccess, setNotifySuccess] = useState<boolean>(false);
  const [isExcelImportOpen, setIsExcelImportOpen] = useState(false);

  if (!isOpen) return null;

  // Candidate filtering & sorting logic
  let filteredStudents = MOCK_SIMULATION_STUDENTS.filter((st) => {
    if (st.cpi < minCpi) return false;
    if (!allowBacklogs && st.backlogs > 0) return false;
    if (selectedBranch !== 'All' && !st.branch.includes(selectedBranch)) return false;
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      return (
        st.name.toLowerCase().includes(q) ||
        st.roll.toLowerCase().includes(q) ||
        st.branch.toLowerCase().includes(q)
      );
    }
    return true;
  });

  filteredStudents.sort((a, b) => {
    let factor = sortOrder === 'asc' ? 1 : -1;
    if (sortField === 'cpi') return (a.cpi - b.cpi) * factor;
    if (sortField === 'name') return a.name.localeCompare(b.name) * factor;
    if (sortField === 'branch') return a.branch.localeCompare(b.branch) * factor;
    return 0;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: 'name' | 'cpi' | 'branch') => {
    soundEngine.playClick();
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleFilterChange = (newCpi: number) => {
    soundEngine.playClick();
    setMinCpi(newCpi);
    setQueryTime(parseFloat((0.012 + Math.random() * 0.015).toFixed(3)));
    setCurrentPage(1);
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
      if (onShowToast) {
        onShowToast('Drive Dispatched', `Broadcast sent to ${filteredStudents.length} candidates via Celery Redis queue.`, 'success');
      }
      setTimeout(() => setNotifySuccess(false), 4000);
    }, 1500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#151515]/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-5xl glass-panel rounded-2xl p-5 sm:p-8 border-[#3A3A3A] bg-[#1F1F1F] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-lg bg-[#282828] hover:bg-[#323232] text-[#9E9E9E] hover:text-[#FAFAFA] transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3A3A3A] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center text-[#6A8DFF] shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#6A8DFF] uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> PLACEMENT SAAS COMMAND CENTER
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#FAFAFA]">
                  {activeTab === 'tpo' && 'TPO Eligibility & Drive Dispatch Engine'}
                  {activeTab === 'student' && 'Student Placement Dashboard & Timeline'}
                  {activeTab === 'analytics' && 'Interactive Placement Analytics & Charts'}
                  {activeTab === 'activity' && 'Real-Time Activity Audit Stream'}
                  {activeTab === 'reports' && 'NAAC / NIRF Executive Placement Reports'}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                setIsExcelImportOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-[#00FFC6] bg-[#00FFC6]/10 border border-[#00FFC6]/20 hover:bg-[#00FFC6]/20 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Excel</span>
            </button>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1 pt-3 pb-3 border-b border-[#3A3A3A] overflow-x-auto text-xs font-mono shrink-0">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('tpo');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'tpo' ? 'bg-[#6A8DFF] text-white font-semibold' : 'text-[#9E9E9E] hover:text-[#FAFAFA] hover:bg-[#282828]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> TPO Dispatch
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('student');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'student' ? 'bg-[#6A8DFF] text-white font-semibold' : 'text-[#9E9E9E] hover:text-[#FAFAFA] hover:bg-[#282828]'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Student View
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('analytics');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'analytics' ? 'bg-[#6A8DFF] text-white font-semibold' : 'text-[#9E9E9E] hover:text-[#FAFAFA] hover:bg-[#282828]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('activity');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'activity' ? 'bg-[#6A8DFF] text-white font-semibold' : 'text-[#9E9E9E] hover:text-[#FAFAFA] hover:bg-[#282828]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Live Stream
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('reports');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'reports' ? 'bg-[#6A8DFF] text-white font-semibold' : 'text-[#9E9E9E] hover:text-[#FAFAFA] hover:bg-[#282828]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Audit Reports
            </button>
          </div>

          {/* Modal Tab Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-6">
            {/* Tab 1: TPO Dispatch Engine */}
            {activeTab === 'tpo' && (
              <div className="space-y-5 animate-fadeIn">
                {/* Filter Controls Bar */}
                <div className="p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  {/* CPI Slider */}
                  <div>
                    <label className="text-[#9E9E9E] block mb-1">
                      Min CPI Threshold: <span className="text-[#6A8DFF] font-bold">{minCpi}</span>
                    </label>
                    <input
                      type="range"
                      min="6.0"
                      max="9.5"
                      step="0.1"
                      value={minCpi}
                      onChange={(e) => handleFilterChange(parseFloat(e.target.value))}
                      className="w-full accent-[#6A8DFF]"
                    />
                  </div>

                  {/* Branch Select */}
                  <div>
                    <label className="text-[#9E9E9E] block mb-1">Branch Filter:</label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => {
                        soundEngine.playClick();
                        setSelectedBranch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full p-2 rounded-lg bg-[#282828] border border-[#3A3A3A] text-[#FAFAFA] focus:outline-none"
                    >
                      <option value="All">All Departments</option>
                      <option value="Computer">Computer Science</option>
                      <option value="Information">Information Tech</option>
                      <option value="Electronics">Electronics</option>
                      <option value="AI">AI & Data Science</option>
                    </select>
                  </div>

                  {/* Backlog Switch */}
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <label className="text-[#9E9E9E]">Allow Backlogs:</label>
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setAllowBacklogs(!allowBacklogs);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        allowBacklogs
                          ? 'bg-[#D9A441]/10 text-[#D9A441] border-[#D9A441]/20'
                          : 'bg-[#6A8DFF]/10 text-[#6A8DFF] border-[#6A8DFF]/20'
                      }`}
                    >
                      {allowBacklogs ? 'Yes (Backlogs Allowed)' : 'No (0 Backlogs)'}
                    </button>
                  </div>
                </div>

                {/* Table Search & Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#282828] border border-[#3A3A3A] text-xs font-mono">
                  <div className="flex items-center gap-2 max-w-xs w-full">
                    <Search className="w-3.5 h-3.5 text-[#6A8DFF]" />
                    <input
                      type="text"
                      placeholder="Search student name or roll..."
                      value={tableSearch}
                      onChange={(e) => {
                        setTableSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-transparent text-xs text-[#FAFAFA] placeholder-[#9E9E9E] focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-[#D4D4D4]">
                    <span>Execution: <strong className="text-[#6A8DFF]">{queryTime}s</strong></span>
                    <span>Matched: <strong className="text-[#6A8DFF]">{filteredStudents.length} candidates</strong></span>
                  </div>
                </div>

                {/* Candidates Table with Sticky Header & Sorting */}
                <div className="overflow-x-auto rounded-xl border border-[#3A3A3A] bg-[#151515]">
                  <table className="w-full text-left text-xs font-mono text-[#D4D4D4]">
                    <thead className="bg-[#282828] text-[#FAFAFA] uppercase border-b border-[#3A3A3A] sticky top-0 z-10">
                      <tr>
                        <th onClick={() => handleSort('name')} className="p-3 cursor-pointer hover:text-[#6A8DFF]">
                          <div className="flex items-center gap-1">Candidate <ArrowUpDown className="w-3 h-3" /></div>
                        </th>
                        <th className="p-3">Roll No</th>
                        <th onClick={() => handleSort('branch')} className="p-3 cursor-pointer hover:text-[#6A8DFF]">
                          <div className="flex items-center gap-1">Branch <ArrowUpDown className="w-3 h-3" /></div>
                        </th>
                        <th onClick={() => handleSort('cpi')} className="p-3 cursor-pointer hover:text-[#6A8DFF]">
                          <div className="flex items-center gap-1">CPI <ArrowUpDown className="w-3 h-3" /></div>
                        </th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3A3A3A]">
                      {paginatedStudents.length === 0 ? (
                        <tr>
                          <td colSpan={5}>
                            <EmptyState
                              title="No Eligible Candidates Found"
                              description="No students match the current CPI threshold or department filter."
                              actionLabel="Reset Filters"
                              onAction={() => {
                                setMinCpi(6.0);
                                setAllowBacklogs(true);
                                setSelectedBranch('All');
                                setTableSearch('');
                              }}
                            />
                          </td>
                        </tr>
                      ) : (
                        paginatedStudents.map((st, i) => (
                          <tr key={i} className="hover:bg-[#1F1F1F] transition-colors">
                            <td className="p-3 font-semibold text-[#FAFAFA]">{st.name}</td>
                            <td className="p-3 text-[#9E9E9E]">{st.roll}</td>
                            <td className="p-3 text-[#D4D4D4]">{st.branch}</td>
                            <td className="p-3 text-[#6A8DFF] font-semibold">{st.cpi}</td>
                            <td className="p-3 text-[#4CAF50] font-semibold">{st.status}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-2 text-xs font-mono text-[#9E9E9E]">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => {
                          soundEngine.playClick();
                          setCurrentPage((p) => Math.max(1, p - 1));
                        }}
                        className="p-1.5 rounded-lg bg-[#282828] text-[#FAFAFA] disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          soundEngine.playClick();
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                        }}
                        className="p-1.5 rounded-lg bg-[#282828] text-[#FAFAFA] disabled:opacity-40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#404040]">
                  <div>
                    {notifySuccess && (
                      <span className="text-xs font-mono text-[#6A8DFF] font-semibold flex items-center gap-1.5 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4" /> Drive notice dispatched via Celery Worker!
                      </span>
                    )}
                  </div>

                  <button
                    onClick={dispatchDriveNotice}
                    disabled={isNotifying || filteredStudents.length === 0}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isNotifying
                        ? 'bg-[#282828] text-[#9E9E9E] cursor-not-allowed'
                        : 'bg-[#6A8DFF] hover:bg-[#7D9EFF] text-white shadow-sm'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isNotifying ? 'Dispatching via Queue...' : `Broadcast Drive Notice (${filteredStudents.length} Eligible)`}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Student View */}
            {activeTab === 'student' && <StudentDashboardView />}

            {/* Tab 3: Analytics */}
            {activeTab === 'analytics' && <AnalyticsChartsView />}

            {/* Tab 4: Live Activity */}
            {activeTab === 'activity' && <ActivityFeedView />}

            {/* Tab 5: Audit Reports */}
            {activeTab === 'reports' && <ReportsView onShowToast={onShowToast} />}
          </div>
        </div>
      </div>

      {/* Excel Import Modal */}
      <ExcelImportModal
        isOpen={isExcelImportOpen}
        onClose={() => setIsExcelImportOpen(false)}
        onImportSuccess={(count) => {
          if (onShowToast) onShowToast('Excel Import Complete', `Imported ${count} candidate records into database.`, 'success');
        }}
      />
    </>
  );
};
