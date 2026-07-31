import React from 'react';
import { FileSpreadsheet, Download, Printer, Award, Building2, Users, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { exportToCSV, printFormattedReport } from '../utils/exportUtils';
import { MOCK_SIMULATION_STUDENTS } from '../data/mockData';
import { soundEngine } from '../utils/audio';

interface ReportsViewProps {
  onShowToast?: (title: string, message: string, type?: 'success' | 'info') => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onShowToast }) => {
  const reportStats = [
    { label: 'Total Registered Students', value: '1,240', sub: '2026 Graduating Batch', icon: <Users className="w-4 h-4 text-[#6A8DFF]" /> },
    { label: 'Placed Students', value: '1,220', sub: '98.4% Placement Rate', icon: <CheckCircle2 className="w-4 h-4 text-[#00FFC6]" /> },
    { label: 'Highest Package', value: '₹52.8 LPA', sub: 'Atlassian International', icon: <Award className="w-4 h-4 text-[#D9A441]" /> },
    { label: 'Average Package', value: '₹14.2 LPA', sub: '+24.5% YoY Growth', icon: <TrendingUp className="w-4 h-4 text-[#6A8DFF]" /> },
    { label: 'Partner Recruiting Companies', value: '450+', sub: 'Fortune 500 & Unicorns', icon: <Building2 className="w-4 h-4 text-[#00FFC6]" /> },
    { label: 'NIRF Audit Score', value: '100/100', sub: 'NAAC A++ Compliant', icon: <Sparkles className="w-4 h-4 text-[#D9A441]" /> },
  ];

  const handleExportCSV = () => {
    soundEngine.playClick();
    const rows = MOCK_SIMULATION_STUDENTS.map((st) => ({
      'Student Name': st.name,
      'Roll Number': st.roll,
      'Department': st.branch,
      'CPI': st.cpi,
      'Backlogs': st.backlogs,
      'Status': st.status,
    }));
    exportToCSV('NAAC_NIRF_Placement_Report_2026', rows);
    if (onShowToast) onShowToast('CSV Report Downloaded', 'Exported student placement data spreadsheet successfully.', 'success');
  };

  const handlePrint = () => {
    soundEngine.playClick();
    printFormattedReport('report-print-area');
  };

  return (
    <div className="space-y-6 text-xs font-body animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#151515] border border-[#3A3A3A]">
        <div>
          <span className="text-[10px] font-mono text-[#00FFC6] uppercase font-semibold tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> NAAC / NIRF AUDIT COMPLIANCE
          </span>
          <h4 className="text-base font-heading font-bold text-[#FAFAFA]">
            Executive Placement Audit Report Generator
          </h4>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white bg-[#6A8DFF] hover:bg-[#7D9EFF] transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Excel / CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[#FAFAFA] bg-[#282828] hover:bg-[#323232] border border-[#3A3A3A] transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportStats.map((st, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] space-y-1.5 hover:border-[#6A8DFF]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9E9E9E]">{st.label}</span>
              {st.icon}
            </div>
            <div className="text-2xl font-heading font-bold text-[#FAFAFA]">{st.value}</div>
            <p className="text-[10px] font-mono text-[#6A8DFF]">{st.sub}</p>
          </div>
        ))}
      </div>

      {/* Printable Report Table Container */}
      <div id="report-print-area" className="p-5 rounded-2xl bg-[#151515] border border-[#3A3A3A] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#3A3A3A]">
          <h5 className="text-sm font-heading font-bold text-[#FAFAFA]">
            2026 Graduating Batch Student Placement Roster
          </h5>
          <span className="text-[10px] font-mono text-[#9E9E9E]">Generated from PostgreSQL Core DB</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#3A3A3A] bg-[#1F1F1F]">
          <table className="w-full text-left text-xs font-mono text-[#D4D4D4]">
            <thead className="bg-[#282828] text-[#FAFAFA] uppercase border-b border-[#3A3A3A]">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Roll No</th>
                <th className="p-3">Department</th>
                <th className="p-3">CPI</th>
                <th className="p-3">Backlogs</th>
                <th className="p-3">Status / Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3A3A]">
              {MOCK_SIMULATION_STUDENTS.map((st, i) => (
                <tr key={i} className="hover:bg-[#151515] transition-colors">
                  <td className="p-3 font-semibold text-[#FAFAFA]">{st.name}</td>
                  <td className="p-3 text-[#9E9E9E]">{st.roll}</td>
                  <td className="p-3 text-[#D4D4D4]">{st.branch}</td>
                  <td className="p-3 text-[#6A8DFF] font-semibold">{st.cpi}</td>
                  <td className="p-3 text-[#9E9E9E]">{st.backlogs}</td>
                  <td className="p-3 text-[#00FFC6] font-semibold">{st.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
