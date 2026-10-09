import React, { useState } from 'react';
import { Alert, IncidentType, EventType } from '@/types/city';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';

interface OfficialPanelProps {
  onAddAlert: (alert: Alert) => void;
}

const OfficialPanel: React.FC<OfficialPanelProps> = ({ onAddAlert }) => {
  const [mode, setMode] = useState<'incident' | 'event'>('incident');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subType, setSubType] = useState<string>('accident');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [lat, setLat] = useState('40.713');
  const [lng, setLng] = useState('-74.006');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      type: mode,
      subType: subType as IncidentType | EventType,
      title: title.trim(),
      description: description.trim(),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      severity,
      timestamp: new Date(),
      active: true,
    };

    onAddAlert(newAlert);
    toast.success(`${mode === 'incident' ? 'Incident' : 'Event'} reported successfully`);
    setTitle('');
    setDescription('');
  };

  const incidentTypes: IncidentType[] = ['accident', 'construction', 'congestion', 'failure'];
  const eventTypes: EventType[] = ['fair', 'stall', 'local-event', 'community'];

  const inputClass = "w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30";
  const labelClass = "text-xs text-muted-foreground mb-1 block";

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">CONTROL PANEL</h2>
        <p className="text-xs text-muted-foreground mt-1">Add incidents, events & infrastructure updates</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode('incident'); setSubType('accident'); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'incident'
              ? 'bg-destructive/20 text-destructive border border-destructive/30'
              : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Incident
        </button>
        <button
          onClick={() => { setMode('event'); setSubType('fair'); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'event'
              ? 'bg-warning/20 text-warning border border-warning/30'
              : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <PartyPopper className="w-4 h-4" /> Event
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={labelClass}>Title</label>
          <input
            className={inputClass}
            placeholder={mode === 'incident' ? 'e.g., Road closure on 5th Ave' : 'e.g., Weekend Art Festival'}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={`${inputClass} resize-none h-20`}
            placeholder="Details..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Type</label>
          <select
            className={inputClass}
            value={subType}
            onChange={e => setSubType(e.target.value)}
          >
            {(mode === 'incident' ? incidentTypes : eventTypes).map(t => (
              <option key={t} value={t}>{t.replace('-', ' ')}</option>
            ))}
          </select>
        </div>

        {mode === 'incident' && (
          <div>
            <label className={labelClass}>Severity</label>
            <select className={inputClass} value={severity} onChange={e => setSeverity(e.target.value as any)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelClass}>Latitude</label>
            <input className={inputClass} type="number" step="0.001" value={lat} onChange={e => setLat(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input className={inputClass} type="number" step="0.001" value={lng} onChange={e => setLng(e.target.value)} />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          Report {mode === 'incident' ? 'Incident' : 'Event'}
        </motion.button>
      </form>
    </div>
  );
};

export default OfficialPanel;
