// src/types/index.ts

export type SystemStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'BLOCKED' | 'TESTING';
export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface System {
  id: string;
  name: string;
  code: string;
  status: SystemStatus;
  progress: number;
  owner: string;
  department: string;
  targetDate: string;
  startDate: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  assignedSystems: string[];
  status: 'ACTIVE' | 'AWAY' | 'OFFLINE';
  completionRate: number;
  avatar: string;
}

export interface Issue {
  id: string;
  title: string;
  systemId: string;
  systemName: string;
  priority: Priority;
  status: IssueStatus;
  reporter: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface MilestoneEvent {
  date: string;
  label: string;
  type: 'PHASE' | 'CUTOVER' | 'REVIEW' | 'TRAINING';
  status: 'DONE' | 'ACTIVE' | 'UPCOMING';
}

export interface DailyProgress {
  date: string;
  planned: number;
  actual: number;
  issues: number;
}

export interface OverallStats {
  totalSystems: number;
  completedSystems: number;
  inProgressSystems: number;
  pendingSystems: number;
  blockedSystems: number;
  overallProgress: number;
  openIssues: number;
  criticalIssues: number;
  daysRemaining: number;
  targetDate: string;
}
