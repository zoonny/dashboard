'use client';
// src/components/dashboard/ProgressChart.tsx

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DailyProgress } from '@/types';

interface ProgressChartProps {
  data: DailyProgress[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1421] border border-[#2a4066] rounded-sm p-3 font-mono text-[11px]">
        <div className="text-slate-400 mb-2">{label}</div>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-400">
              {entry.name === 'planned' ? '계획' : entry.name === 'actual' ? '실적' : '이슈'}
            </span>
            <span style={{ color: entry.color }} className="font-bold">
              {entry.value}
              {entry.name !== 'issues' ? '%' : '건'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="card h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#1e2d45] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-blue-400 tracking-widest">◈</span>
          <span className="text-sm font-semibold text-slate-200">일별 진행 추이</span>
        </div>
        <div className="flex items-center gap-3">
          <LegendItem color="#3b82f6" label="계획" />
          <LegendItem color="#22d3ee" label="실적" />
          <LegendItem color="#f59e0b" label="이슈 건수" />
        </div>
      </div>
      <div className="flex-1 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="#1e2d45" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#475569', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={{ stroke: '#1e2d45' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={58} stroke="#3b82f6" strokeDasharray="4 4" strokeOpacity={0.4} />
            <Area
              type="monotone"
              dataKey="planned"
              stroke="#3b82f6"
              strokeWidth={1.5}
              fill="url(#plannedGrad)"
              strokeDasharray="4 2"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#actualGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="font-mono text-[10px] text-slate-500">{label}</span>
    </div>
  );
}
