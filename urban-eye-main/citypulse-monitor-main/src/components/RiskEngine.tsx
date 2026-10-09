import React from 'react';
import { RiskData } from '@/types/city';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Clock } from 'lucide-react';

interface RiskEngineProps {
  data: RiskData[];
}

const RiskEngine: React.FC<RiskEngineProps> = ({ data }) => {
  const sorted = [...data].sort((a, b) => b.riskScore - a.riskScore);

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-destructive';
    if (score >= 60) return 'text-warning';
    return 'text-success';
  };

  const getRiskBg = (score: number) => {
    if (score >= 90) return 'bg-destructive/20';
    if (score >= 60) return 'bg-warning/20';
    return 'bg-success/20';
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">RISK ENGINE</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Risk = Usage% + Trend Increase
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map((item, i) => (
          <motion.div
            key={item.locationId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glow-card rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground">{item.locationName}</h3>
              <span className={`font-display text-lg font-bold ${getRiskColor(item.riskScore)}`}>
                {item.riskScore}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-secondary mb-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(item.riskScore, 100)}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full rounded-full ${
                  item.riskScore >= 90 ? 'bg-destructive' :
                  item.riskScore >= 60 ? 'bg-warning' : 'bg-success'
                }`}
              />
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Usage: {item.usagePercent}%
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Trend: +{item.trendIncrease}%
              </span>
              <span className={`flex items-center gap-1 ${item.predictedOverload !== 'No risk' ? getRiskColor(item.riskScore) : ''}`}>
                <Clock className="w-3 h-3" />
                {item.predictedOverload}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RiskEngine;
