
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Clock, User, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Asset } from './AssetCard';
import { Patient } from './PatientCard';

interface DetailPanelProps {
  item: Asset | Patient | null;
  onClose: () => void;
  type: 'asset' | 'patient' | null;
}

export const DetailPanel = ({ item, onClose, type }: DetailPanelProps) => {
  if (!item) return null;

  // Check if it's a patient (has the 'name' property)
  const isPatient = 'name' in item && type === 'patient';
  const isAsset = !isPatient && type === 'asset';

  const renderTimelineItem = (time: string, event: string) => (
    <div className="relative pl-6">
      <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary"></div>
      <div className="text-xs text-muted-foreground mb-1">{time}</div>
      <div className="text-sm mb-4">{event}</div>
    </div>
  );

  return (
    <Card className="border-l-4 border-l-hospital-secondary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>
            {isPatient ? (item as Patient).name : (item as Asset).name}
          </CardTitle>
          <CardDescription>
            {isPatient ? `Patient ID: ${item.id}` : `Asset ID: ${item.id}`}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {isPatient
                  ? `${(item as Patient).room} (Floor ${(item as Patient).floor})`
                  : `${(item as Asset).location} (Floor ${(item as Asset).floor})`}
              </span>
            </div>
            <Badge
              className={
                isPatient
                  ? (item as Patient).status === 'stable'
                    ? 'bg-green-100 text-green-800'
                    : (item as Patient).status === 'critical'
                    ? 'bg-amber-100 text-amber-800'
                    : (item as Patient).status === 'emergency'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                  : (item as Asset).status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : (item as Asset).status === 'inactive'
                  ? 'bg-gray-100 text-gray-800'
                  : (item as Asset).status === 'maintenance'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }
              variant="outline"
            >
              {isPatient ? (item as Patient).status : (item as Asset).status}
            </Badge>
          </div>
          
          <div className="flex items-center">
            <User className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm">
              {isPatient
                ? `Assigned to: ${(item as Patient).assignedTo}`
                : `PIC: ${(item as Asset).pic}`}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm">Updated {item.lastUpdated}</span>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Recent Activity</h4>
            <div className="border-l ml-1 pl-4">
              {renderTimelineItem('Today, 10:23 AM', 'Moved from Room 103 to Room 105')}
              {renderTimelineItem('Today, 9:45 AM', 'Status updated to active')}
              {renderTimelineItem('Today, 8:30 AM', 'Daily check completed')}
              {renderTimelineItem('Yesterday, 4:15 PM', 'Maintenance completed')}
            </div>
          </div>
          
          <div className="flex pt-2 space-x-2">
            <Button className="flex-1 bg-hospital-secondary hover:bg-hospital-tertiary">
              {isPatient ? 'Contact Caregiver' : 'Contact PIC'}
            </Button>
            <Button variant="outline" className="flex-1">
              View Full History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
