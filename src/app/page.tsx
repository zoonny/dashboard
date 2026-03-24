// src/app/page.tsx
import Header from '@/components/dashboard/Header';
import SystemGrid from '@/components/dashboard/SystemGrid';
import ProgressChart from '@/components/dashboard/ProgressChart';
import IssueLog from '@/components/dashboard/IssueLog';
import MilestoneTimeline from '@/components/dashboard/MilestoneTimeline';
import TeamPanel from '@/components/dashboard/TeamPanel';
import StatsOverview from '@/components/dashboard/StatsOverview';
import {
  overallStats,
  systems,
  teamMembers,
  issues,
  milestones,
  dailyProgress,
} from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen grid-bg flex flex-col">
      <div className="scan-line" />

      <Header stats={overallStats} />

      <main className="flex-1 p-4 grid gap-3" style={{
        gridTemplateRows: 'auto 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 280px',
        gridTemplateAreas: `
          "timeline timeline timeline timeline"
          "systems  systems  chart    stats"
          "systems  systems  issues   team"
        `,
        minHeight: 0,
      }}>
        {/* Milestone timeline — top full width */}
        <div style={{ gridArea: 'timeline' }} className="h-36">
          <MilestoneTimeline milestones={milestones} />
        </div>

        {/* System grid — left 2/4 spanning 2 rows */}
        <div style={{ gridArea: 'systems' }} className="overflow-hidden">
          <SystemGrid systems={systems} />
        </div>

        {/* Progress chart — center top */}
        <div style={{ gridArea: 'chart' }}>
          <ProgressChart data={dailyProgress} />
        </div>

        {/* Issues — center bottom */}
        <div style={{ gridArea: 'issues' }} className="overflow-hidden">
          <IssueLog issues={issues} />
        </div>

        {/* Stats overview — right top */}
        <div style={{ gridArea: 'stats' }}>
          <StatsOverview stats={overallStats} />
        </div>

        {/* Team panel — right bottom */}
        <div style={{ gridArea: 'team' }} className="overflow-hidden">
          <TeamPanel members={teamMembers} />
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-1.5 border-t border-[#1e2d45] flex items-center justify-between">
        <div className="font-mono text-[10px] text-slate-600">
          SYS-TRANSITION-CTRL v2.1.0 · LAST SYNC: {new Date().toLocaleTimeString('ko-KR')}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[10px] text-slate-500">LIVE</span>
          </div>
          <span className="font-mono text-[10px] text-slate-600">
            전사 ERP 업무전환 프로젝트 · 2024.11 – 2025.03
          </span>
        </div>
      </footer>
    </div>
  );
}
