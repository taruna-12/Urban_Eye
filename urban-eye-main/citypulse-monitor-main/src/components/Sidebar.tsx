import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Map, AlertTriangle, BarChart3, Shield, Search,
  Settings, Users, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'City Map', icon: Map },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'risk', label: 'Risk Engine', icon: BarChart3 },
  { id: 'efficiency', label: 'Efficiency', icon: Zap },
  { id: 'spaces', label: 'Free Spaces', icon: Search },
];

const officialItems = [
  { id: 'control', label: 'Control Panel', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { role, setRole, userName } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const allItems = role === 'official' ? [...navItems, ...officialItems] : navItems;

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen flex flex-col border-r border-border bg-card/50 backdrop-blur-xl overflow-hidden flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <h1 className="font-display text-sm font-bold text-primary glow-text tracking-wider">CITYCORE</h1>
            <p className="text-[10px] text-muted-foreground">Smart Infrastructure</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {allItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary/15 text-primary glow-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Role toggle */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => setRole(role === 'official' ? 'citizen' : 'official')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <Users className="w-5 h-5 text-primary flex-shrink-0" />
          {!collapsed && (
            <div className="text-left overflow-hidden">
              <p className="text-xs font-medium text-foreground truncate">{userName}</p>
              <p className="text-[10px] text-muted-foreground">Switch role</p>
            </div>
          )}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center mt-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
