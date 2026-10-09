import React, { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import CityMap from '@/components/CityMap';
import AlertPanel from '@/components/AlertPanel';
import RiskEngine from '@/components/RiskEngine';
import EfficiencyPanel from '@/components/EfficiencyPanel';
import LoadBalancing from '@/components/LoadBalancing';
import FreeSpaceFinder from '@/components/FreeSpaceFinder';
import OfficialPanel from '@/components/OfficialPanel';
import DashboardOverview from '@/components/DashboardOverview';
import { useAuth } from '@/context/AuthContext';
import { Alert } from '@/types/city';
import {
  cityLocations,
  initialAlerts,
  riskData,
  efficiencyData,
  loadBalancingRecs,
} from '@/data/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const { role } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const handleAddAlert = useCallback((alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
  }, []);

  const handleDismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: false } : a));
  }, []);

  const renderSidePanel = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview alerts={alerts} riskData={riskData} efficiencyData={efficiencyData} />;
      case 'alerts':
        return <AlertPanel alerts={alerts} onDismiss={role === 'official' ? handleDismissAlert : undefined} />;
      case 'risk':
        return <RiskEngine data={riskData} />;
      case 'efficiency':
        return (
          <div className="space-y-6">
            <EfficiencyPanel data={efficiencyData} />
            <LoadBalancing recommendations={loadBalancingRecs} />
          </div>
        );
      case 'spaces':
        return <FreeSpaceFinder locations={cityLocations} />;
      case 'control':
        return role === 'official' ? <OfficialPanel onAddAlert={handleAddAlert} /> : null;
      default:
        return null;
    }
  };

  const showMap = activeView === 'map';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {showMap ? (
        /* Full map view */
        <div className="flex-1 flex">
          <div className="flex-1 p-4">
            <CityMap locations={cityLocations} alerts={alerts} />
          </div>
          <div className="w-80 border-l border-border">
            <ScrollArea className="h-screen">
              <div className="p-4">
                <AlertPanel alerts={alerts} onDismiss={role === 'official' ? handleDismissAlert : undefined} />
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        /* Dashboard views with embedded map */
        <div className="flex-1 flex">
          <div className="flex-1 p-4 flex flex-col gap-4">
            {/* Top: Map */}
            <div className="h-[45%] min-h-[250px]">
              <CityMap locations={cityLocations} alerts={alerts} />
            </div>
            {/* Bottom: Panel content */}
            <ScrollArea className="flex-1">
              <div className="pr-4">
                {renderSidePanel()}
              </div>
            </ScrollArea>
          </div>

          {/* Right sidebar: Alerts always visible */}
          <div className="w-72 border-l border-border hidden lg:block">
            <ScrollArea className="h-screen">
              <div className="p-4">
                <AlertPanel alerts={alerts} onDismiss={role === 'official' ? handleDismissAlert : undefined} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
