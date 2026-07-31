import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, FileText, Calendar, Award, Sparkles, Building2, X } from 'lucide-react';
import { NotificationItem } from '../types';
import { soundEngine } from '../utils/audio';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification?: (notif: NotificationItem) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'application': return <FileText className="w-4 h-4 text-[#6A8DFF]" />;
      case 'interview': return <Calendar className="w-4 h-4 text-[#D9A441]" />;
      case 'offer': return <Award className="w-4 h-4 text-[#00FFC6]" />;
      case 'drive': return <Building2 className="w-4 h-4 text-[#4CAF50]" />;
      default: return <Sparkles className="w-4 h-4 text-[#6A8DFF]" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={toggleDropdown}
        onMouseEnter={() => soundEngine.playHover()}
        className="relative p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-[#9E9E9E] hover:text-[#FAFAFA] hover:border-[#404040] transition-all"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        data-cursor-hover
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6A8DFF] text-white text-[10px] font-mono font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#1F1F1F] border border-[#3A3A3A] shadow-2xl z-50 glass-panel overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 border-b border-[#3A3A3A] bg-[#151515]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#6A8DFF]" />
              <h4 className="text-xs font-heading font-semibold text-[#FAFAFA]">Notifications</h4>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#6A8DFF]/10 text-[#6A8DFF] border border-[#6A8DFF]/20 font-bold">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onMarkAllAsRead();
                }}
                className="text-[11px] font-mono text-[#6A8DFF] hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#3A3A3A]/40">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-[#9E9E9E]">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    soundEngine.playClick();
                    if (onSelectNotification) onSelectNotification(n);
                  }}
                  className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                    !n.read ? 'bg-[#282828]/80' : 'hover:bg-[#282828]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#151515] border border-[#3A3A3A] flex items-center justify-center shrink-0 mt-0.5">
                    {getNotifIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className={`text-xs font-heading font-semibold truncate ${!n.read ? 'text-[#FAFAFA]' : 'text-[#D4D4D4]'}`}>
                        {n.title}
                      </h5>
                      <span className="text-[10px] font-mono text-[#9E9E9E] shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-xs font-body text-[#9E9E9E] mt-1 leading-snug line-clamp-2">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-[#151515] border-t border-[#3A3A3A] text-center">
            <span className="text-[11px] font-mono text-[#9E9E9E]">Real-time Celery Broadcast</span>
          </div>
        </div>
      )}
    </div>
  );
};
