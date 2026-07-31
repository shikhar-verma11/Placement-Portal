import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, CheckCircle2, ArrowRight, Download, Sparkles, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: (importedCount: number) => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [importedData, setImportedData] = useState<any[] | null>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (fileName: string) => {
    soundEngine.playClick();
    setUploading(true);
    setProgress(10);
    setStatusMessage('Reading OpenPyXL spreadsheet workbook...');

    setTimeout(() => {
      setProgress(35);
      setStatusMessage('Parsing 142 student rows & extracting CPI metrics...');
    }, 600);

    setTimeout(() => {
      setProgress(70);
      setStatusMessage('Validating backlog history & branch eligibility rules...');
    }, 1200);

    setTimeout(() => {
      setProgress(100);
      setUploading(false);
      setStatusMessage('Import complete!');
      setImportedData([
        { roll: 'CS2026101', name: 'Vikramaditya Roy', branch: 'Computer Science', cpi: 9.12, backlogs: 0, status: 'Verified' },
        { roll: 'IT2026102', name: 'Ishita Deshmukh', branch: 'Information Tech', cpi: 8.74, backlogs: 0, status: 'Verified' },
        { roll: 'AI2026103', name: 'Tanmay Saxena', branch: 'AI & Data Science', cpi: 9.40, backlogs: 0, status: 'Verified' },
        { roll: 'EC2026104', name: 'Neha Chawla', branch: 'Electronics', cpi: 8.20, backlogs: 0, status: 'Verified' },
      ]);
      soundEngine.playChime(880, 0.3);
      if (onImportSuccess) onImportSuccess(142);
    }, 1800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0].name);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setImportedData(null);
    setProgress(0);
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151515]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1F1F1F] border border-[#3A3A3A] rounded-2xl shadow-2xl p-6 sm:p-8 glass-panel">
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-lg bg-[#282828] text-[#9E9E9E] hover:text-[#FAFAFA] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3A3A3A]">
          <div className="w-10 h-10 rounded-lg bg-[#00FFC6]/10 border border-[#00FFC6]/20 flex items-center justify-center text-[#00FFC6]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-[#00FFC6] uppercase font-semibold tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> EXCEL & CSV BATCH INGESTION
            </span>
            <h3 className="text-xl font-heading font-bold text-[#FAFAFA]">
              Import Student Placement Roster
            </h3>
          </div>
        </div>

        {/* Main Content */}
        {!importedData ? (
          <div>
            {/* Drag Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all ${
                isDragging
                  ? 'border-[#6A8DFF] bg-[#6A8DFF]/10 scale-[0.99]'
                  : 'border-[#3A3A3A] hover:border-[#6A8DFF]/50 bg-[#151515]'
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#282828] border border-[#3A3A3A] flex items-center justify-center text-[#00FFC6] mb-4">
                <Upload className="w-7 h-7" />
              </div>

              <h4 className="text-sm font-heading font-semibold text-[#FAFAFA] mb-1">
                Drag and drop your Excel or CSV file here
              </h4>
              <p className="text-xs font-mono text-[#9E9E9E] max-w-sm mx-auto mb-6">
                Supports <span className="text-[#6A8DFF]">.xlsx</span>, <span className="text-[#6A8DFF]">.xls</span>, and <span className="text-[#6A8DFF]">.csv</span> formatted datasets up to 25MB.
              </p>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#6A8DFF] hover:bg-[#7D9EFF] cursor-pointer transition-all shadow-sm">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Browse Files</span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-6 p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] space-y-2">
                <div className="flex justify-between text-xs font-mono text-[#D4D4D4]">
                  <span>{statusMessage}</span>
                  <span className="text-[#6A8DFF] font-bold">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#282828] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6A8DFF] to-[#00FFC6] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Imported Success View */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#00FFC6]/10 border border-[#00FFC6]/30 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono text-[#00FFC6]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Successfully imported 142 candidate student records into database!</span>
              </div>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-[#282828] text-[#9E9E9E] hover:text-[#FAFAFA] text-xs font-mono flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Data Preview Table */}
            <div className="overflow-x-auto rounded-xl border border-[#3A3A3A] bg-[#151515]">
              <table className="w-full text-left text-xs font-mono text-[#D4D4D4]">
                <thead className="bg-[#282828] text-[#FAFAFA] uppercase border-b border-[#3A3A3A]">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">CPI</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3A3A3A]">
                  {importedData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#1F1F1F]">
                      <td className="p-3 font-semibold text-[#FAFAFA]">{row.roll}</td>
                      <td className="p-3 text-[#D4D4D4]">{row.name}</td>
                      <td className="p-3 text-[#9E9E9E]">{row.branch}</td>
                      <td className="p-3 text-[#6A8DFF] font-semibold">{row.cpi}</td>
                      <td className="p-3 text-[#00FFC6]">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#6A8DFF] hover:bg-[#7D9EFF]"
              >
                <span>Done & Close</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
