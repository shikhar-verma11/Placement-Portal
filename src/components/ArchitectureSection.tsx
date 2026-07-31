import React, { useState } from 'react';
import { Network, Activity, ShieldCheck, Zap } from 'lucide-react';
import { ARCH_NODES } from '../data/mockData';

export const ArchitectureSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-api');
  const [isLoadTesting, setIsLoadTesting] = useState<boolean>(false);

  const activeNode = ARCH_NODES.find((n) => n.id === activeNodeId) || ARCH_NODES[0];

  const triggerLoadTest = () => {
    setIsLoadTesting(true);
    setTimeout(() => setIsLoadTesting(false), 4000);
  };

  return (
    <section id="architecture" className="relative py-28 px-4 sm:px-8 bg-[#060f1e] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-emerald-500/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>SYSTEM ARCHITECTURE & DATA FLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Interactive System Flow Diagram
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Inspect real-time data routes, async queue handlers, database operations, and AI endpoints.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={triggerLoadTest}
              disabled={isLoadTesting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <Zap className="w-4 h-4" />
              <span>{isLoadTesting ? 'Simulating 10,000 Concurrent Requests...' : 'Simulate Mass Drive Traffic'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Node Grid */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border-white/10 relative overflow-hidden">
            {/* Animated SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 800 400">
              <path id="path1" d="M 120 180 Q 250 100 380 180" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="2" strokeDasharray="6 6" />
              <path id="path2" d="M 380 180 Q 520 100 650 180" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="2" strokeDasharray="6 6" />
              <path id="path3" d="M 380 180 L 380 320" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="2" strokeDasharray="6 6" />

              {isLoadTesting && (
                <>
                  {[0, 0.33, 0.66].map((delay, i) => (
                    <circle key={`p1-${i}`} r="3" fill="#10b981" opacity="0">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay}s`}>
                        <mpath xlinkHref="#path1" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
                    </circle>
                  ))}
                  {[0.15, 0.5, 0.85].map((delay, i) => (
                    <circle key={`p2-${i}`} r="3" fill="#06b6d4" opacity="0">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay}s`}>
                        <mpath xlinkHref="#path2" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
                    </circle>
                  ))}
                  {[0.2, 0.7].map((delay, i) => (
                    <circle key={`p3-${i}`} r="3" fill="#10b981" opacity="0">
                      <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${delay}s`}>
                        <mpath xlinkHref="#path3" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" begin={`${delay}s`} />
                    </circle>
                  ))}
                </>
              )}
            </svg>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {ARCH_NODES.map((node) => {
                const isSelected = node.id === activeNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#060f1e] border-emerald-500 scale-105 z-10 shadow-lg'
                        : 'bg-[#060f1e]/60 border-white/10 hover:border-emerald-500/40 hover:bg-[#060f1e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${isLoadTesting ? 'bg-green-400 animate-ping' : 'bg-green-400'}`} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{node.type}</span>
                    </div>
                    <h4 className="text-sm font-heading font-bold text-white mb-1">{node.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-4">{node.subtitle}</p>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                      <span>Latency: {node.latency}</span>
                      <span>{node.throughput}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Inspector */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/20 bg-[#060f1e] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> LIVE TELEMETRY
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-mono font-bold">
                  HEALTHY
                </span>
              </div>

              <h3 className="text-xl font-heading font-extrabold text-white mb-1">{activeNode.title}</h3>
              <p className="text-xs text-slate-400 font-mono mb-6">{activeNode.subtitle}</p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-slate-400">Latency:</span>
                  <span className="text-emerald-400 font-bold">{activeNode.latency}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-slate-400">Throughput:</span>
                  <span className="text-teal-400 font-bold">{activeNode.throughput}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-white font-bold uppercase">{activeNode.type}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Cluster: asia-south1</span>
              <span className="text-green-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
