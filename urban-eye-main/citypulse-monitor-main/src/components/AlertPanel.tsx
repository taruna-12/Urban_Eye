import React from 'react';
import { Alert } from '@/types/city';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, PartyPopper, Clock, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AlertPanelProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onDismiss }) => {
  const activeAlerts = alerts.filter(a => a.active);
  const incidents = activeAlerts.filter(a => a.type === 'incident');
  const events = activeAlerts.filter(a => a.type === 'event');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">ALERTS</h2>
        <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full">
          {incidents.length} incidents
        </span>
      </div>

      {/* Incidents */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-3 h-3" /> Infrastructure Incidents
        </h3>
        <AnimatePresence>
          {incidents.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glow-card rounded-lg p-3 border-l-2 border-l-destructive"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                      alert.severity === 'critical' ? 'bg-destructive/20 text-destructive' :
                      alert.severity === 'high' ? 'bg-destructive/15 text-destructive' :
                      'bg-warning/15 text-warning'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                {onDismiss && (
                  <button onClick={() => onDismiss(alert.id)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Events */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-warning uppercase tracking-wider flex items-center gap-2">
          <PartyPopper className="w-3 h-3" /> Community Events
        </h3>
        <AnimatePresence>
          {events.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glow-card rounded-lg p-3 border-l-2 border-l-warning"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </span>
                </div>
                {onDismiss && (
                  <button onClick={() => onDismiss(alert.id)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlertPanel;
