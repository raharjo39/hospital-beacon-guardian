
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PatientCard, Patient } from '@/components/dashboard/PatientCard';
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

// Mock data
const mockPatients: Patient[] = [
  { 
    id: 'P001', 
    name: 'Andi Santoso', 
    room: 'Room 101', 
    floor: 1, 
    status: 'stable', 
    type: 'inpatient', 
    lastUpdated: '15 minutes ago', 
    assignedTo: 'Dr. Ahmad' 
  },
  { 
    id: 'P002', 
    name: 'Budi Pratama', 
    room: 'Emergency Room', 
    floor: 1, 
    status: 'critical', 
    type: 'emergency', 
    lastUpdated: '2 minutes ago', 
    assignedTo: 'Dr. Rahman' 
  },
  { 
    id: 'P003', 
    name: 'Citra Dewi', 
    room: 'Room 104', 
    floor: 1, 
    status: 'stable', 
    type: 'inpatient', 
    lastUpdated: '45 minutes ago', 
    assignedTo: 'Nurse Siti' 
  },
  { 
    id: 'P004', 
    name: 'Dewi Anggraeni', 
    room: 'Room 105', 
    floor: 1, 
    status: 'emergency', 
    type: 'inpatient', 
    lastUpdated: '1 minute ago', 
    assignedTo: 'Dr. Fatimah' 
  },
  { 
    id: 'P005', 
    name: 'Eko Prasetyo', 
    room: 'Room 201', 
    floor: 2, 
    status: 'stable', 
    type: 'inpatient', 
    lastUpdated: '30 minutes ago', 
    assignedTo: 'Dr. Ahmad' 
  },
  { 
    id: 'P006', 
    name: 'Fajar Nugroho', 
    room: 'Room 202', 
    floor: 2, 
    status: 'discharged', 
    type: 'outpatient', 
    lastUpdated: '1 hour ago', 
    assignedTo: 'Nurse Siti' 
  },
  { 
    id: 'P007', 
    name: 'Gita Indah', 
    room: 'Room 203', 
    floor: 2, 
    status: 'stable', 
    type: 'inpatient', 
    lastUpdated: '20 minutes ago', 
    assignedTo: 'Dr. Rahman' 
  },
  { 
    id: 'P008', 
    name: 'Hadi Santoso', 
    room: 'Emergency Room', 
    floor: 1, 
    status: 'critical', 
    type: 'emergency', 
    lastUpdated: '5 minutes ago', 
    assignedTo: 'Dr. Fatimah' 
  }
];

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          patient.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesFloor = floorFilter === 'all' || patient.floor.toString() === floorFilter;
    const matchesType = typeFilter === 'all' || patient.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesFloor && matchesType;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocatePatient = (id: string) => {
    toast(`Locating patient: ${id}`);
  };

  const handleViewPatientHistory = (id: string) => {
    toast(`Viewing history for patient ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Patient Tracking</h1>
        <p className="text-muted-foreground">Monitor and track all patients in real-time.</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={floorFilter} onValueChange={setFloorFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Floor</SelectLabel>
                    <SelectItem value="all">All Floors</SelectItem>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                    <SelectItem value="4">Floor 4</SelectItem>
                    <SelectItem value="5">Floor 5</SelectItem>
                    <SelectItem value="6">Floor 6</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="inpatient">Inpatient</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="outpatient">Outpatient</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPatients.length} of {mockPatients.length} patients
            </p>
            <Button variant="outline" className="text-xs gap-1">
              <Filter className="h-3 w-3" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPatients.map(patient => (
          <PatientCard 
            key={patient.id}
            patient={patient}
            onLocateClick={handleLocatePatient}
            onViewHistoryClick={handleViewPatientHistory}
          />
        ))}
        
        {filteredPatients.length === 0 && (
          <div className="col-span-full p-8 text-center">
            <p className="text-muted-foreground">No patients found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
