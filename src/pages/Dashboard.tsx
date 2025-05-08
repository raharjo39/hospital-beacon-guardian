
import React, { useState } from 'react';
import { StatusSummary } from '@/components/dashboard/StatusSummary';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { FloorPlan, Marker } from '@/components/dashboard/FloorPlan';
import { AssetCard, Asset } from '@/components/dashboard/AssetCard';
import { PatientCard, Patient } from '@/components/dashboard/PatientCard';
import { DetailPanel } from '@/components/dashboard/DetailPanel';
import { toast } from 'sonner';

// Mock data
const mockAssets: Asset[] = [
  { 
    id: 'A001', 
    name: 'Wheelchair #1', 
    type: 'Mobility Equipment', 
    location: 'Room 101', 
    floor: 1, 
    status: 'active', 
    lastUpdated: '10 minutes ago', 
    pic: 'Dr. Ahmad' 
  },
  { 
    id: 'A002', 
    name: 'ECG Machine', 
    type: 'Medical Equipment', 
    location: 'Emergency Room', 
    floor: 1, 
    status: 'maintenance', 
    lastUpdated: '1 hour ago', 
    pic: 'Nurse Siti' 
  },
  { 
    id: 'A003', 
    name: 'Infusion Pump', 
    type: 'Medical Equipment', 
    location: 'Room 102', 
    floor: 1, 
    status: 'active', 
    lastUpdated: '30 minutes ago', 
    pic: 'Dr. Rahman' 
  },
  { 
    id: 'A004', 
    name: 'Mobile X-Ray', 
    type: 'Diagnostic Equipment', 
    location: 'Nurses Station', 
    floor: 1, 
    status: 'inactive', 
    lastUpdated: '2 hours ago', 
    pic: 'Dr. Fatimah' 
  },
  { 
    id: 'A005', 
    name: 'Ventilator #3', 
    type: 'Medical Equipment', 
    location: 'Room 105', 
    floor: 1, 
    status: 'alert', 
    lastUpdated: '5 minutes ago', 
    pic: 'Dr. Ismail' 
  }
];

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
  }
];

// Generate floor plan markers from our data
const generateMarkers = (assets: Asset[], patients: Patient[]): Marker[] => {
  const markers: Marker[] = [];
  
  // Add asset markers
  assets.forEach(asset => {
    // Generate pseudo-random position based on asset ID for demo
    const hash = asset.id.charCodeAt(0) + asset.id.charCodeAt(asset.id.length - 1);
    const x = 10 + (hash % 80); // Keep within 10-90% range
    const y = 15 + ((hash * 3) % 70);
    
    markers.push({
      id: asset.id,
      type: asset.status === 'alert' ? 'emergency' : 'asset',
      position: { x, y },
      label: asset.name,
      details: `${asset.type}, ${asset.location}`
    });
  });
  
  // Add patient markers
  patients.forEach(patient => {
    // Generate pseudo-random position based on patient ID for demo
    const hash = patient.id.charCodeAt(0) + patient.id.charCodeAt(patient.id.length - 1);
    const x = 15 + (hash % 70);
    const y = 20 + ((hash * 2) % 60);
    
    markers.push({
      id: patient.id,
      type: patient.status === 'emergency' ? 'emergency' : 'patient',
      position: { x, y },
      label: patient.name,
      details: `${patient.type}, ${patient.room}`
    });
  });
  
  return markers;
};

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const [currentFloor, setCurrentFloor] = useState(1);
  const [filters, setFilters] = useState({});
  const [selectedItem, setSelectedItem] = useState<Asset | Patient | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'asset' | 'patient' | null>(null);
  
  const markers = generateMarkers(
    mockAssets.filter(a => a.floor === currentFloor),
    mockPatients.filter(p => p.floor === currentFloor)
  );

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    console.log('Filters updated:', { ...filters, ...newFilters });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
  };

  const handleMarkerClick = (marker: Marker) => {
    // Find if this marker is an asset or patient
    const asset = mockAssets.find(a => a.id === marker.id);
    const patient = mockPatients.find(p => p.id === marker.id);
    
    if (asset) {
      setSelectedItem(asset);
      setSelectedItemType('asset');
      toast(`Selected asset: ${asset.name}`);
    } else if (patient) {
      setSelectedItem(patient);
      setSelectedItemType('patient');
      toast(`Selected patient: ${patient.name}`);
    }
  };

  const handleLocateAsset = (id: string) => {
    const asset = mockAssets.find(a => a.id === id);
    if (asset) {
      setCurrentFloor(asset.floor);
      setSelectedItem(asset);
      setSelectedItemType('asset');
      toast(`Locating asset: ${asset.name}`);
    }
  };

  const handleLocatePatient = (id: string) => {
    const patient = mockPatients.find(p => p.id === id);
    if (patient) {
      setCurrentFloor(patient.floor);
      setSelectedItem(patient);
      setSelectedItemType('patient');
      toast(`Locating patient: ${patient.name}`);
    }
  };

  const handleViewAssetHistory = (id: string) => {
    toast(`Viewing history for asset ID: ${id}`);
  };

  const handleViewPatientHistory = (id: string) => {
    toast(`Viewing history for patient ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor hospital assets and patients in real-time.</p>
      </div>

      <StatusSummary 
        assetCount={mockAssets.length}
        patientCount={mockPatients.length}
        alertCount={mockAssets.filter(a => a.status === 'alert').length}
        emergencyCount={mockPatients.filter(p => p.status === 'emergency').length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FilterBar 
            onFilterChange={handleFilterChange}
            onTabChange={handleTabChange}
            currentTab={currentTab}
          />

          <div className="bg-white rounded-lg overflow-hidden shadow-sm border h-[500px]">
            <FloorPlan 
              markers={markers}
              onMarkerClick={handleMarkerClick}
              currentFloor={currentFloor}
              totalFloors={6}
              onFloorChange={handleFloorChange}
            />
          </div>
        </div>

        <div className="space-y-6">
          {selectedItem ? (
            <DetailPanel 
              item={selectedItem}
              type={selectedItemType}
              onClose={() => {
                setSelectedItem(null);
                setSelectedItemType(null);
              }}
            />
          ) : (
            <div className="bg-muted/50 rounded-lg p-8 text-center flex items-center justify-center h-full">
              <div className="max-w-xs">
                <h3 className="font-medium mb-2">No item selected</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a marker on the floor plan or select an item from the list to see details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(currentTab === 'assets' || currentTab === 'all') && mockAssets.slice(0, 3).map(asset => (
            <AssetCard 
              key={asset.id}
              asset={asset}
              onLocateClick={handleLocateAsset}
              onViewHistoryClick={handleViewAssetHistory}
            />
          ))}
          
          {(currentTab === 'patients' || currentTab === 'all') && mockPatients.slice(0, 3).map(patient => (
            <PatientCard 
              key={patient.id}
              patient={patient}
              onLocateClick={handleLocatePatient}
              onViewHistoryClick={handleViewPatientHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
