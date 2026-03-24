'use client';
// src/components/dashboard/IssueLog.tsx

import { Issue, Priority, IssueStatus } from '@/types';
import { useState } from 'react';

interface IssueLogProps {
  issues: Issue[];
}

const priorityConfig: Record<Priority, { label: string; color: string; bg: string; border: string }> = {
  CRITICAL: {
    label: 'CRITICAL',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/40',
  },
  HIGH: {
    label: 'HIGH',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
  },
  MEDIUM: {
    label: 'MEDIUM',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  LOW: {
    label: 'LOW',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
  },
};

const statusConfig: Record<IssueStatus, { label: string; color: string }> = {
  OPEN: { label: '미처리', color: 'text-red-400' },
  IN_PROGRESS: { label: '처리중', color: 'text-blue-400' },
  RESOLVED: { label: '해결됨', color: 'text-green-400' },
};

export default function IssueLog({ issues }: IssueLogProps) {
  const [filter, setFilter] = useState<IssueStatus | 'ALL'>('ALL');

  const filtered =
    filter === 'ALL' ? issues : issues.filter((i) => i.status === filter);

  const openCount = issues.filter((i) => i.status === 'OPEN').length;
  const inProgressCount = issues.filter((i) => i.status === 'IN_PROGRESS').length;
  const resolvedCount = issues.filter((i) => i.status === 'RESOLVED').length;

  return (
    <div className="card flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#1e2d45]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-red-400 tracking-widest">◈</span>
            <span className="text-sm font-semibold text-slate-200">이슈 현황</span>
            <span className="font-mono text-[10px] text-red-400">
              [ {openCount} OPEN ]
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {([
            ['ALL', `전체 (${issues.length})`],
            ['OPEN', `미처리 (${openCount})`],
            ['IN_PROGRESS', `처리중 (${inProgressCount})`],
            ['RESOLVED', `해결 (${resolvedCount})`],
          ] as const).map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded-sm border transition-all ${
                filter === val
                  ? 'border-red-500/50 bg-red-500/20 text-red-300'
                  : 'border-[#1e2d45] text-slate-500 hover:border-slate-500/50'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-[#1e2d45]">
        {filtered.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

function IssueRow({ issue }: { issue: Issue }) {
  const p = priorityConfig[issue.priority];
  const s = statusConfig[issue.status];
  const isResolved = issue.status === 'RESOLVED';

  return (
    <div
      className={`px-4 py-3 hover:bg-[#0d1421] transition-colors ${
        isResolved ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        {/* Priority badge */}
        <div
          className={`mt-0.5 flex-shrink-0 px-1.5 py-0.5 text-[9px] font-mono border rounded-sm ${p.color} ${p.bg} ${p.border}`}
        >
          {p.label}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-mono text-[10px] text-slate-500`}>{issue.id}</span>
            <span className={`text-[10px] font-mono ${s.color}`}>{s.label}</span>
          </div>
          <div className={`text-[13px] font-medium mt-0.5 ${isResolved ? 'line-through' : 'text-slate-200'}`}>
            {issue.title}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[10px] text-slate-600">{issue.systemName}</span>
            <span className="text-slate-700">·</span>
            <span className="text-[10px] text-slate-500">담당: {issue.assignee}</span>
            <span className="text-slate-700">·</span>
            <span className="font-mono text-[10px] text-slate-600">{issue.updatedAt}</span>
          </div>
        </div>

        {/* Critical indicator */}
        {issue.priority === 'CRITICAL' && issue.status !== 'RESOLVED' && (
          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mt-1.5" />
        )}
      </div>
    </div>
  );
}
