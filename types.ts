
export enum LeadStatus {
  NEW = 'חדש',
  IN_PROGRESS = 'בטיפול',
  CONVERTED = 'הומר',
  REJECTED = 'לא רלוונטי'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  source: string;
  assignedTo: string;
  createdAt: string;
  avatar?: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: 'up' | 'down';
  icon: string;
  colorClass: string;
}
