import { StudentStep, FeatureItem, TechItem, ArchNode, StatMetric, AudienceBenefit } from '../types';

export const STUDENT_STEPS: StudentStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Smart Profile & Resume Parse',
    subtitle: 'Automated Skill Extraction',
    description: 'Students upload resumes once. Natural Language Processing extracts skills, CPI, projects, and domain preferences into structured data.',
    iconName: 'UserCheck',
    metrics: '99.4% Parsing Accuracy',
    status: 'completed',
    codeSnippet: 'parse_resume(pdf) -> { cpi: 8.92, backlogs: 0, tech: ["Python", "React", "Docker"] }'
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Eligibility Matrix Filter',
    subtitle: 'Zero-Error Matching Engine',
    description: 'Criteria like minimum CPI, backlog rules, branch eligibility, and company preferences are cross-verified instantly without manual spreadsheets.',
    iconName: 'Filter',
    metrics: 'Instant Batch Filtering (0.02s)',
    status: 'active',
    codeSnippet: 'SELECT students WHERE cpi >= 7.5 AND active_backlogs = 0 AND branch IN ("CS", "IT")'
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Real-Time Drive Broadcast',
    subtitle: 'Automated Push & WhatsApp Alerts',
    description: 'Eligible candidates receive instant notifications via email, mobile push, and portal dashboard with 1-tap drive registration.',
    iconName: 'BellRing',
    metrics: '100% Delivery Rate',
    status: 'pending',
    codeSnippet: 'celery_worker.dispatch_drive_invite(eligible_users, drive_id=9802)'
  },
  {
    id: 'step-4',
    number: '04',
    title: 'AI Mock Interview & Prep',
    subtitle: 'Domain-Specific Preparation',
    description: 'Students practice technical and behavioral mock interviews evaluated by Gemini AI with feedback on confidence, code speed, and accuracy.',
    iconName: 'BrainCircuit',
    metrics: '3.4x Interview Pass Rate',
    status: 'pending',
    codeSnippet: 'gemini.evaluate_interview(audio_stream, code_submission) -> Score: 92/100'
  },
  {
    id: 'step-5',
    number: '05',
    title: 'Automated Offer Letter & Verification',
    subtitle: 'Tamper-Proof Offer Dispatch',
    description: 'Companies release offer letters directly through the portal. Students accept with 1-click while rules prevent multiple conflicting offers.',
    iconName: 'Award',
    metrics: 'Zero Double-Offering Conflicts',
    status: 'pending',
    codeSnippet: 'portal.lock_student_offer(student_id="CS2025_089", package="24 LPA")'
  },
  {
    id: 'step-6',
    number: '06',
    title: 'Live TPO Command Center',
    subtitle: 'Real-Time Placement Analytics',
    description: 'Placement officers track placement statistics, company CTC distributions, gender ratios, and department performance live.',
    iconName: 'BarChart3',
    metrics: '100% Transparency',
    status: 'pending',
    codeSnippet: 'analytics.generate_tpo_report(year=2026) -> Placed: 98.4%, Avg CTC: ₹14.8 LPA'
  }
];

export const FEATURES_LIST: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Automated Eligibility Verification',
    category: 'Core Engine',
    description: 'No more manual Excel cross-checking. Complex eligibility rules like multi-branch criteria, tier limits, and backlog history are verified automatically.',
    icon: 'ShieldCheck',
    gradient: 'from-cyan-500 to-teal-400',
    stats: '100% Accuracy',
    highlight: 'Zero human verification error'
  },
  {
    id: 'feat-2',
    title: 'One-Click Drive Management',
    category: 'Recruiter Hub',
    description: 'Companies schedule multi-stage recruitment drives (OA -> Technical 1 -> Technical 2 -> HR) with auto-allocated interview slots and room numbers.',
    icon: 'CalendarSync',
    gradient: 'from-emerald-400 to-teal-500',
    stats: '10x Faster Scheduling',
    highlight: 'Auto room & panel allocation'
  },
  {
    id: 'feat-3',
    title: 'AI Resume Synthesizer',
    category: 'Student Tools',
    description: 'Built-in Gemini AI resume builder scans job descriptions and highlights missing key skills, tailored ATS formatting, and project impact metrics.',
    icon: 'FileText',
    gradient: 'from-teal-400 to-blue-500',
    stats: '95+ ATS Score',
    highlight: 'Instant AI tailing'
  },
  {
    id: 'feat-4',
    title: 'Asynchronous Job Queue',
    category: 'Architecture',
    description: 'Powered by Celery and Redis. Heavy operations like 5,000 PDF report generations or mass notifications run in background queues without UI lag.',
    icon: 'Zap',
    gradient: 'from-blue-500 to-cyan-400',
    stats: '< 10ms Response',
    highlight: 'High concurrency handling'
  },
  {
    id: 'feat-5',
    title: 'Automated Offer Policy Engine',
    category: 'Compliance',
    description: 'Enforces college placement rules ("One Student, One Dream Offer") automatically. Once a student accepts a dream offer, secondary drives lock seamlessly.',
    icon: 'Lock',
    gradient: 'from-cyan-400 to-emerald-400',
    stats: '0 Policy Violation',
    highlight: 'Fair distribution'
  },
  {
    id: 'feat-6',
    title: 'Executive Analytics & Export',
    category: 'TPO Insights',
    description: 'Generate accreditation-ready PDF/Excel reports with OpenPyXL and Pandas for NIRF ratings, NAAC audits, and executive summaries with 1 click.',
    icon: 'PieChart',
    gradient: 'from-emerald-500 to-cyan-500',
    stats: 'NIRF Ready',
    highlight: 'Audit-ready metrics'
  }
];

