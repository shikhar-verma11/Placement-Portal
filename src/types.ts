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
