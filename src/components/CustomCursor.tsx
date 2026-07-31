import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, [data-cursor-hover]');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor-text');
        setHoverText(customText);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Background Spotlight / Light Glow Following Cursor */}
      <div
        className="absolute rounded-full blur-3xl opacity-10 transition-all duration-300 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '240px' : '160px',
          height: isHovered ? '240px' : '160px',
          transform: 'translate(-50%, -50%)',
          background: isHovered
            ? 'radial-gradient(circle, rgba(106,141,255,0.2) 0%, rgba(255,255,255,0.03) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(106,141,255,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Outer Ring */}
      <div
        className={`absolute rounded-full border border-white/20 transition-transform duration-150 ease-out flex items-center justify-center ${
          isClicked ? 'scale-75' : isHovered ? 'scale-125 bg-[#6A8DFF]/10 border-[#6A8DFF]/40' : 'scale-100'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '32px',
          height: '32px',
          transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.25)' : 'scale(1)'}`,
        }}
      >
        {hoverText && (
          <span className="text-[9px] font-medium tracking-wider text-[#6A8DFF] whitespace-nowrap px-1">
            {hoverText}
          </span>
        )}
      </div>

      {/* Core Dot */}
      <div
        className="absolute rounded-full bg-[#6A8DFF] transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '4px',
          height: '4px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
