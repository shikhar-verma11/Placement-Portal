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
        className="absolute rounded-full blur-3xl opacity-20 transition-all duration-300 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '350px' : '220px',
          height: isHovered ? '350px' : '220px',
          transform: 'translate(-50%, -50%)',
          background: isHovered
            ? 'radial-gradient(circle, rgba(0,255,198,0.3) 0%, rgba(20,241,217,0.1) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(20,241,217,0.2) 0%, rgba(15,23,42,0.1) 60%, transparent 70%)',
        }}
      />

      {/* Outer Ring */}
      <div
        className={`absolute rounded-full border border-[#14F1D9]/60 transition-transform duration-100 ease-out flex items-center justify-center ${
          isClicked ? 'scale-75' : isHovered ? 'scale-150 bg-[#14F1D9]/10 border-[#00FFC6]' : 'scale-100'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '36px',
          height: '36px',
          transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.5)' : 'scale(1)'}`,
          boxShadow: isHovered ? '0 0 15px rgba(20,241,217,0.5)' : '0 0 8px rgba(20,241,217,0.2)',
        }}
      >
        {hoverText && (
          <span className="text-[9px] font-bold tracking-wider uppercase text-[#00FFC6] whitespace-nowrap px-1">
            {hoverText}
          </span>
        )}
      </div>

      {/* Core Dot */}
      <div
        className="absolute rounded-full bg-[#00FFC6] transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '6px',
          height: '6px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px #00FFC6, 0 0 20px #14F1D9',
        }}
      />
    </div>
  );
};
