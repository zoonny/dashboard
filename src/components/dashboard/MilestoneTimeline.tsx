'use client';
// src/components/dashboard/MilestoneTimeline.tsx

import { MilestoneEvent } from '@/types';

interface MilestoneTimelineProps {
  milestones: MilestoneEvent[];
}

const typeConfig = {
  PHASE: { icon: '◆', color: 'text-blue-400', border: 'border-blue-500/40' },
  CUTOVER: { icon: '★', color: 'text-amber-400', border: 'border-amber-500/40' },
  REVIEW: { icon: '◉', color: 'text-cyan-400', border: 'border-cyan-500/40' },
  TRAINING: { icon: '▲', color: 'text-green-400', border: 'border-green-500/40' },
};

const statusBg = {
  DONE: 'opacity-60',
  ACTIVE: 'opacity-100',
  UPCOMING: 'opacity-40',
};

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="card flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#1e2d45] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-400 tracking-widest">◈</span>
          <span className="text-sm font-semibold text-slate-200">마일스톤 타임라인</span>
        </div>
        <div className="flex gap-3">
          {(['PHASE', 'CUTOVER', 'REVIEW', 'TRAINING'] as const).map((t) => (
            <div key={t} className="flex items-center gap-1">
              <span className={`text-[9px] ${typeConfig[t].color}`}>{typeConfig[t].icon}</span>
              <span className="font-mono text-[9px] text-slate-500">
                {t === 'PHASE' ? '단계' : t === 'CUTOVER' ? '오픈' : t === 'REVIEW' ? '점검' : '교육'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto px-4 py-4">
        {/* Timeline line */}
        <div className="relative min-w-max">
          <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-[#1e2d45] via-[#2a4066] to-[#1e2d45]" />

          <div className="flex gap-6 items-start relative">
            {milestones.map((m, i) => {
              const t = typeConfig[m.type];
              const isActive = m.status === 'ACTIVE';
              const isDone = m.status === 'DONE';

              return (
                <div
                  key={i}
                  className={`flex flex-col items-center ${statusBg[m.status]}`}
                  style={{ minWidth: '80px' }}
                >
                  {/* Node */}
                  <div className="relative z-10 mb-2">
                    <div
                      className={`w-8 h-8 border flex items-center justify-center ${t.border} ${
                        isActive
                          ? 'bg-amber-500/20 shadow-lg shadow-amber-500/20'
                          : isDone
                          ? 'bg-[#1e2d45]'
                          : 'bg-[#0d1421]'
                      } rounded-sm`}
                    >
                      <span className={`text-[11px] ${t.color} ${isActive ? 'animate-pulse' : ''}`}>
                        {t.icon}
                      </span>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 border border-amber-400/40 rounded-sm animate-ping opacity-50" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <div className={`text-[11px] font-medium leading-tight ${isDone ? 'text-slate-400' : isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                      {m.label}
                    </div>
                    <div className="font-mono text-[9px] text-slate-600 mt-0.5">{m.date}</div>
                    {isDone && (
                      <div className="font-mono text-[9px] text-green-500 mt-0.5">✓ 완료</div>
                    )}
                    {isActive && (
                      <div className="font-mono text-[9px] text-amber-400 mt-0.5">● 진행중</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
