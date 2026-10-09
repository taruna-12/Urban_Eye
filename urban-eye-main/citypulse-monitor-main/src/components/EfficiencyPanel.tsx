import React from 'react';
import { EfficiencyData } from '@/types/city';
import { motion } from 'framer-motion';
import { Zap, Lightbulb } from 'lucide-react';

interface EfficiencyPanelProps {
  data: EfficiencyData[];
}

const EfficiencyPanel: React.FC<EfficiencyPanelProps> = ({ data }) => {
  const sorted = [...data].sort((a, b) => a.efficiency - b.efficiency);
  const avgEfficiency = Math.round(data.reduce((s, d) => s + d.efficiency, 0) / data.length);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">EFFICIENCY SCORE</h2>
        <p className="text-xs text-muted-foreground mt-1">Infrastructure utilization analysis</p>
      </div>

      {/* Overall score */}
      <div className="glow-card rounded-xl p-6 text-center">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${avgEfficiency * 2.64} ${264 - avgEfficiency * 2.64}`}
              strokeDashoffset="66"
              initial={{ strokeDasharray: "0 264" }}
              animate={{ strokeDasharray: `${avgEfficiency * 2.64} ${264 - avgEfficiency * 2.64}` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute font-display text-2xl font-bold text-primary">{avgEfficiency}%</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">City Average</p>
      </div>

      {/* Individual locations */}
      <div className="space-y-2">
        {sorted.map((item, i) => (
          <motion.div
            key={item.locationId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glow-card rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${item.underutilized ? 'text-warning' : 'text-success'}`} />
                <span className="text-sm font-medium text-foreground">{item.locationName}</span>
              </div>
              <span className={`font-display text-sm font-bold ${
                item.efficiency >= 70 ? 'text-success' : item.efficiency >= 40 ? 'text-warning' : 'text-destructive'
              }`}>
                {item.efficiency}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.efficiency}%` }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className={`h-full rounded-full ${
                  item.efficiency >= 70 ? 'bg-success' : item.efficiency >= 40 ? 'bg-warning' : 'bg-destructive'
                }`}
              />
            </div>
            {item.suggestion && (
              <div className="flex items-start gap-1.5 mt-2">
                <Lightbulb className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground">{item.suggestion}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EfficiencyPanel;
