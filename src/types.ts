export interface StudentStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metrics: string;
  status: 'pending' | 'active' | 'completed';
  codeSnippet?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  gradient: string;
  stats: string;
  highlight: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: string;
  role: string;
  icon: string;
  glowColor: string;
  description: string;
  speed: string;
}

export interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'client' | 'service' | 'queue' | 'database' | 'ai';
  status: 'operational' | 'busy' | 'syncing';
  latency: string;
  throughput: string;
}

export interface StatMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  sublabel: string;
  percentage: number;
}

export interface AudienceBenefit {
  role: 'Students' | 'TPO Officers' | 'Recruiters';
  tagline: string;
  points: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'application' | 'interview' | 'offer' | 'drive' | 'system';
  read: boolean;
  link?: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  role: string;
  action: string;
  target: string;
  timeAgo: string;
  avatarBg?: string;
  iconType: 'apply' | 'drive' | 'approve' | 'offer';
}

export interface ApplicationRecord {
  id: string;
  companyName: string;
  role: string;
  package: string;
  location: string;
  appliedDate: string;
  currentStage: 'Applied' | 'Online Assessment' | 'Technical Interview' | 'HR Interview' | 'Offer Released';
  stageNumber: number;
  status: 'In Progress' | 'Shortlisted' | 'Offer Accepted' | 'Rejected';
  timeline: {
    stage: string;
    date: string;
    status: 'completed' | 'active' | 'upcoming' | 'rejected';
    feedback?: string;
  }[];
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  logoText: string;
  role: string;
  packageCTC: string;
  minCpi: number;
  maxBacklogs: number;
  eligibleBranches: string[];
  deadline: string;
  driveDate: string;
  roundsCount: number;
  isEligible?: boolean;
  ineligibilityReason?: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Student' | 'Company' | 'Drive' | 'Announcement' | 'Quick Action';
  badge?: string;
  iconName: string;
  actionPayload?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
