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
    <section id="architecture" className="relative py-28 px-4 sm:px-8 bg-[#151515] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-[#6A8DFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Network className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>SYSTEM ARCHITECTURE & DATA FLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Interactive System Flow Diagram
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Inspect real-time packet routes, async queue handlers, database locks, and Gemini AI endpoints.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={triggerLoadTest}
              disabled={isLoadTesting}
              onMouseEnter={() => soundEngine.playHover()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6A8DFF] hover:bg-[#7D9EFF] text-white text-xs font-medium transition-all shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
              <span>{isLoadTesting ? 'Simulating 10,000 Concurrent Drive Requests...' : 'Simulate Mass Drive Traffic'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Diagram Map & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SVG Animated Flow Diagram Map */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#1F1F1F] relative overflow-hidden">
            {/* SVG Data Packet Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 stroke-[#3A3A3A]" strokeWidth="1.5">
              <path d="M 120 180 Q 250 120 380 180" fill="none" strokeDasharray="4 4" />
              <path d="M 380 180 Q 520 120 650 180" fill="none" strokeDasharray="4 4" />
              <path d="M 380 180 L 380 320" fill="none" strokeDasharray="4 4" />
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
                    className={`p-5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#282828] border-[#6A8DFF] shadow-md z-10'
                        : 'bg-[#282828]/60 border-[#3A3A3A] hover:border-[#404040] hover:bg-[#282828]'
                    }`}
                    data-cursor-hover
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#6A8DFF]" />
                      <span className="text-[10px] font-mono text-[#9E9E9E] uppercase">{node.type}</span>
                    </div>

                    <h4 className="text-sm font-heading font-semibold text-[#FAFAFA] mb-1">{node.title}</h4>
                    <p className="text-[11px] text-[#9E9E9E] line-clamp-1 mb-4">{node.subtitle}</p>

                    <div className="pt-2 border-t border-[#404040] flex items-center justify-between text-[10px] font-mono text-[#6A8DFF]">
                      <span>Latency: {node.latency}</span>
                      <span>{node.throughput}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Live Inspector */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#1F1F1F] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#404040] mb-6">
                <span className="text-xs font-mono text-[#6A8DFF] uppercase font-semibold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#6A8DFF] animate-pulse" /> TELEMETRY
                </span>
                <span className="px-2 py-0.5 rounded bg-[#6A8DFF]/10 text-[#6A8DFF] text-[10px] font-mono font-medium border border-[#6A8DFF]/20">
                  ONLINE
                </span>
              </div>

              <h3 className="text-xl font-heading font-bold text-[#FAFAFA] mb-1">
                {activeNode.title}
              </h3>
              <p className="text-xs text-[#9E9E9E] font-mono mb-6">{activeNode.subtitle}</p>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#282828] border border-[#3A3A3A] flex justify-between">
                  <span className="text-[#9E9E9E]">Response Latency:</span>
                  <span className="text-[#6A8DFF] font-medium">{activeNode.latency}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#282828] border border-[#3A3A3A] flex justify-between">
                  <span className="text-[#9E9E9E]">Throughput Capacity:</span>
                  <span className="text-[#FAFAFA] font-medium">{activeNode.throughput}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#282828] border border-[#3A3A3A] flex justify-between">
                  <span className="text-[#9E9E9E]">Node Type:</span>
                  <span className="text-[#FAFAFA] font-medium uppercase">{activeNode.type}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#404040] flex items-center justify-between text-[11px] font-mono text-[#9E9E9E]">
              <span>Cluster: asia-south1</span>
              <span className="text-[#6A8DFF] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6A8DFF]" /> 100% Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
