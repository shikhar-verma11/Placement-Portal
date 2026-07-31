import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DEPARTMENT_PLACEMENT_DATA, SALARY_DISTRIBUTION_DATA, MONTHLY_PLACEMENT_TREND } from '../data/saasData';
import { BarChart3, TrendingUp, PieChart as PieIcon, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-[#151515]/95 backdrop-blur-md border border-[#3A3A3A] shadow-2xl text-xs font-mono text-[#FAFAFA]">
        <p className="font-bold text-[#6A8DFF] mb-1">{label}</p>
        {payload.map((item: any, idx: number) => (
          <p key={idx} className="flex items-center gap-2 text-[#D4D4D4]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
            <span>{item.name}:</span>
            <strong className="text-[#FAFAFA]">{item.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsChartsView: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'department' | 'salary' | 'monthly'>('department');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Metric Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#151515] border border-[#3A3A3A]">
        <span className="text-xs font-mono text-[#6A8DFF] font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE PLACEMENT ANALYTICS
        </span>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveMetric('department');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'department' ? 'bg-[#6A8DFF] text-white font-semibold' : 'bg-[#282828] text-[#9E9E9E] hover:text-[#FAFAFA]'
            }`}
          >
            Dept Breakdown
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveMetric('salary');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'salary' ? 'bg-[#6A8DFF] text-white font-semibold' : 'bg-[#282828] text-[#9E9E9E] hover:text-[#FAFAFA]'
            }`}
          >
            Salary Distribution
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveMetric('monthly');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'monthly' ? 'bg-[#6A8DFF] text-white font-semibold' : 'bg-[#282828] text-[#9E9E9E] hover:text-[#FAFAFA]'
            }`}
          >
            Monthly Trend
          </button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Department-wise Placements */}
        <div className="p-5 rounded-2xl bg-[#151515] border border-[#3A3A3A] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#3A3A3A]">
            <h4 className="text-sm font-heading font-bold text-[#FAFAFA] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#6A8DFF]" /> Department-wise Placements
            </h4>
            <span className="text-[10px] font-mono text-[#9E9E9E]">2026 Batch</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTMENT_PLACEMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
                <XAxis dataKey="name" stroke="#9E9E9E" tick={{ fill: '#9E9E9E', fontSize: 10 }} />
                <YAxis stroke="#9E9E9E" tick={{ fill: '#9E9E9E', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="placed" name="Placed Students" fill="#6A8DFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Total Batch Size" fill="#3A3A3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Placement Velocity */}
        <div className="p-5 rounded-2xl bg-[#151515] border border-[#3A3A3A] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#3A3A3A]">
            <h4 className="text-sm font-heading font-bold text-[#FAFAFA] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00FFC6]" /> Monthly Placement Velocity
            </h4>
            <span className="text-[10px] font-mono text-[#00FFC6]">Cumulative Placements</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_PLACEMENT_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFC6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00FFC6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
                <XAxis dataKey="month" stroke="#9E9E9E" tick={{ fill: '#9E9E9E', fontSize: 10 }} />
                <YAxis stroke="#9E9E9E" tick={{ fill: '#9E9E9E', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="placements" name="Placements Count" stroke="#00FFC6" fillOpacity={1} fill="url(#colorPlacements)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3: Salary Tier Breakdown */}
      <div className="p-5 rounded-2xl bg-[#151515] border border-[#3A3A3A] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#3A3A3A]">
          <h4 className="text-sm font-heading font-bold text-[#FAFAFA] flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-[#D9A441]" /> CTC Salary Tier Distribution (LPA)
          </h4>
          <span className="text-[10px] font-mono text-[#9E9E9E]">Highest: ₹52.8 LPA • Avg: ₹14.2 LPA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SALARY_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="range"
                >
                  {SALARY_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {SALARY_DISTRIBUTION_DATA.map((tier, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: tier.fill }} />
                  <span className="text-[#FAFAFA]">{tier.range}</span>
                </div>
                <strong className="text-[#6A8DFF]">{tier.count} Students</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
