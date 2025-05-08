
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';

export interface Patient {
  id: string;
  name: string;
  room: string;
  floor: number;
  status: 'stable' | 'critical' | 'emergency' | 'discharged';
  type: 'inpatient' | 'emergency' | 'outpatient';
  lastUpdated: string;
  assignedTo: string;
}

interface PatientCardProps {
  patient: Patient;
  onLocateClick: (id: string) => void;
  onViewHistoryClick: (id: string) => void;
}

export const PatientCard = ({ patient, onLocateClick, onViewHistoryClick }: PatientCardProps) => {
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'critical':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'emergency':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'discharged':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getTypeColor = (type: Patient['type']) => {
    switch (type) {
      case 'inpatient':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'emergency':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'outpatient':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-semibold text-base">{patient.name}</h3>
          <div className="flex gap-2 mt-1">
            <Badge className={getTypeColor(patient.type)} variant="outline">
              {patient.type}
            </Badge>
          </div>
        </div>
        <Badge className={getStatusColor(patient.status)} variant="outline">
          {patient.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center text-sm">
          <span className="font-medium min-w-24">Location:</span>
          <span>{patient.room} (Floor {patient.floor})</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Updated {patient.lastUpdated}</span>
        </div>
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Assigned to: {patient.assignedTo}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="text-hospital-primary border-hospital-primary hover:bg-hospital-primary/10 w-full"
          onClick={() => onLocateClick(patient.id)}
        >
          Locate
        </Button>
        <Button 
          variant="outline" 
          className="text-hospital-secondary border-hospital-secondary hover:bg-hospital-secondary/10 w-full" 
          onClick={() => onViewHistoryClick(patient.id)}
        >
          History
        </Button>
      </CardFooter>
    </Card>
  );
};
