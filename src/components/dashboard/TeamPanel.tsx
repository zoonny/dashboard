'use client';
// src/components/dashboard/TeamPanel.tsx

import { TeamMember } from '@/types';

interface TeamPanelProps {
  members: TeamMember[];
}

const statusConfig = {
  ACTIVE: { label: '활성', color: 'bg-green-400', ring: 'ring-green-400/30' },
  AWAY: { label: '자리비움', color: 'bg-amber-400', ring: 'ring-amber-400/30' },
  OFFLINE: { label: '오프라인', color: 'bg-slate-500', ring: 'ring-slate-500/30' },
};

export default function TeamPanel({ members }: TeamPanelProps) {
  return (
    <div className="card flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#1e2d45]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-cyan-400 tracking-widest">◈</span>
          <span className="text-sm font-semibold text-slate-200">담당자 현황</span>
          <span className="font-mono text-[10px] text-slate-500">
            [ {members.filter((m) => m.status === 'ACTIVE').length} ONLINE ]
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-[#1e2d45]">
        {members.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

function MemberRow({ member }: { member: TeamMember }) {
  const s = statusConfig[member.status];
  const barColor =
    member.completionRate >= 80
      ? 'bg-green-500'
      : member.completionRate >= 50
      ? 'bg-blue-500'
      : member.completionRate >= 30
      ? 'bg-amber-500'
      : 'bg-red-500';

  return (
    <div className="px-4 py-2.5 hover:bg-[#0d1421] transition-colors">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`relative w-8 h-8 flex-shrink-0`}>
          <div
            className={`w-8 h-8 bg-[#1e2d45] border border-[#2a4066] flex items-center justify-center rounded-sm`}
          >
            <span className="text-xs font-bold text-slate-300">{member.avatar}</span>
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#0d1421] ${s.color}`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-slate-200">{member.name}</span>
            <span className="text-[10px] text-slate-500">{member.role}</span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 bg-[#1e2d45] rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} rounded-full transition-all`}
                style={{ width: `${member.completionRate}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-slate-400 w-8 text-right">
              {member.completionRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
