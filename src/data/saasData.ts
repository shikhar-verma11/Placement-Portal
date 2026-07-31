import { NotificationItem, ActivityItem, ApplicationRecord, PlacementDrive, SearchResultItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Application Submitted',
    description: 'Your application for Goldman Sachs - Technology Analyst has been verified by TPO.',
    timestamp: '10 mins ago',
    type: 'application',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Interview Scheduled',
    description: 'Microsoft SDE Round 2 Technical Interview scheduled for tomorrow at 10:30 AM.',
    timestamp: '1 hour ago',
    type: 'interview',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Offer Released',
    description: 'Congratulations! Amazon released your official offer letter for ₹28.5 LPA CTC.',
    timestamp: '3 hours ago',
    type: 'offer',
    read: false,
  },
  {
    id: 'notif-4',
    title: 'Drive Deadline Alert',
    description: 'Google Software Engineer 2026 Drive registration closes in 4 hours.',
    timestamp: '5 hours ago',
    type: 'drive',
    read: true,
  },
  {
    id: 'notif-5',
    title: 'New Company Registered',
    description: 'Atlassian registered for On-Campus Placement Drive 2026.',
    timestamp: 'Yesterday',
    type: 'system',
    read: true,
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    user: 'Rahul Sharma',
    role: 'CS2025001',
    action: 'applied to',
    target: 'Amazon (SDE-1)',
    timeAgo: 'Just now',
    iconType: 'apply',
  },
  {
    id: 'act-2',
    user: 'TCS Campus Team',
    role: 'Recruiter',
    action: 'posted a new drive for',
    target: 'Graduate Engineer Trainee 2026',
    timeAgo: '12m ago',
    iconType: 'drive',
  },
  {
    id: 'act-3',
    user: 'TPO Admin Officer',
    role: 'Officer',
    action: 'approved eligibility batch for',
    target: 'Microsoft India (42 Candidates)',
    timeAgo: '45m ago',
    iconType: 'approve',
  },
  {
    id: 'act-4',
    user: 'Offer Released',
    role: 'Automated System',
    action: 'issued offer letter to',
    target: 'Kavya Nair (₹42 LPA - Google)',
    timeAgo: '2h ago',
    iconType: 'offer',
  },
  {
    id: 'act-5',
    user: 'Ananya Verma',
    role: 'IT2025014',
    action: 'passed Technical Round 1 at',
    target: 'Goldman Sachs',
    timeAgo: '3h ago',
    iconType: 'apply',
  }
];

export const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-1',
    companyName: 'Amazon',
    role: 'Software Development Engineer I',
    package: '₹28.5 LPA',
    location: 'Bengaluru / Hyderabad',
    appliedDate: '12 July 2026',
    currentStage: 'Offer Released',
    stageNumber: 5,
    status: 'Offer Accepted',
    timeline: [
      { stage: 'Applied', date: '12 July 2026', status: 'completed', feedback: 'Resume parsed & verified' },
      { stage: 'Online Assessment', date: '16 July 2026', status: 'completed', feedback: 'Score: 98% (2 LC Hard cleared)' },
      { stage: 'Technical Interview', date: '21 July 2026', status: 'completed', feedback: 'Strong DSA & System Design' },
      { stage: 'HR Interview', date: '25 July 2026', status: 'completed', feedback: 'Behavioral bar raiser cleared' },
      { stage: 'Offer Released', date: '28 July 2026', status: 'completed', feedback: 'Official CTC breakup generated' },
    ]
  },
  {
    id: 'app-2',
    companyName: 'Microsoft',
    role: 'Software Engineer II',
    package: '₹34.0 LPA',
    location: 'Noida / Bengaluru',
    appliedDate: '18 July 2026',
    currentStage: 'Technical Interview',
    stageNumber: 3,
    status: 'In Progress',
    timeline: [
      { stage: 'Applied', date: '18 July 2026', status: 'completed', feedback: 'Verified by TPO' },
      { stage: 'Online Assessment', date: '22 July 2026', status: 'completed', feedback: 'Score: 94%' },
      { stage: 'Technical Interview', date: 'Scheduled Today', status: 'active', feedback: 'Round 2 scheduled at 10:30 AM' },
      { stage: 'HR Interview', date: 'Pending', status: 'upcoming' },
      { stage: 'Offer Released', date: 'Pending', status: 'upcoming' },
    ]
  },
  {
    id: 'app-3',
    companyName: 'Goldman Sachs',
    role: 'Engineering Analyst',
    package: '₹24.0 LPA',
    location: 'Bengaluru',
    appliedDate: '05 July 2026',
    currentStage: 'Online Assessment',
    stageNumber: 2,
    status: 'In Progress',
    timeline: [
      { stage: 'Applied', date: '05 July 2026', status: 'completed' },
      { stage: 'Online Assessment', date: 'Completed', status: 'completed', feedback: 'Awaiting shortlist result' },
      { stage: 'Technical Interview', date: 'TBD', status: 'upcoming' },
      { stage: 'HR Interview', date: 'TBD', status: 'upcoming' },
      { stage: 'Offer Released', date: 'TBD', status: 'upcoming' },
    ]
  },
  {
    id: 'app-4',
    companyName: 'TCS Digital',
    role: 'System Engineer',
    package: '₹9.0 LPA',
    location: 'Pan India',
    appliedDate: '01 July 2026',
    currentStage: 'Offer Released',
    stageNumber: 5,
    status: 'Shortlisted',
    timeline: [
      { stage: 'Applied', date: '01 July 2026', status: 'completed' },
      { stage: 'Online Assessment', date: '04 July 2026', status: 'completed' },
      { stage: 'Technical Interview', date: '08 July 2026', status: 'completed' },
      { stage: 'HR Interview', date: '11 July 2026', status: 'completed' },
      { stage: 'Offer Released', date: '15 July 2026', status: 'completed', feedback: 'Offer letter in inbox' },
    ]
  }
];

