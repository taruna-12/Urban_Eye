import React, { useState } from 'react';
import { CityLocation } from '@/types/city';
import { motion } from 'framer-motion';
import { Search, MapPin, Users } from 'lucide-react';

interface FreeSpaceFinderProps {
  locations: CityLocation[];
}

const FreeSpaceFinder: React.FC<FreeSpaceFinderProps> = ({ locations }) => {
  const [minCapacity, setMinCapacity] = useState(50);
  const freeSpaces = locations.filter(
    l => l.type === 'free-space' && l.capacity && l.currentUsage !== undefined &&
      (l.capacity - l.currentUsage) >= minCapacity
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">FREE SPACES</h2>
        <p className="text-xs text-muted-foreground mt-1">Find available spaces for events</p>
      </div>

      <div className="glow-card rounded-lg p-3">
        <label className="text-xs text-muted-foreground mb-2 block">Minimum available capacity</label>
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-primary" />
          <input
            type="range"
            min={10}
            max={300}
            value={minCapacity}
            onChange={e => setMinCapacity(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="font-display text-sm text-primary font-bold w-12 text-right">{minCapacity}</span>
        </div>
      </div>

      <div className="space-y-2">
        {freeSpaces.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No spaces found with {minCapacity}+ available capacity
          </div>
        ) : (
          freeSpaces.map((space, i) => {
            const available = (space.capacity || 0) - (space.currentUsage || 0);
            return (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glow-card rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-success" />
                    <span className="text-sm font-semibold text-foreground">{space.name}</span>
                  </div>
                  <span className="font-display text-lg font-bold text-success">{available}</span>
                </div>
                <p className="text-xs text-muted-foreground">{space.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Total: {space.capacity}
                  </span>
                  <span>In use: {space.currentUsage}</span>
                  <span className="text-success">Available: {available}</span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FreeSpaceFinder;
