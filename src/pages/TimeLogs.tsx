
import React, { useState } from 'react';
import { Search, Calendar, Download, Clock, User } from 'lucide-react';
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

interface TimeLogEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  activity: 'check-in' | 'check-out' | 'break-start' | 'break-end' | 'shift-change';
  location: string;
  timestamp: string;
  notes?: string;
}

// Mock data
const mockTimeLogs: TimeLogEntry[] = [
  {
    id: 'TL001',
    employeeId: 'E001',
    employeeName: 'Dr. Ahmad Setiawan',
    department: 'Medical',
    activity: 'check-in',
    location: 'Main Entrance',
    timestamp: '2025-05-08T07:30:00',
    notes: 'Morning shift'
  },
  {
    id: 'TL002',
    employeeId: 'E002',
    employeeName: 'Nurse Siti Nuraini',
    department: 'Nursing',
    activity: 'check-in',
    location: 'Staff Entrance',
    timestamp: '2025-05-08T07:45:00'
  },
  {
    id: 'TL003',
    employeeId: 'E003',
    employeeName: 'Technician Budi',
    department: 'Maintenance',
    activity: 'check-in',
    location: 'Basement Entrance',
    timestamp: '2025-05-08T08:00:00'
  },
  {
    id: 'TL004',
    employeeId: 'E001',
    employeeName: 'Dr. Ahmad Setiawan',
    department: 'Medical',
    activity: 'break-start',
    location: 'Cafeteria',
    timestamp: '2025-05-08T11:30:00'
  },
  {
    id: 'TL005',
    employeeId: 'E001',
    employeeName: 'Dr. Ahmad Setiawan',
    department: 'Medical',
    activity: 'break-end',
    location: 'Cafeteria',
    timestamp: '2025-05-08T12:00:00'
  },
  {
    id: 'TL006',
    employeeId: 'E002',
    employeeName: 'Nurse Siti Nuraini',
    department: 'Nursing',
    activity: 'shift-change',
    location: 'Nurse Station',
    timestamp: '2025-05-08T15:00:00',
    notes: 'Handover to evening shift'
  },
  {
    id: 'TL007',
    employeeId: 'E003',
    employeeName: 'Technician Budi',
    department: 'Maintenance',
    activity: 'check-out',
    location: 'Basement Entrance',
    timestamp: '2025-05-08T16:00:00'
  },
  {
    id: 'TL008',
    employeeId: 'E001',
    employeeName: 'Dr. Ahmad Setiawan',
    department: 'Medical',
    activity: 'check-out',
    location: 'Main Entrance',
    timestamp: '2025-05-08T17:30:00'
  }
];

const TimeLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredLogs = mockTimeLogs.filter(entry => {
    const matchesSearch = 
      entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || entry.department.toLowerCase() === departmentFilter;
    const matchesActivity = activityFilter === 'all' || entry.activity === activityFilter;
    
    // Date filtering - filtering by day
    const matchesDate = date 
      ? format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') 
      : true;
    
    return matchesSearch && matchesDepartment && matchesActivity && matchesDate;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleExport = () => {
    toast.success('Exporting time logs data to CSV...');
  };

  const getActivityTypeStyles = (type: TimeLogEntry['activity']) => {
    switch (type) {
      case 'check-in':
        return 'bg-green-100 text-green-800';
      case 'check-out':
        return 'bg-red-100 text-red-800';
      case 'break-start':
        return 'bg-amber-100 text-amber-800';
      case 'break-end':
        return 'bg-blue-100 text-blue-800';
      case 'shift-change':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentStyles = (department: string) => {
    switch (department.toLowerCase()) {
      case 'medical':
        return 'bg-hospital-primary/10 text-hospital-primary';
      case 'nursing':
        return 'bg-hospital-secondary/10 text-hospital-secondary';
      case 'maintenance':
        return 'bg-amber-500/10 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Time Logs</h1>
        <p className="text-muted-foreground">Track staff check-ins, check-outs and activities.</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, ID, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="nursing">Nursing</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={activityFilter} onValueChange={setActivityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Activity Type</SelectLabel>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="check-in">Check In</SelectItem>
                    <SelectItem value="check-out">Check Out</SelectItem>
                    <SelectItem value="break-start">Break Start</SelectItem>
                    <SelectItem value="break-end">Break End</SelectItem>
                    <SelectItem value="shift-change">Shift Change</SelectItem>
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
              Showing {filteredLogs.length} of {mockTimeLogs.length} entries
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
              <TableHead className="w-[120px]">Department</TableHead>
              <TableHead className="w-[200px]">Staff Member</TableHead>
              <TableHead className="w-[120px]">Activity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="font-mono">
                  {format(new Date(entry.timestamp), 'HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Badge className={getDepartmentStyles(entry.department)} variant="outline">
                    {entry.department}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium">{entry.employeeName}</div>
                      <div className="text-xs text-muted-foreground">{entry.employeeId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getActivityTypeStyles(entry.activity)} variant="outline">
                    {entry.activity.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {entry.location}
                  </div>
                </TableCell>
                <TableCell>{entry.notes || '—'}</TableCell>
              </TableRow>
            ))}
            
            {filteredLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No time log records found matching your filters.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TimeLogs;
