export type UserRole = 'official' | 'citizen';

export type MarkerType = 'house' | 'free-space' | 'marketplace' | 'parking' | 'road';
export type AlertType = 'incident' | 'event';
export type IncidentType = 'accident' | 'construction' | 'congestion' | 'failure';
export type EventType = 'fair' | 'stall' | 'local-event' | 'community';

export interface CityLocation {
  id: string;
  name: string;
  type: MarkerType;
  lat: number;
  lng: number;
  capacity?: number;
  currentUsage?: number;
  description?: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  subType: IncidentType | EventType;
  title: string;
  description: string;
  lat: number;
  lng: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  active: boolean;
}

export interface RiskData {
  locationId: string;
  locationName: string;
  usagePercent: number;
  trendIncrease: number;
  riskScore: number;
  predictedOverload: string;
}

export interface EfficiencyData {
  locationId: string;
  locationName: string;
  type: MarkerType;
  efficiency: number;
  underutilized: boolean;
  suggestion?: string;
}

export interface LoadBalancingRec {
  id: string;
  type: 'route' | 'parking' | 'redistribution';
  from: string;
  to: string;
  reason: string;
  savings: string;
}
