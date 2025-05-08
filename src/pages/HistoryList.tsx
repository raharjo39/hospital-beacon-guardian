
import React, { useState } from 'react';
import { Search, Filter, Calendar, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

interface HistoryEntry {
  id: string;
  itemId: string;
  itemName: string;
  itemType: 'asset' | 'patient';
  eventType: 'movement' | 'statusChange' | 'alert' | 'maintenance';
  description: string;
  fromLocation?: string;
  toLocation?: string;
  fromStatus?: string;
  toStatus?: string;
  timestamp: string;
  recordedBy: string;
}

// Mock data
const mockHistory: HistoryEntry[] = [
  {
    id: 'H001',
    itemId: 'A001',
    itemName: 'Wheelchair #1',
    itemType: 'asset',
    eventType: 'movement',
    description: 'Asset moved between locations',
    fromLocation: 'Room 101',
    toLocation: 'Room 104',
    timestamp: '2025-05-08T09:30:00',
    recordedBy: 'System'
  },
  {
    id: 'H002',
    itemId: 'P002',
    itemName: 'Budi Pratama',
    itemType: 'patient',
    eventType: 'statusChange',
    description: 'Patient status changed',
    fromStatus: 'stable',
    toStatus: 'critical',
    timestamp: '2025-05-08T10:15:00',
    recordedBy: 'Dr. Rahman'
  },
  {
    id: 'H003',
    itemId: 'A002',
    itemName: 'ECG Machine',
    itemType: 'asset',
    eventType: 'maintenance',
    description: 'Scheduled maintenance performed',
    timestamp: '2025-05-08T11:00:00',
    recordedBy: 'Technician Rudi'
  },
  {
    id: 'H004',
    itemId: 'P004',
    itemName: 'Dewi Anggraeni',
    itemType: 'patient',
    eventType: 'alert',
    description: 'Emergency button pressed',
    timestamp: '2025-05-08T11:45:00',
    recordedBy: 'System'
  },
  {
    id: 'H005',
    itemId: 'A001',
    itemName: 'Wheelchair #1',
    itemType: 'asset',
    eventType: 'alert',
    description: 'Asset left hospital perimeter',
    timestamp: '2025-05-08T12:30:00',
    recordedBy: 'System'
  },
  {
    id: 'H006',
    itemId: 'P003',
    itemName: 'Citra Dewi',
    itemType: 'patient',
    eventType: 'movement',
    description: 'Patient moved between locations',
    fromLocation: 'Room 104',
    toLocation: 'X-Ray Room',
    timestamp: '2025-05-08T13:15:00',
    recordedBy: 'Nurse Siti'
  },
  {
    id: 'H007',
    itemId: 'P001',
    itemName: 'Andi Santoso',
    itemType: 'patient',
    eventType: 'statusChange',
    description: 'Patient status changed',
    fromStatus: 'critical',
    toStatus: 'stable',
    timestamp: '2025-05-08T14:00:00',
    recordedBy: 'Dr. Ahmad'
  }
];

const HistoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'asset' or 'patient' or 'all'
  const [eventFilter, setEventFilter] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredHistory = mockHistory.filter(entry => {
    const matchesSearch = 
      entry.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || entry.itemType === typeFilter;
    const matchesEvent = eventFilter === 'all' || entry.eventType === eventFilter;
    
    // Date filtering - filtering by day
    const matchesDate = date 
      ? format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') 
      : true;
    
    return matchesSearch && matchesType && matchesEvent && matchesDate;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (id: string) => {
    toast(`Viewing details for history entry: ${id}`);
  };

  const handleExport = () => {
    toast.success('Exporting history data to CSV...');
  };

  const getEventTypeStyles = (type: HistoryEntry['eventType']) => {
    switch (type) {
      case 'movement':
        return 'bg-blue-100 text-blue-800';
      case 'statusChange':
        return 'bg-purple-100 text-purple-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemTypeStyles = (type: HistoryEntry['itemType']) => {
    switch (type) {
      case 'asset':
        return 'bg-hospital-primary/10 text-hospital-primary';
      case 'patient':
        return 'bg-hospital-secondary/10 text-hospital-secondary';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">History & Logs</h1>
        <p className="text-muted-foreground">View historical tracking data and activity logs.</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, ID, or description..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Item Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Item Type</SelectLabel>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="asset">Assets</SelectItem>
                    <SelectItem value="patient">Patients</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Event Type</SelectLabel>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="movement">Movement</SelectItem>
                    <SelectItem value="statusChange">Status Change</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {/* This is just a placeholder since we don't have the actual Calendar component */}
                  <div className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Select Date</h4>
                      <Input 
                        type="date" 
                        value={date ? format(date, "yyyy-MM-dd") : ""}
                        onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDate(undefined)}
                        >
                          Clear
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => setDate(new Date())}
                        >
                          Today
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredHistory.length} of {mockHistory.length} entries
            </p>
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </Card>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead className="w-[100px]">Item Type</TableHead>
              <TableHead className="w-[150px]">Item ID/Name</TableHead>
              <TableHead className="w-[120px]">Event Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px]">Recorded By</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="font-mono">
                  {format(new Date(entry.timestamp), 'HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Badge className={getItemTypeStyles(entry.itemType)} variant="outline">
                    {entry.itemType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{entry.itemName}</div>
                  <div className="text-xs text-muted-foreground">{entry.itemId}</div>
                </TableCell>
                <TableCell>
                  <Badge className={getEventTypeStyles(entry.eventType)} variant="outline">
                    {entry.eventType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>{entry.description}</div>
                  {entry.fromLocation && entry.toLocation && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {entry.fromLocation} → {entry.toLocation}
                    </div>
                  )}
                  {entry.fromStatus && entry.toStatus && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {entry.fromStatus} → {entry.toStatus}
                    </div>
                  )}
                </TableCell>
                <TableCell>{entry.recordedBy}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(entry.id)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No history records found matching your filters.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HistoryList;
