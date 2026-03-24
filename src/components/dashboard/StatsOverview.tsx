'use client';
// src/components/dashboard/StatsOverview.tsx

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { OverallStats } from '@/types';

interface StatsOverviewProps {
  stats: OverallStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const pieData = [
    { name: '완료', value: stats.completedSystems, color: '#22c55e' },
    { name: '진행중', value: stats.inProgressSystems, color: '#3b82f6' },
    { name: '블로킹', value: stats.blockedSystems, color: '#ef4444' },
    { name: '대기', value: stats.pendingSystems, color: '#475569' },
  ];

  return (
    <div className="card flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#1e2d45]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-green-400 tracking-widest">◈</span>
          <span className="text-sm font-semibold text-slate-200">전환 현황 요약</span>
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col gap-3">
        {/* Donut chart */}
        <div className="relative h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={62}
                dataKey="value"
                strokeWidth={0}
                paddingAngle={2}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0d1421',
                  border: '1px solid #2a4066',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="font-mono text-2xl font-bold text-white ticker">
              {stats.overallProgress}%
            </div>
            <div className="font-mono text-[9px] text-slate-500">전환 완료율</div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-1.5">
          {pieData.map((d) => (
            <div key={d.name} className="flex items-center gap-2 px-2 py-1.5 bg-[#0d1421] rounded-sm border border-[#1e2d45]">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-[10px] text-slate-400 flex-1">{d.name}</span>
              <span className="font-mono text-[11px] font-bold" style={{ color: d.color }}>
                {d.value}
              </span>
            </div>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-1.5">
          <StatBox label="오픈 이슈" value={stats.openIssues} unit="건" color="text-orange-400" />
          <StatBox label="긴급 이슈" value={stats.criticalIssues} unit="건" color="text-red-400" />
          <StatBox label="목표일" value="03/15" unit="" color="text-amber-400" mono />
          <StatBox label="잔여일" value={`D-${stats.daysRemaining}`} unit="" color="text-cyan-400" mono />
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  unit,
  color,
  mono = false,
}: {
  label: string;
  value: string | number;
  unit: string;
  color: string;
  mono?: boolean;
}) {
  return (
    <div className="bg-[#0d1421] border border-[#1e2d45] rounded-sm px-2 py-2">
      <div className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</div>
      <div className={`font-mono text-base font-bold mt-0.5 ${color} ticker`}>
        {value}
        {unit && <span className="text-[10px] ml-0.5">{unit}</span>}
      </div>
    </div>
  );
}
