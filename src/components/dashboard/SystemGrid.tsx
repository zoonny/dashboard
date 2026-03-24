'use client';
// src/components/dashboard/SystemGrid.tsx

import { System, SystemStatus } from '@/types';
import { useState } from 'react';

interface SystemGridProps {
  systems: System[];
}

const statusConfig: Record<
  SystemStatus,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  COMPLETED: {
    label: '완료',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    dot: 'bg-green-400',
  },
  IN_PROGRESS: {
    label: '진행중',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
  },
  TESTING: {
    label: '테스트',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
  },
  BLOCKED: {
    label: '블로킹',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    dot: 'bg-red-400',
  },
  PENDING: {
    label: '대기',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    dot: 'bg-slate-400',
  },
};

const riskColor = {
  HIGH: 'text-red-400',
  MEDIUM: 'text-amber-400',
  LOW: 'text-green-400',
};

export default function SystemGrid({ systems }: SystemGridProps) {
  const [filter, setFilter] = useState<SystemStatus | 'ALL'>('ALL');

  const filtered =
    filter === 'ALL' ? systems : systems.filter((s) => s.status === filter);

  const counts: Record<string, number> = {
    ALL: systems.length,
    COMPLETED: systems.filter((s) => s.status === 'COMPLETED').length,
    IN_PROGRESS: systems.filter((s) => s.status === 'IN_PROGRESS').length,
    BLOCKED: systems.filter((s) => s.status === 'BLOCKED').length,
    PENDING: systems.filter((s) => s.status === 'PENDING').length,
  };

  return (
    <div className="card flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#1e2d45] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-blue-400 tracking-widest">◈</span>
          <span className="text-sm font-semibold text-slate-200">시스템 현황</span>
          <span className="font-mono text-[10px] text-slate-500">[ {systems.length} SYSTEMS ]</span>
        </div>
        <div className="flex gap-1">
          {(['ALL', 'COMPLETED', 'IN_PROGRESS', 'BLOCKED', 'PENDING'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded-sm border transition-all ${
                filter === s
                  ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                  : 'border-[#1e2d45] text-slate-500 hover:border-slate-500/50 hover:text-slate-400'
              }`}
            >
              {s === 'ALL'
                ? `ALL (${counts.ALL})`
                : s === 'COMPLETED'
                ? `완료 (${counts.COMPLETED})`
                : s === 'IN_PROGRESS'
                ? `진행 (${counts.IN_PROGRESS})`
                : s === 'BLOCKED'
                ? `블로킹 (${counts.BLOCKED})`
                : `대기 (${counts.PENDING})`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filtered.map((system, i) => (
          <SystemRow key={system.id} system={system} index={i} />
        ))}
      </div>
    </div>
  );
}

function SystemRow({ system, index }: { system: System; index: number }) {
  const s = statusConfig[system.status];

  const progressColor =
    system.status === 'COMPLETED'
      ? 'bg-gradient-to-r from-green-600 to-green-400'
      : system.status === 'BLOCKED'
      ? 'bg-gradient-to-r from-red-700 to-red-500'
      : system.status === 'PENDING'
      ? 'bg-slate-600'
      : 'bg-gradient-to-r from-blue-700 to-cyan-500';

  return (
    <div
      className="group relative border border-[#1e2d45] hover:border-blue-500/30 bg-[#0d1421] hover:bg-[#111e30] rounded-sm p-3 transition-all cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className={`w-10 h-10 flex items-center justify-center border ${s.border} ${s.bg} rounded-sm flex-shrink-0`}
          >
            <span className={`font-mono text-[10px] font-bold ${s.color}`}>{system.code}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-200 truncate">{system.name}</span>
              <span
                className={`flex-shrink-0 px-1.5 py-0.5 text-[9px] font-mono border rounded-sm ${s.color} ${s.bg} ${s.border}`}
              >
                {s.label}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[10px] text-slate-500">{system.id}</span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] text-slate-500">{system.owner}</span>
              <span className="text-slate-600">·</span>
              <span className={`text-[10px] font-mono ${riskColor[system.riskLevel]}`}>
                RISK:{system.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-shrink-0 text-right">
          <div className={`font-mono text-lg font-bold ${s.color} ticker`}>
            {system.progress}%
          </div>
          <div className="font-mono text-[10px] text-slate-500">
            {system.completedTasks}/{system.totalTasks}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2.5">
        <div className="h-1 bg-[#1e2d45] rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColor} rounded-full transition-all duration-500`}
            style={{ width: `${system.progress}%` }}
          />
        </div>
      </div>

      {/* Target date */}
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[10px] text-slate-600">{system.description}</span>
        <span className="font-mono text-[10px] text-slate-500">목표 {system.targetDate}</span>
      </div>

      {/* Hover left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/0 group-hover:bg-blue-500/60 transition-all rounded-l-sm" />
    </div>
  );
}