export const MOCK_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'drive-1',
    companyName: 'Google India',
    logoText: 'G',
    role: 'Software Engineer - 2026 Batch',
    packageCTC: '₹42.0 LPA',
    minCpi: 8.5,
    maxBacklogs: 0,
    eligibleBranches: ['Computer Science', 'Information Tech', 'AI & Data Science'],
    deadline: 'Tomorrow at 11:59 PM',
    driveDate: '05 August 2026',
    roundsCount: 4,
  },
  {
    id: 'drive-2',
    companyName: 'Amazon Web Services',
    logoText: 'AWS',
    role: 'Cloud Development Engineer',
    packageCTC: '₹28.5 LPA',
    minCpi: 7.5,
    maxBacklogs: 0,
    eligibleBranches: ['Computer Science', 'Information Tech', 'Electronics', 'AI & Data Science'],
    deadline: '03 August 2026',
    driveDate: '10 August 2026',
    roundsCount: 3,
  },
  {
    id: 'drive-3',
    companyName: 'Atlassian',
    logoText: 'A',
    role: 'Frontend / Fullstack Engineer',
    packageCTC: '₹52.8 LPA',
    minCpi: 9.0,
    maxBacklogs: 0,
    eligibleBranches: ['Computer Science', 'Information Tech'],
    deadline: '08 August 2026',
    driveDate: '15 August 2026',
    roundsCount: 4,
  },
  {
    id: 'drive-4',
    companyName: 'Texas Instruments',
    logoText: 'TI',
    role: 'Analog & VLSI Design Engineer',
    packageCTC: '₹22.0 LPA',
    minCpi: 7.0,
    maxBacklogs: 1,
    eligibleBranches: ['Electronics', 'Electrical'],
    deadline: '12 August 2026',
    driveDate: '18 August 2026',
    roundsCount: 3,
  }
];

