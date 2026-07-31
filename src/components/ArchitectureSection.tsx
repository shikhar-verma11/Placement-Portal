import React, { useState } from 'react';
import { Network, Activity, Cpu, Server, Database, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { ARCH_NODES } from '../data/mockData';
import { soundEngine } from '../utils/audio';

export const ArchitectureSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-api');
  const [isLoadTesting, setIsLoadTesting] = useState<boolean>(false);

  const activeNode = ARCH_NODES.find((n) => n.id === activeNodeId) || ARCH_NODES[0];

  const triggerLoadTest = () => {
    soundEngine.playChime(600, 0.3);
    setIsLoadTesting(true);
    setTimeout(() => {
      setIsLoadTesting(false);
    }, 4000);
  };

  return (
    <section id="architecture" className="relative py-28 px-4 sm:px-8 bg-[#071320] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#14F1D9]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#14F1D9]/30 text-xs font-mono text-[#00FFC6] mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>SYSTEM ARCHITECTURE & DATA FLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Interactive System Flow Diagram
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Inspect real-time packet routes, async queue handlers, database locks, and Gemini AI endpoints.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={triggerLoadTest}
              disabled={isLoadTesting}
              onMouseEnter={() => soundEngine.playHover()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#14F1D9] to-[#00FFC6] text-[#071320] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(20,241,217,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 fill-[#071320]" />
              <span>{isLoadTesting ? 'Simulating 10,000 Concurrent Drive Requests...' : 'Simulate Mass Drive Traffic'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Diagram Map & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SVG Animated Flow Diagram Map */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border-white/10 bg-[#0F172A]/80 relative overflow-hidden">
            {/* Animated SVG Data Packet Cables */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 stroke-[#14F1D9]/30" strokeWidth="2">
              <path d="M 120 180 Q 250 120 380 180" fill="none" strokeDasharray="6 6" />
              <path d="M 380 180 Q 520 120 650 180" fill="none" strokeDasharray="6 6" />
              <path d="M 380 180 L 380 320" fill="none" strokeDasharray="6 6" />
            </svg>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {ARCH_NODES.map((node) => {
                const isSelected = node.id === activeNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveNodeId(node.id);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#071320] border-[#00FFC6] neon-glow-mint scale-105 z-10'
                        : 'bg-[#071320]/60 border-white/10 hover:border-[#14F1D9]/40 hover:bg-[#071320]'
                    }`}
                    data-cursor-hover
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00FFC6] animate-ping" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{node.type}</span>
                    </div>

                    <h4 className="text-sm font-heading font-bold text-white mb-1">{node.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-4">{node.subtitle}</p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#14F1D9]">
                      <span>Latency: {node.latency}</span>
                      <span>{node.throughput}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Live Inspector */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border-[#14F1D9]/30 bg-[#071320] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
                <span className="text-xs font-mono text-[#00FFC6] uppercase font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 animate-pulse" /> LIVE TELEMETRY
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-mono font-bold">
                  HEALTHY
                </span>
              </div>

              <h3 className="text-xl font-heading font-extrabold text-white mb-1">
                {activeNode.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-6">{activeNode.subtitle}</p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-slate-400">Response Latency:</span>
                  <span className="text-[#00FFC6] font-bold">{activeNode.latency}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-slate-400">Throughput Capacity:</span>
                  <span className="text-[#14F1D9] font-bold">{activeNode.throughput}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-slate-400">Node Type:</span>
                  <span className="text-white font-bold uppercase">{activeNode.type}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Cluster: asia-south1</span>
              <span className="text-[#00FFC6] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
