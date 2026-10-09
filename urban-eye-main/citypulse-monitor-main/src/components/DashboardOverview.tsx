import React from 'react';
import { RiskData, EfficiencyData } from '@/types/city';
import { Alert as AlertType } from '@/types/city';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Zap, MapPin, TrendingUp, BarChart3 } from 'lucide-react';

interface DashboardOverviewProps {
  alerts: AlertType[];
  riskData: RiskData[];
  efficiencyData: EfficiencyData[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ alerts, riskData, efficiencyData }) => {
  const activeIncidents = alerts.filter(a => a.active && a.type === 'incident').length;
  const activeEvents = alerts.filter(a => a.active && a.type === 'event').length;
  const highRiskCount = riskData.filter(r => r.riskScore >= 80).length;
  const avgEfficiency = Math.round(efficiencyData.reduce((s, d) => s + d.efficiency, 0) / efficiencyData.length);
  const underutilized = efficiencyData.filter(d => d.underutilized).length;

  const stats = [
    { label: 'Active Incidents', value: activeIncidents, icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/15' },
    { label: 'Community Events', value: activeEvents, icon: Activity, color: 'text-warning', bg: 'bg-warning/15' },
    { label: 'High Risk Zones', value: highRiskCount, icon: TrendingUp, color: 'text-destructive', bg: 'bg-destructive/15' },
    { label: 'Avg Efficiency', value: `${avgEfficiency}%`, icon: Zap, color: 'text-primary', bg: 'bg-primary/15' },
    { label: 'Underutilized', value: underutilized, icon: MapPin, color: 'text-warning', bg: 'bg-warning/15' },
    { label: 'Monitored Sites', value: riskData.length, icon: BarChart3, color: 'text-primary', bg: 'bg-primary/15' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground tracking-wider glow-text">CITY DASHBOARD</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time infrastructure monitoring</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glow-card rounded-xl p-4"
          >
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Stress heatmap visualization (simplified bar chart) */}
      <div className="glow-card rounded-xl p-5">
        <h3 className="font-display text-sm font-bold text-foreground tracking-wider mb-4">INFRASTRUCTURE STRESS HEATMAP</h3>
        <div className="space-y-3">
          {riskData.sort((a, b) => b.riskScore - a.riskScore).map((item, i) => (
            <div key={item.locationId}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">{item.locationName}</span>
                <span className={`font-medium ${
                  item.riskScore >= 90 ? 'text-destructive' :
                  item.riskScore >= 60 ? 'text-warning' : 'text-success'
                }`}>{item.riskScore}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(item.riskScore, 100)}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`h-full rounded-full ${
                    item.riskScore >= 90 ? 'bg-gradient-to-r from-destructive/80 to-destructive' :
                    item.riskScore >= 60 ? 'bg-gradient-to-r from-warning/80 to-warning' :
                    'bg-gradient-to-r from-success/80 to-success'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