export const GLOBAL_SEARCH_ITEMS: SearchResultItem[] = [
  { id: 'st-1', title: 'Aarav Sharma', subtitle: 'CS2025001 • CPI: 9.42 • Computer Science', category: 'Student', badge: 'Placed - ₹28 LPA', iconName: 'User' },
  { id: 'st-2', title: 'Ananya Verma', subtitle: 'IT2025014 • CPI: 8.85 • Information Tech', category: 'Student', badge: 'Interview Stage 2', iconName: 'User' },
  { id: 'st-3', title: 'Priya Patel', subtitle: 'CS2025089 • CPI: 9.15 • Computer Science', category: 'Student', badge: 'Placed - ₹34 LPA', iconName: 'User' },
  { id: 'st-4', title: 'Siddharth Rao', subtitle: 'ME2025007 • CPI: 7.45 • Mechanical', category: 'Student', badge: '1 Backlog', iconName: 'User' },
  { id: 'st-5', title: 'Kavya Nair', subtitle: 'AI2025003 • CPI: 9.68 • AI & Data Science', category: 'Student', badge: 'Placed - ₹42 LPA', iconName: 'User' },

  { id: 'cp-1', title: 'Google India', subtitle: 'Offered 12 Offers • Avg CTC: ₹38.2 LPA', category: 'Company', badge: 'Tier 1 Dream', iconName: 'Building2' },
  { id: 'cp-2', title: 'Amazon AWS', subtitle: 'Offered 24 Offers • Avg CTC: ₹28.5 LPA', category: 'Company', badge: 'Tier 1 Dream', iconName: 'Building2' },
  { id: 'cp-3', title: 'Microsoft Corporation', subtitle: 'Offered 18 Offers • Avg CTC: ₹34.0 LPA', category: 'Company', badge: 'Tier 1 Dream', iconName: 'Building2' },
  { id: 'cp-4', title: 'Goldman Sachs', subtitle: 'Offered 8 Offers • Avg CTC: ₹24.0 LPA', category: 'Company', badge: 'FinTech Leader', iconName: 'Building2' },

  { id: 'dr-1', title: 'Google SDE 2026 Drive', subtitle: 'Min CPI: 8.5 • Deadline: Tomorrow', category: 'Drive', badge: 'Registration Open', iconName: 'Briefcase' },
  { id: 'dr-2', title: 'Amazon Cloud Engineer Drive', subtitle: 'Min CPI: 7.5 • Deadline: 03 Aug', category: 'Drive', badge: 'Registration Open', iconName: 'Briefcase' },
  { id: 'dr-3', title: 'Atlassian Fullstack Drive', subtitle: 'Min CPI: 9.0 • Package: ₹52.8 LPA', category: 'Drive', badge: 'Upcoming', iconName: 'Briefcase' },

  { id: 'an-1', title: 'NIRF Placement Audit Completed', subtitle: '98.4% overall placement rate registered for 2026 batch.', category: 'Announcement', badge: 'Official', iconName: 'Megaphone' },
  { id: 'an-2', title: 'AI Mock Interview Portal Enabled', subtitle: 'Students can now practice Google & Amazon interview simulations with Gemini AI.', category: 'Announcement', badge: 'New Feature', iconName: 'Sparkles' },

  { id: 'qa-1', title: 'Launch Portal Command Simulator', subtitle: 'Simulate eligibility matrix, drive dispatches & candidate filtering.', category: 'Quick Action', badge: 'Modal', iconName: 'Terminal', actionPayload: 'open_portal' },
  { id: 'qa-2', title: 'Export NAAC / NIRF Excel Audit Report', subtitle: 'Generate formatted spreadsheet report with complete placement statistics.', category: 'Quick Action', badge: 'Report', iconName: 'FileSpreadsheet', actionPayload: 'export_report' },
  { id: 'qa-3', title: 'Import Candidate Excel Roster', subtitle: 'Drag & drop Excel or CSV file to parse batch student credentials.', category: 'Quick Action', badge: 'Excel', iconName: 'Upload', actionPayload: 'import_excel' },
];

export const DEPARTMENT_PLACEMENT_DATA = [
  { name: 'Comp Sci', placed: 240, total: 245, avgPackage: 18.5 },
  { name: 'Info Tech', placed: 180, total: 188, avgPackage: 16.2 },
  { name: 'Electronics', placed: 155, total: 170, avgPackage: 12.8 },
  { name: 'AI & Data', placed: 112, total: 115, avgPackage: 19.1 },
  { name: 'Mechanical', placed: 130, total: 150, avgPackage: 8.5 },
  { name: 'Electrical', placed: 105, total: 125, avgPackage: 9.2 },
];

export const SALARY_DISTRIBUTION_DATA = [
  { range: '< ₹6 LPA', count: 45, fill: '#3A3A3A' },
  { range: '₹6 - ₹12 LPA', count: 280, fill: '#4CAF50' },
  { range: '₹12 - ₹20 LPA', count: 320, fill: '#6A8DFF' },
  { range: '₹20 - ₹35 LPA', count: 190, fill: '#8EAAD4' },
  { range: '> ₹35 LPA', count: 87, fill: '#00FFC6' },
];

export const MONTHLY_PLACEMENT_TREND = [
  { month: 'Jan', placements: 45, avgPackage: 11.2 },
  { month: 'Feb', placements: 120, avgPackage: 13.5 },
  { month: 'Mar', placements: 280, avgPackage: 15.0 },
  { month: 'Apr', placements: 210, avgPackage: 14.8 },
  { month: 'May', placements: 165, avgPackage: 13.9 },
  { month: 'Jun', placements: 102, avgPackage: 12.5 },
];
