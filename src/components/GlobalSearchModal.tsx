import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, Building2, Briefcase, Megaphone, Terminal, FileSpreadsheet, Upload, ArrowRight, Sparkles } from 'lucide-react';
import { GLOBAL_SEARCH_ITEMS } from '../data/saasData';
import { SearchResultItem } from '../types';
import { soundEngine } from '../utils/audio';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction?: (actionPayload: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onExecuteAction,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = GLOBAL_SEARCH_ITEMS.filter((item) => {
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
    if (!query.trim()) return true;

    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, categoryFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundEngine.playHover();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundEngine.playHover();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchResultItem) => {
    soundEngine.playClick();
    if (item.actionPayload && onExecuteAction) {
      onExecuteAction(item.actionPayload);
    }
    onClose();
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="w-4 h-4 text-[#6A8DFF]" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-[#D9A441]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#4CAF50]" />;
      case 'Megaphone': return <Megaphone className="w-4 h-4 text-[#FF5252]" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-[#6A8DFF]" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-4 h-4 text-[#4CAF50]" />;
      case 'Upload': return <Upload className="w-4 h-4 text-[#D9A441]" />;
      default: return <Sparkles className="w-4 h-4 text-[#6A8DFF]" />;
    }
  };

  const categories = ['All', 'Student', 'Company', 'Drive', 'Announcement', 'Quick Action'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#151515]/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Command Palette"
    >
      <div
        className="relative w-full max-w-2xl bg-[#1F1F1F] border border-[#3A3A3A] rounded-2xl shadow-2xl overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#3A3A3A] bg-[#151515]">
          <Search className="w-5 h-5 text-[#6A8DFF] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, companies, drives, announcements, or actions..."
            className="w-full bg-transparent text-sm font-heading text-[#FAFAFA] placeholder-[#9E9E9E] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#9E9E9E] hover:text-[#FAFAFA] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#282828] border border-[#3A3A3A] text-[#9E9E9E]">
            ESC
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#3A3A3A]/60 bg-[#1F1F1F] overflow-x-auto text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setCategoryFilter(cat);
              }}
              className={`px-2.5 py-1 rounded-md transition-all shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#6A8DFF] text-white font-semibold'
                  : 'text-[#9E9E9E] hover:text-[#FAFAFA] hover:bg-[#282828]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#3A3A3A]/40">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#9E9E9E]">
              No matches found for "{query}". Try searching for student names, companies, or "Export".
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-[#282828] border border-[#3A3A3A]' : 'hover:bg-[#282828]/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#151515] border border-[#3A3A3A] flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.iconName)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-heading font-semibold text-[#FAFAFA] truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#6A8DFF]/10 text-[#6A8DFF] border border-[#6A8DFF]/20 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-[#9E9E9E] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform shrink-0 ${isSelected ? 'text-[#6A8DFF] translate-x-1' : 'text-[#3A3A3A]'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-[#151515] border-t border-[#3A3A3A] flex items-center justify-between text-[11px] font-mono text-[#9E9E9E]">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-[#282828] text-[#FAFAFA]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-[#282828] text-[#FAFAFA]">↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-[#282828] text-[#FAFAFA]">↵</kbd> Select</span>
          </div>
          <span>Fuzzy Engine v2.4</span>
        </div>
      </div>
    </div>
  );
};
