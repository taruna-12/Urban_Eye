import { CityLocation, Alert, RiskData, EfficiencyData, LoadBalancingRec } from '@/types/city';

// Center: approximate downtown coordinates (using a generic city)
const CENTER_LAT = 40.7128;
const CENTER_LNG = -74.006;

export const cityLocations: CityLocation[] = [
  { id: 'l1', name: 'Riverside Apartments', type: 'house', lat: CENTER_LAT + 0.008, lng: CENTER_LNG - 0.005, description: 'Residential complex, 120 units' },
  { id: 'l2', name: 'Oak Street Homes', type: 'house', lat: CENTER_LAT - 0.004, lng: CENTER_LNG + 0.008, description: 'Suburban housing, 85 units' },
  { id: 'l3', name: 'Central Park', type: 'free-space', lat: CENTER_LAT + 0.003, lng: CENTER_LNG + 0.002, capacity: 500, currentUsage: 120, description: 'Large urban park' },
  { id: 'l4', name: 'Liberty Plaza', type: 'free-space', lat: CENTER_LAT - 0.006, lng: CENTER_LNG - 0.003, capacity: 300, currentUsage: 45, description: 'Open community space' },
  { id: 'l5', name: 'Downtown Market', type: 'marketplace', lat: CENTER_LAT + 0.001, lng: CENTER_LNG - 0.002, capacity: 200, currentUsage: 180, description: 'Main city marketplace' },
  { id: 'l6', name: 'Harbor Bazaar', type: 'marketplace', lat: CENTER_LAT - 0.003, lng: CENTER_LNG + 0.005, capacity: 150, currentUsage: 90, description: 'Waterfront market area' },
  { id: 'l7', name: 'City Hall Parking', type: 'parking', lat: CENTER_LAT + 0.002, lng: CENTER_LNG + 0.004, capacity: 400, currentUsage: 380, description: 'Main downtown parking garage' },
  { id: 'l8', name: 'Station Lot', type: 'parking', lat: CENTER_LAT - 0.005, lng: CENTER_LNG - 0.006, capacity: 250, currentUsage: 100, description: 'Train station parking' },
  { id: 'l9', name: 'Main Street', type: 'road', lat: CENTER_LAT, lng: CENTER_LNG, description: 'Primary east-west corridor' },
  { id: 'l10', name: 'Bridge Avenue', type: 'road', lat: CENTER_LAT + 0.005, lng: CENTER_LNG + 0.006, description: 'North bridge connector' },
];

export const initialAlerts: Alert[] = [
  { id: 'a1', type: 'incident', subType: 'accident', title: 'Vehicle collision on Main St', description: 'Two-car accident blocking eastbound lane', lat: CENTER_LAT + 0.001, lng: CENTER_LNG - 0.001, severity: 'high', timestamp: new Date(Date.now() - 1800000), active: true },
  { id: 'a2', type: 'incident', subType: 'construction', title: 'Road repair on 5th Ave', description: 'Scheduled maintenance, lane closure until 6 PM', lat: CENTER_LAT - 0.002, lng: CENTER_LNG + 0.003, severity: 'medium', timestamp: new Date(Date.now() - 3600000), active: true },
  { id: 'a3', type: 'incident', subType: 'congestion', title: 'Heavy traffic near Bridge Ave', description: 'Rush hour congestion, delays expected', lat: CENTER_LAT + 0.005, lng: CENTER_LNG + 0.005, severity: 'medium', timestamp: new Date(Date.now() - 900000), active: true },
  { id: 'a4', type: 'event', subType: 'fair', title: 'Weekend Art Fair', description: 'Community art exhibition at Central Park', lat: CENTER_LAT + 0.003, lng: CENTER_LNG + 0.002, severity: 'low', timestamp: new Date(Date.now() - 7200000), active: true },
  { id: 'a5', type: 'event', subType: 'stall', title: 'Farmers Market', description: 'Fresh produce market at Harbor Bazaar', lat: CENTER_LAT - 0.003, lng: CENTER_LNG + 0.005, severity: 'low', timestamp: new Date(Date.now() - 5400000), active: true },
];

export const riskData: RiskData[] = [
  { locationId: 'l7', locationName: 'City Hall Parking', usagePercent: 95, trendIncrease: 8, riskScore: 103, predictedOverload: '~2 hours' },
  { locationId: 'l5', locationName: 'Downtown Market', usagePercent: 90, trendIncrease: 5, riskScore: 95, predictedOverload: '~4 hours' },
  { locationId: 'l9', locationName: 'Main Street', usagePercent: 82, trendIncrease: 12, riskScore: 94, predictedOverload: '~3 hours' },
  { locationId: 'l3', locationName: 'Central Park', usagePercent: 24, trendIncrease: 3, riskScore: 27, predictedOverload: 'No risk' },
  { locationId: 'l4', locationName: 'Liberty Plaza', usagePercent: 15, trendIncrease: 1, riskScore: 16, predictedOverload: 'No risk' },
  { locationId: 'l8', locationName: 'Station Lot', usagePercent: 40, trendIncrease: 2, riskScore: 42, predictedOverload: 'No risk' },
];

export const efficiencyData: EfficiencyData[] = [
  { locationId: 'l7', locationName: 'City Hall Parking', type: 'parking', efficiency: 95, underutilized: false },
  { locationId: 'l8', locationName: 'Station Lot', type: 'parking', efficiency: 40, underutilized: true, suggestion: 'Promote as alternative to City Hall Parking during peak hours' },
  { locationId: 'l3', locationName: 'Central Park', type: 'free-space', efficiency: 24, underutilized: true, suggestion: 'Host more community events to increase utilization' },
  { locationId: 'l4', locationName: 'Liberty Plaza', type: 'free-space', efficiency: 15, underutilized: true, suggestion: 'Convert portion to temporary market stalls on weekends' },
  { locationId: 'l5', locationName: 'Downtown Market', type: 'marketplace', efficiency: 90, underutilized: false },
  { locationId: 'l6', locationName: 'Harbor Bazaar', type: 'marketplace', efficiency: 60, underutilized: true, suggestion: 'Extend operating hours and add evening vendors' },
];

export const loadBalancingRecs: LoadBalancingRec[] = [
  { id: 'lb1', type: 'parking', from: 'City Hall Parking', to: 'Station Lot', reason: 'City Hall Parking at 95% capacity', savings: '~150 vehicles redirected' },
  { id: 'lb2', type: 'route', from: 'Main Street', to: 'Harbor Avenue', reason: 'Accident blocking Main St eastbound', savings: '~15 min travel time saved' },
  { id: 'lb3', type: 'redistribution', from: 'Downtown Market', to: 'Harbor Bazaar', reason: 'Downtown Market near capacity', savings: '~60 vendor slots available' },
];

export const freeSpaces = cityLocations.filter(
  l => l.type === 'free-space' && l.capacity && l.currentUsage && (l.capacity - l.currentUsage) > 50
);