export const TECH_STACK: TechItem[] = [
  {
    id: 'tech-python',
    name: 'Python 3.12',
    category: 'Core Backend',
    role: 'Robust business logic, data structures, and AI pipeline handling.',
    icon: 'Code2',
    glowColor: '#3776AB',
    description: 'Empowers fast computing, data manipulation, and seamless AI engine binding.',
    speed: 'High-speed processing'
  },
  {
    id: 'tech-django',
    name: 'Django Framework',
    category: 'Web Core',
    role: 'Batteries-included ORM, secure authentication, and robust admin portal.',
    icon: 'Layers',
    glowColor: '#092E20',
    description: 'Provides enterprise-grade security, CSRF protection, and structured API endpoints.',
    speed: 'Enterprise Security'
  },
  {
    id: 'tech-celery',
    name: 'Celery & Redis',
    category: 'Task Queue',
    role: 'Distributed async message queue for background workers & scheduled drives.',
    icon: 'Cpu',
    glowColor: '#37B24D',
    description: 'Executes thousands of parallel notifications, PDF builds, and mail dispatches.',
    speed: 'Async Processing'
  },
  {
    id: 'tech-pandas',
    name: 'Pandas',
    category: 'Data Science',
    role: 'Large-scale student batch filtering, placement metrics, and statistical aggregations.',
    icon: 'Binary',
    glowColor: '#130654',
    description: 'Processes thousands of academic records and CPI distributions in milliseconds.',
    speed: 'Vectorized Speed'
  },
  {
    id: 'tech-openpyxl',
    name: 'OpenPyXL',
    category: 'Report Engine',
    role: 'Dynamic Excel report generation with custom formatting, charts, and formulas.',
    icon: 'FileSpreadsheet',
    glowColor: '#217346',
    description: 'Direct export of placement sheets formatted for recruiters and NAAC inspections.',
    speed: 'Formatted Excel'
  },
  {
    id: 'tech-bootstrap',
    name: 'Bootstrap 5',
    category: 'Frontend UI',
    role: 'Clean, responsive UI components ensuring accessibility and consistent style.',
    icon: 'Layout',
    glowColor: '#7952B3',
    description: 'Provides responsive grids, forms, and tables tailored for student and TPO dashboards.',
    speed: 'Clean Grid Layout'
  },
  {
    id: 'tech-templates',
    name: 'Django Templates',
    category: 'UI Rendering',
    role: 'Server-side HTML rendering engine with secure context rendering.',
    icon: 'Layers',
    glowColor: '#092E20',
    description: 'Renders dynamic student lists, eligibility matrices, and admin panels securely.',
    speed: 'Secure Server-Side'
  },
  {
    id: 'tech-gemini',
    name: 'Gemini AI API',
    category: 'Intelligence',
    role: 'Smart resume skill parsing, automated Q&A mock interviews, and career recommendations.',
    icon: 'Sparkles',
    glowColor: '#00FFC6',
    description: 'Multi-modal AI assistant providing contextual candidate recommendations.',
    speed: 'Real-Time AI'
  },
  {
    id: 'tech-postgres',
    name: 'PostgreSQL',
    category: 'Database',
    role: 'Relational database ensuring ACID compliance, indexing, and transactional integrity.',
    icon: 'Database',
    glowColor: '#336791',
    description: 'Stores student records, company credentials, and offer histories safely.',
    speed: 'ACID Guaranteed'
  }
];

