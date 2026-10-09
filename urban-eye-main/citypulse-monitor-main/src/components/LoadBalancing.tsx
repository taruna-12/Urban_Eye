import React from 'react';
import { LoadBalancingRec } from '@/types/city';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Route, Shuffle } from 'lucide-react';

interface LoadBalancingProps {
  recommendations: LoadBalancingRec[];
}

const iconMap = {
  parking: Car,
  route: Route,
  redistribution: Shuffle,
};

const LoadBalancing: React.FC<LoadBalancingProps> = ({ recommendations }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">LOAD BALANCING</h2>
        <p className="text-xs text-muted-foreground mt-1">Smart redistribution recommendations</p>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const Icon = iconMap[rec.type];
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="glow-card rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                  {rec.type} optimization
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-destructive">{rec.from}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-success">{rec.to}</span>
              </div>

              <p className="text-xs text-muted-foreground mb-2">{rec.reason}</p>
              <div className="bg-primary/10 rounded-md px-2 py-1 inline-block">
                <span className="text-[11px] text-primary font-medium">{rec.savings}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadBalancing;
