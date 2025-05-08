
import React from 'react';
import { Alert, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatusSummaryProps {
  assetCount: number;
  patientCount: number;
  alertCount: number;
  emergencyCount: number;
}

export const StatusSummary = ({ assetCount, patientCount, alertCount, emergencyCount }: StatusSummaryProps) => {
  const summaryItems = [
    {
      title: 'Tracked Assets',
      value: assetCount,
      icon: CheckCircle,
      color: 'text-hospital-primary',
      bgColor: 'bg-hospital-primary/10',
    },
    {
      title: 'Tracked Patients',
      value: patientCount,
      icon: CheckCircle,
      color: 'text-hospital-secondary',
      bgColor: 'bg-hospital-secondary/10',
    },
    {
      title: 'Active Alerts',
      value: alertCount,
      icon: AlertTriangle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Emergencies',
      value: emergencyCount,
      icon: AlertCircle,
      color: 'text-hospital-alert',
      bgColor: 'bg-hospital-alert/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className={`rounded-full p-3 ${item.bgColor}`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold">{item.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