export const ARCH_NODES: ArchNode[] = [
  {
    id: 'node-client',
    title: 'Django Server & Bootstrap 5',
    subtitle: 'Student / Company / Admin Roles',
    type: 'client',
    status: 'operational',
    latency: '8ms',
    throughput: '3.2k req/s'
  },
  {
    id: 'node-api',
    title: 'Django REST Gateway',
    subtitle: 'Auth, Eligibility & Route Controller',
    type: 'service',
    status: 'operational',
    latency: '24ms',
    throughput: '1.8k req/s'
  },
  {
    id: 'node-celery',
    title: 'Celery Async Queue',
    subtitle: 'Redis Message Broker & Background Tasks',
    type: 'queue',
    status: 'operational',
    latency: '4ms',
    throughput: '5.0k msgs/s'
  },
  {
    id: 'node-db',
    title: 'PostgreSQL Database',
    subtitle: 'ACID Relational Storage',
    type: 'database',
    status: 'operational',
    latency: '8ms',
    throughput: '800 QPS'
  },
  {
    id: 'node-ai',
    title: 'Gemini Intelligence API',
    subtitle: 'Resume Vector Match & Mock AI',
    type: 'ai',
    status: 'operational',
    latency: '120ms',
    throughput: '150 req/s'
  }
];

export const STAT_METRICS: StatMetric[] = [
  {
    id: 'stat-rate',
    label: 'Overall Placement Rate',
    value: 98.4,
    suffix: '%',
    sublabel: 'Compared to 72% national average',
    percentage: 98.4
  },
  {
    id: 'stat-ctc',
    label: 'Highest International CTC',
    value: 52.8,
    prefix: '₹',
    suffix: ' LPA',
    sublabel: 'Avg Package boosted to ₹14.2 LPA',
    percentage: 92
  },
  {
    id: 'stat-time',
    label: 'Drive Cycle Reduction',
    value: 85,
    suffix: '%',
    sublabel: 'From 14 days down to 48 hours',
    percentage: 85
  },
  {
    id: 'stat-companies',
    label: 'Partner Recruiters',
    value: 450,
    suffix: '+',
    sublabel: 'Fortune 500 & Unicorn Startups',
    percentage: 95
  }
];

export const AUDIENCE_BENEFITS: AudienceBenefit[] = [
  {
    role: 'Students',
    tagline: 'Transparent, stress-free placement journey with zero missed opportunities.',
    points: [
      {
        title: 'Single-Window Portal',
        desc: 'Apply to drives with 1-click without re-entering academic history every time.',
        icon: 'LayoutGrid'
      },
      {
        title: 'AI Resume Tailoring',
        desc: 'Get immediate feedback on resume alignment before submitting to top companies.',
        icon: 'Wand2'
      },
      {
        title: 'Instant Offer Security',
        desc: 'Transparent offer letters with verified CTC breakdowns and acceptance timers.',
        icon: 'CheckCircle2'
      }
    ]
  },
  {
    role: 'TPO Officers',
    tagline: 'Command-center oversight with automated policy enforcement and instant reports.',
    points: [
      {
        title: 'Zero Spreadsheet Overhead',
        desc: 'Eliminate manual excel formulas and fragmented email drive notices.',
        icon: 'FileCheck'
      },
      {
        title: 'Automated Tier Locking',
        desc: 'Placement policy rules lock students automatically upon dream offer acceptance.',
        icon: 'ShieldAlert'
      },
      {
        title: 'NAAC / NIRF One-Click Export',
        desc: 'Export pre-formatted audit reports detailing department-wise CTC stats.',
        icon: 'Download'
      }
    ]
  },
  {
    role: 'Recruiters',
    tagline: 'Streamlined campus visits with pre-verified candidate lists & automated slots.',
    points: [
      {
        title: 'Pre-Filtered Candidates',
        desc: 'Only qualified candidates matching exact CPI and skill criteria are presented.',
        icon: 'UserCheck'
      },
      {
        title: 'Automated Slot Allocation',
        desc: 'Schedule interview panels and candidate slots without manual room calling.',
        icon: 'Clock'
      },
      {
        title: 'Digital Result Submission',
        desc: 'Submit shortlisted candidate lists directly with digital signatures.',
        icon: 'Send'
      }
    ]
  }
];

export const MOCK_SIMULATION_STUDENTS = [
  { name: 'Aarav Sharma', roll: 'CS2025001', branch: 'Computer Science', cpi: 9.42, backlogs: 0, status: 'Offer Letter Received (₹28 LPA)' },
  { name: 'Ananya Verma', roll: 'IT2025014', branch: 'Information Tech', cpi: 8.85, backlogs: 0, status: 'Interview Stage 2' },
  { name: 'Rohan Mehta', roll: 'EC2025032', branch: 'Electronics', cpi: 8.10, backlogs: 0, status: 'Eligible & Notified' },
  { name: 'Priya Patel', roll: 'CS2025089', branch: 'Computer Science', cpi: 9.15, backlogs: 0, status: 'Offer Accepted (₹34 LPA)' },
  { name: 'Siddharth Rao', roll: 'ME2025007', branch: 'Mechanical', cpi: 7.45, backlogs: 1, status: 'Pending Eligibility Review' },
  { name: 'Kavya Nair', roll: 'AI2025003', branch: 'AI & Data Science', cpi: 9.68, backlogs: 0, status: 'Offer Accepted (₹42 LPA)' }
];
