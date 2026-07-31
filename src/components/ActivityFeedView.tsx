import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { INITIAL_ACTIVITIES } from '../data/saasData';
import { UserCheck, Building2, ShieldCheck, Award, Sparkles, Plus, Clock } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const ActivityFeedView: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  const simulateNewEvent = () => {
    soundEngine.playChime(640, 0.2);
    const mockTargets = [
      { user: 'Deepak Kumar', action: 'submitted OA code for', target: 'Goldman Sachs' },
      { user: 'Google India', action: 'released shortlisted list for', target: 'Final Interview' },
      { user: 'Sanya Malhotra', action: 'accepted offer at', target: 'Atlassian (₹52.8 LPA)' },
      { user: 'TPO Officer', action: 'verified 28 resumes for', target: 'Texas Instruments' },
    ];
    const item = mockTargets[Math.floor(Math.random() * mockTargets.length)];

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      user: item.user,
      role: 'Live Event',
      action: item.action,
      target: item.target,
      timeAgo: 'Just now',
      iconType: 'apply',
    };

    setActivities((prev) => [newActivity, ...prev]);
  };

  const getActivityIcon = (type: ActivityItem['iconType']) => {
    switch (type) {
      case 'apply': return <UserCheck className="w-4 h-4 text-[#6A8DFF]" />;
      case 'drive': return <Building2 className="w-4 h-4 text-[#D9A441]" />;
      case 'approve': return <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />;
      case 'offer': return <Award className="w-4 h-4 text-[#00FFC6]" />;
      default: return <Sparkles className="w-4 h-4 text-[#6A8DFF]" />;
    }
  };

  return (
    <div className="space-y-4 text-xs font-body animate-fadeIn">
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151515] border border-[#3A3A3A]">
        <div>
          <span className="text-[10px] font-mono text-[#6A8DFF] uppercase font-semibold tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> REAL-TIME AUDIT STREAM
          </span>
          <h4 className="text-sm font-heading font-bold text-[#FAFAFA]">
            Live Placement Activity Feed
          </h4>
        </div>

        <button
          onClick={simulateNewEvent}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-white bg-[#6A8DFF] hover:bg-[#7D9EFF] transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Simulate Event
        </button>
      </div>

      <div className="space-y-2.5">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-xl bg-[#151515] border border-[#3A3A3A] hover:border-[#6A8DFF]/40 transition-all flex items-center justify-between gap-4 animate-slideDown"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] flex items-center justify-center shrink-0">
                {getActivityIcon(act.iconType)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-heading text-[#FAFAFA] truncate">
                  <strong className="text-[#6A8DFF] font-semibold">{act.user}</strong>{' '}
                  <span className="text-[#9E9E9E] font-normal">{act.action}</span>{' '}
                  <strong className="text-[#00FFC6] font-semibold">{act.target}</strong>
                </p>
                <span className="text-[10px] font-mono text-[#9E9E9E]">{act.role}</span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-[#9E9E9E] shrink-0">{act.timeAgo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
