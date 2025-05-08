
import React, { useState } from 'react';
import { Search, Clock, User, MapPin, X, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'geofence' | 'emergency' | 'maintenance' | 'system';
  status: 'new' | 'acknowledged' | 'resolved';
  location: string;
  floor: number;
  timestamp: string;
  assignedTo?: string;
}

// Mock data
const mockAlerts: Alert[] = [
  {
    id: 'AL001',
    title: 'Emergency Button Pressed',
    message: 'Patient P004 pressed emergency button in Room 105',
    type: 'emergency',
    status: 'new',
    location: 'Room 105',
    floor: 1,
    timestamp: '2 minutes ago',
    assignedTo: 'Dr. Fatimah'
  },
  {
    id: 'AL002',
    title: 'Asset Left Geofence',
    message: 'Wheelchair A001 has left hospital perimeter',
    type: 'geofence',
    status: 'new',
    location: 'Hospital Exit (East)',
    floor: 1,
    timestamp: '10 minutes ago'
  },
  {
    id: 'AL003',
    title: 'Patient Left Geofence',
    message: 'Patient P008 has left designated area',
    type: 'geofence',
    status: 'acknowledged',
    location: 'Main Hallway',
    floor: 1,
    timestamp: '15 minutes ago',
    assignedTo: 'Nurse Siti'
  },
  {
    id: 'AL004',
    title: 'Equipment Maintenance Required',
    message: 'ECG Machine A002 requires scheduled maintenance',
    type: 'maintenance',
    status: 'acknowledged',
    location: 'Emergency Room',
    floor: 1,
    timestamp: '1 hour ago'
  },
  {
    id: 'AL005',
    title: 'System Connection Issue',
    message: 'Beacon on Floor 2 is not responding',
    type: 'system',
    status: 'resolved',
    location: 'Floor 2, West Wing',
    floor: 2,
    timestamp: '3 hours ago'
  },
  {
    id: 'AL006',
    title: 'Emergency Button Pressed',
    message: 'Patient P002 pressed emergency button in Emergency Room',
    type: 'emergency',
    status: 'resolved',
    location: 'Emergency Room',
    floor: 1,
    timestamp: '5 hours ago',
    assignedTo: 'Dr. Rahman'
  }
];

const AlertList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAcknowledge = (id: string) => {
    toast.success(`Alert ${id} acknowledged`);
  };

  const handleResolve = (id: string) => {
    toast.success(`Alert ${id} resolved`);
  };

  const handleLocate = (alert: Alert) => {
    toast(`Locating alert at ${alert.location} (Floor ${alert.floor})`);
  };

  const getAlertTypeStyles = (type: Alert['type']) => {
    switch (type) {
      case 'emergency':
        return {
          bg: 'bg-hospital-alert/10',
          border: 'border-hospital-alert',
          text: 'text-hospital-alert',
          badge: 'bg-hospital-alert'
        };
      case 'geofence':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500',
          text: 'text-amber-500',
          badge: 'bg-amber-500'
        };
      case 'maintenance':
        return {
          bg: 'bg-hospital-primary/10',
          border: 'border-hospital-primary',
          text: 'text-hospital-primary',
          badge: 'bg-hospital-primary'
        };
      case 'system':
        return {
          bg: 'bg-hospital-gray/10',
          border: 'border-hospital-gray',
          text: 'text-hospital-gray',
          badge: 'bg-hospital-gray'
        };
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-300',
          text: 'text-gray-700',
          badge: 'bg-gray-500'
        };
    }
  };

  const getAlertStatusStyles = (status: Alert['status']) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-amber-100 text-amber-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Alert Management</h1>
        <p className="text-muted-foreground">View and respond to all system alerts.</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search alerts..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="acknowledged">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredAlerts.length} of {mockAlerts.length} alerts
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map(alert => {
          const styles = getAlertTypeStyles(alert.type);
          
          return (
            <Card 
              key={alert.id} 
              className={`border-l-4 ${styles.border} overflow-hidden`}
            >
              <CardHeader className="p-4 flex flex-row items-start justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium ${styles.text}`}>{alert.title}</h3>
                    <Badge className={getAlertStatusStyles(alert.status)} variant="outline">
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">{alert.message}</p>
                </div>
                <Badge className={`${styles.badge} text-white`} variant="default">
                  {alert.type}
                </Badge>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{alert.location} (Floor {alert.floor})</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{alert.timestamp}</span>
                    </div>
                    {alert.assignedTo && (
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Assigned to: {alert.assignedTo}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 justify-end">
                    <Button 
                      variant="outline" 
                      className="text-hospital-primary border-hospital-primary hover:bg-hospital-primary/10"
                      onClick={() => handleLocate(alert)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Locate
                    </Button>
                    
                    {alert.status === 'new' && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                    )}
                    
                    {(alert.status === 'new' || alert.status === 'acknowledged') && (
                      <Button 
                        variant="default" 
                        className="bg-hospital-secondary hover:bg-hospital-tertiary"
                        onClick={() => handleResolve(alert.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {filteredAlerts.length === 0 && (
          <div className="p-8 text-center bg-white rounded-lg border">
            <p className="text-muted-foreground">No alerts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertList;
