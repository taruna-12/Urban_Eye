import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CityLocation, Alert } from '@/types/city';

interface CityMapProps {
  locations: CityLocation[];
  alerts: Alert[];
  onLocationClick?: (location: CityLocation) => void;
}

const markerColors: Record<string, string> = {
  house: '#00E5FF',
  'free-space': '#4CAF50',
  marketplace: '#FF9800',
  parking: '#9C27B0',
  road: '#607D8B',
};

const createIcon = (color: string, size: number = 12) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};box-shadow:0 0 10px ${color}80,0 0 20px ${color}40;border:2px solid ${color}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const createAlertIcon = (type: 'incident' | 'event') => {
  const color = type === 'incident' ? '#ff4444' : '#ffbb33';
  const animClass = type === 'incident' ? 'blink-red' : 'blink-yellow';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="${animClass}" style="width:18px;height:18px;border-radius:50%;background:${color};border:2px solid ${color}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

const CityMap: React.FC<CityMapProps> = ({ locations, alerts, onLocationClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [40.7128, -74.006],
      zoom: 14,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Add location markers
    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(markerColors[loc.type] || '#00E5FF'),
      }).addTo(map);

      const usageInfo = loc.capacity
        ? `<br/><span style="color:#00E5FF">Usage: ${loc.currentUsage}/${loc.capacity}</span>`
        : '';

      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:13px">
          <strong style="font-family:Orbitron,sans-serif;font-size:11px;letter-spacing:1px">${loc.name}</strong>
          <br/><span style="color:#8899aa;text-transform:uppercase;font-size:10px">${loc.type.replace('-', ' ')}</span>
          ${loc.description ? `<br/>${loc.description}` : ''}
          ${usageInfo}
        </div>
      `);

      if (onLocationClick) {
        marker.on('click', () => onLocationClick(loc));
      }
    });

    // Add alert markers
    alerts.filter(a => a.active).forEach((alert) => {
      const marker = L.marker([alert.lat, alert.lng], {
        icon: createAlertIcon(alert.type),
      }).addTo(map);

      const color = alert.type === 'incident' ? '#ff4444' : '#ffbb33';
      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:13px">
          <strong style="font-family:Orbitron,sans-serif;font-size:11px;color:${color};letter-spacing:1px">${alert.title}</strong>
          <br/><span style="color:#8899aa">${alert.description}</span>
          <br/><span style="color:${color};font-size:10px;text-transform:uppercase">${alert.severity} severity</span>
        </div>
      `);
    });
  }, [locations, alerts, onLocationClick]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden glow-border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default CityMap;
