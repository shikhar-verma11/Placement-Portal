import React, { useState } from 'react';
import { Sparkles, FileCheck2, Calendar, Award, CheckCircle2, XCircle, ArrowRight, Clock, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { MOCK_APPLICATIONS, MOCK_PLACEMENT_DRIVES } from '../data/saasData';
import { ApplicationRecord, PlacementDrive } from '../types';
import { soundEngine } from '../utils/audio';

export const StudentDashboardView: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord>(MOCK_APPLICATIONS[0]);
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive>(MOCK_PLACEMENT_DRIVES[0]);

  // Student Profile Data
  const studentProfile = {
    name: 'Aarav Sharma',
    roll: 'CS2025001',
    branch: 'Computer Science',
    cpi: 9.42,
    backlogs: 0,
    atsScore: 94,
    profileCompletion: 88,
    missingInfo: ['Upload Semester 6 Grade Card', 'Verify LinkedIn Profile Link'],
  };

  // Eligibility Evaluation Engine
  const evaluateEligibility = (drive: PlacementDrive) => {
    if (studentProfile.cpi < drive.minCpi) {
      return {
        eligible: false,
        reason: `Requires min ${drive.minCpi} CPI (Current: ${studentProfile.cpi})`,
      };
    }
    if (studentProfile.backlogs > drive.maxBacklogs) {
      return {
        eligible: false,
        reason: `Maximum ${drive.maxBacklogs} backlogs allowed (Current: ${studentProfile.backlogs})`,
      };
    }
    if (!drive.eligibleBranches.includes(studentProfile.branch)) {
      return {
        eligible: false,
        reason: `Branch ${studentProfile.branch} not listed in eligible branches`,
      };
    }
    return {
      eligible: true,
      reason: `All criteria matched: CPI ${studentProfile.cpi} >= ${drive.minCpi}, 0 Backlogs, Branch Eligible`,
    };
  };

  const driveEligibility = evaluateEligibility(selectedDrive);

  return (
    <div className="space-y-6 text-xs font-body text-[#D4D4D4] animate-fadeIn">
      {/* 1. Widgets Row: ATS Score, Applications, Profile Ring, Offer Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ATS Resume Score Widget */}
        <div className="p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] hover:border-[#6A8DFF]/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#9E9E9E]">ATS RESUME SCORE</span>
            <FileCheck2 className="w-4 h-4 text-[#6A8DFF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-[#FAFAFA]">{studentProfile.atsScore}</span>
            <span className="text-xs font-mono text-[#6A8DFF]">/ 100</span>
          </div>
          <p className="text-[11px] text-[#4CAF50] mt-1 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" /> Optimized for Google, Amazon ATS
          </p>
        </div>

        {/* Applications Submitted Widget */}
        <div className="p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] hover:border-[#6A8DFF]/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#9E9E9E]">APPLICATIONS SUBMITTED</span>
            <Calendar className="w-4 h-4 text-[#D9A441]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-[#FAFAFA]">{MOCK_APPLICATIONS.length}</span>
            <span className="text-xs font-mono text-[#D9A441]">Drives</span>
          </div>
          <p className="text-[11px] text-[#9E9E9E] mt-1 font-mono">2 Active • 2 Offers Released</p>
        </div>

        {/* Profile Completion Circular Ring Widget */}
        <div className="p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] hover:border-[#6A8DFF]/40 transition-all flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#9E9E9E] block mb-1">PROFILE COMPLETION</span>
            <div className="text-2xl font-heading font-bold text-[#FAFAFA]">
              {studentProfile.profileCompletion}%
            </div>
            <span className="text-[10px] font-mono text-[#6A8DFF] cursor-pointer hover:underline">
              {studentProfile.missingInfo.length} items missing
            </span>
          </div>

          {/* SVG Circular Progress Ring */}
          <div className="relative w-12 h-12 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#282828]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#6A8DFF] transition-all duration-1000 ease-out"
                strokeDasharray={`${studentProfile.profileCompletion}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* Offer Status Widget */}
        <div className="p-4 rounded-xl bg-[#151515] border border-[#00FFC6]/30 hover:border-[#00FFC6] transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#00FFC6]">OFFER RELEASED</span>
            <Award className="w-4 h-4 text-[#00FFC6]" />
          </div>
          <div className="text-xl font-heading font-bold text-[#FAFAFA]">
            ₹28.5 LPA
          </div>
          <p className="text-[11px] font-mono text-[#D4D4D4] mt-1">Amazon (SDE-1) • Locked</p>
        </div>
      </div>

      {/* 2. Main Section: Application Timeline */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#151515] border border-[#3A3A3A] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#3A3A3A]">
          <div>
            <span className="text-[10px] font-mono text-[#6A8DFF] uppercase font-semibold tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> APPLICATION STAGE TRACKER
            </span>
            <h4 className="text-base font-heading font-bold text-[#FAFAFA]">
              {selectedApp.companyName} — {selectedApp.role}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {MOCK_APPLICATIONS.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedApp(app);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  selectedApp.id === app.id
                    ? 'bg-[#6A8DFF] text-white font-semibold'
                    : 'bg-[#282828] text-[#9E9E9E] hover:text-[#FAFAFA]'
                }`}
              >
                {app.companyName}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Visual Connector Bar */}
        <div className="relative pt-4 pb-2">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {selectedApp.timeline.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#6A8DFF]/10 border-[#6A8DFF] ring-2 ring-[#6A8DFF]/30'
                      : isCompleted
                      ? 'bg-[#282828]/60 border-[#3A3A3A]'
                      : 'bg-[#151515] border-[#3A3A3A]/40 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#9E9E9E]">STAGE 0{idx + 1}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00FFC6]" />
                    ) : isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6A8DFF] animate-ping" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-[#9E9E9E]" />
                    )}
                  </div>
                  <h5 className="text-xs font-heading font-semibold text-[#FAFAFA]">{step.stage}</h5>
                  <p className="text-[10px] font-mono text-[#9E9E9E] mt-1">{step.date}</p>
                  {step.feedback && (
                    <p className="text-[10px] font-mono text-[#6A8DFF] mt-1.5 border-t border-[#3A3A3A] pt-1">
                      {step.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Section: Instant Eligibility Checker */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#151515] border border-[#3A3A3A] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#3A3A3A]">
          <div>
            <span className="text-[10px] font-mono text-[#00FFC6] uppercase font-semibold tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> INSTANT ELIGIBILITY CHECKER
            </span>
            <h4 className="text-base font-heading font-bold text-[#FAFAFA]">
              Check Qualification Rules Across Active Drives
            </h4>
          </div>

          <select
            value={selectedDrive.id}
            onChange={(e) => {
              soundEngine.playClick();
              const drive = MOCK_PLACEMENT_DRIVES.find((d) => d.id === e.target.value);
              if (drive) setSelectedDrive(drive);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#282828] border border-[#3A3A3A] text-xs font-mono text-[#FAFAFA]"
          >
            {MOCK_PLACEMENT_DRIVES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} — {d.role} ({d.packageCTC})
              </option>
            ))}
          </select>
        </div>

        {/* Eligibility Result Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] col-span-1 md:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#282828] border border-[#3A3A3A] flex items-center justify-center font-bold text-xs text-[#6A8DFF]">
                  {selectedDrive.logoText}
                </div>
                <div>
                  <h5 className="text-sm font-heading font-semibold text-[#FAFAFA]">{selectedDrive.companyName}</h5>
                  <p className="text-[10px] font-mono text-[#9E9E9E]">{selectedDrive.role}</p>
                </div>
              </div>

              {/* Dynamic Eligibility Badge */}
              <div
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 animate-fadeIn ${
                  driveEligibility.eligible
                    ? 'bg-[#00FFC6]/10 text-[#00FFC6] border border-[#00FFC6]/30'
                    : 'bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/30'
                }`}
              >
                {driveEligibility.eligible ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Eligible
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Not Eligible
                  </>
                )}
              </div>
            </div>

            <p className="text-xs font-mono text-[#D4D4D4] bg-[#151515] p-3 rounded-lg border border-[#3A3A3A]">
              <strong>Rule Verification:</strong> {driveEligibility.reason}
            </p>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-[#9E9E9E] pt-1">
              <div>Required CPI: <strong className="text-[#FAFAFA]">{selectedDrive.minCpi}</strong></div>
              <div>Max Backlogs: <strong className="text-[#FAFAFA]">{selectedDrive.maxBacklogs}</strong></div>
              <div>Package CTC: <strong className="text-[#00FFC6]">{selectedDrive.packageCTC}</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#9E9E9E] block mb-1">REGISTRATION DEADLINE</span>
              <p className="text-xs font-mono font-bold text-[#D9A441]">{selectedDrive.deadline}</p>
              <p className="text-[10px] font-mono text-[#9E9E9E] mt-2">Drive Date: {selectedDrive.driveDate}</p>
            </div>

            <button
              disabled={!driveEligibility.eligible}
              onClick={() => soundEngine.playChime(700, 0.2)}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                driveEligibility.eligible
                  ? 'bg-[#6A8DFF] hover:bg-[#7D9EFF] text-white'
                  : 'bg-[#282828] text-[#9E9E9E] cursor-not-allowed'
              }`}
            >
              <span>{driveEligibility.eligible ? '1-Tap Register Drive' : 'Ineligible for Drive'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
