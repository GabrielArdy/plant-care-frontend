'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center">
    {icon && <div className="mb-1">{icon}</div>}
    <div className="text-xl font-semibold">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

interface ProfileStatsProps {
  stats: {
    scans: number;
    detections: number;
    plants: number;
  };
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <Card className="p-4">
      <div className="flex justify-around">
        <StatItem label="Scans" value={stats.scans} />
        <StatItem label="Detections" value={stats.detections} />
        <StatItem label="Plants" value={stats.plants} />
      </div>
    </Card>
  );
};
