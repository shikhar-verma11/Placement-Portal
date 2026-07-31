import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Award, Zap, Building2, Sparkles } from 'lucide-react';
import { STAT_METRICS } from '../data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix: string; decimals?: number }> = ({ value, prefix, suffix, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const duration = 2200;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * value).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-2 tracking-tight">
      {prefix && <span className="text-emerald-400">{prefix}</span>}
      <span>{count.toLocaleString()}</span>
      <span className="text-teal-400">{suffix}</span>
    </div>
  );
};

const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 38;
  const ref = useRef<SVGCircleElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const offset = circumference - (percentage / 100) * circumference;
          el.style.transition = 'stroke-dashoffset 2s ease-out';
          el.style.strokeDashoffset = `${offset}`;
        }
      },
      { threshold: 0.5 }
    );
    const parent = el.closest('.stat-card');
    if (parent) observer.observe(parent);
    return () => observer.disconnect();
  }, [percentage, circumference]);

  return (
    <svg className="w-20 h-20 -rotate-90 mx-auto mb-4" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <circle
        ref={ref} cx="40" cy="40" r="38" fill="none" stroke="url(#ringGrad)" strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={circumference}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const StatisticsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card', { y: 50, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const icons = [
    <TrendingUp key="1" className="w-5 h-5" />,
    <Award key="2" className="w-5 h-5" />,
    <Zap key="3" className="w-5 h-5" />,
    <Building2 key="4" className="w-5 h-5" />,
  ];

  return (
    <section id="stats" ref={containerRef} className="relative py-28 px-4 sm:px-8 bg-[#060f1e] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-emerald-500/8 via-teal-500/4 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-WORLD IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Quantifiable Academic Metrics
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Verifiable placement benchmarks achieved across 12,000+ candidate batches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_METRICS.map((stat, idx) => (
            <div key={stat.id} className="stat-card glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border-white/10 flex flex-col justify-between text-center relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-radial from-emerald-500/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              <div>
                <div className="relative">
                  <CircularProgress percentage={stat.percentage} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      {icons[idx]}
                    </div>
                  </div>
                </div>
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.suffix === '%' && stat.value % 1 !== 0 ? 1 : 0} />
                <h3 className="text-sm font-bold text-slate-200 mb-1">{stat.label}</h3>
                <p className="text-xs text-slate-400 font-mono">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
