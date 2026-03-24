'use client';
// src/components/dashboard/Header.tsx

import { useEffect, useState } from 'react';
import { OverallStats } from '@/types';

interface HeaderProps {
  stats: OverallStats;
}

export default function Header({ stats }: HeaderProps) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ko-KR', { hour12: false }));
      setDate(
        now.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative border-b border-[#1e2d45] bg-[#0a0f1a]">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left: Title */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-8 h-8 border border-blue-500/50 flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">
              ERP System Migration Control Center
            </div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              시스템 업무전환 상황판
            </h1>
          </div>
        </div>

        {/* Center: Key metrics */}
        <div className="hidden lg:flex items-center gap-1">
          <MetricPill
            label="전체 진행률"
            value={`${stats.overallProgress}%`}
            color="blue"
          />
          <div className="w-px h-8 bg-[#1e2d45] mx-2" />
          <MetricPill label="완료 시스템" value={`${stats.completedSystems}/${stats.totalSystems}`} color="green" />
          <MetricPill label="진행 중" value={`${stats.inProgressSystems}`} color="cyan" />
          <MetricPill label="블로킹" value={`${stats.blockedSystems}`} color="red" />
          <div className="w-px h-8 bg-[#1e2d45] mx-2" />
          <MetricPill label="중요 이슈" value={`${stats.criticalIssues}`} color="amber" />
          <MetricPill label="D-Day" value={`D-${stats.daysRemaining}`} color="orange" />
        </div>

        {/* Right: Clock */}
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-blue-400 tracking-widest ticker">
            {time}
          </div>
          <div className="font-mono text-[11px] text-slate-500">{date}</div>
        </div>
      </div>

      {/* Bottom: Progress bar */}
      <div className="px-6 pb-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500 w-20">OVERALL</span>
          <div className="flex-1 h-1.5 bg-[#1e2d45] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full relative"
              style={{ width: `${stats.overallProgress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-cyan-400/50" />
            </div>
          </div>
          <span className="font-mono text-[10px] text-cyan-400 w-10 text-right">
            {stats.overallProgress}%
          </span>
        </div>
      </div>
    </header>
  );
}

function MetricPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: 'blue' | 'green' | 'cyan' | 'red' | 'amber' | 'orange';
}) {
  const colorMap = {
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    green: 'text-green-400 border-green-500/30 bg-green-500/5',
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    red: 'text-red-400 border-red-500/30 bg-red-500/5',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
    orange: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
  };

  return (
    <div className={`px-3 py-1.5 border rounded-sm ${colorMap[color]}`}>
      <div className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</div>
      <div className={`font-mono text-sm font-bold ${colorMap[color].split(' ')[0]}`}>{value}</div>
    </div>
  );
}
