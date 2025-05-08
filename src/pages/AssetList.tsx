
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AssetCard, Asset } from '@/components/dashboard/AssetCard';
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
  },
  { 
    id: 'A006', 
    name: 'Wheelchair #2', 
    type: 'Mobility Equipment', 
    location: 'Room 106', 
    floor: 1, 
    status: 'active', 
    lastUpdated: '20 minutes ago', 
    pic: 'Dr. Ahmad' 
  },
  { 
    id: 'A007', 
    name: 'Patient Monitor', 
    type: 'Medical Equipment', 
    location: 'Room 103', 
    floor: 2, 
    status: 'active', 
    lastUpdated: '15 minutes ago', 
    pic: 'Nurse Siti' 
  },
  { 
    id: 'A008', 
    name: 'Defibrillator', 
    type: 'Emergency Equipment', 
    location: 'Emergency Room', 
    floor: 2, 
    status: 'active', 
    lastUpdated: '1 hour ago', 
    pic: 'Dr. Rahman' 
  },
  { 
    id: 'A009', 
    name: 'Ultrasound Machine', 
    type: 'Diagnostic Equipment', 
    location: 'Room 201', 
    floor: 2, 
    status: 'maintenance', 
    lastUpdated: '3 hours ago', 
    pic: 'Dr. Fatimah' 
  },
];

const AssetList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesFloor = floorFilter === 'all' || asset.floor.toString() === floorFilter;
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesFloor && matchesType;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocateAsset = (id: string) => {
    toast(`Locating asset: ${id}`);
  };

  const handleViewAssetHistory = (id: string) => {
    toast(`Viewing history for asset ID: ${id}`);
  };

  // Get unique asset types for filter
  const assetTypes = ['all', ...Array.from(new Set(mockAssets.map(asset => asset.type)))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Asset Management</h1>
        <p className="text-muted-foreground">View and manage all hospital assets.</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assets..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
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
                    {assetTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAssets.length} of {mockAssets.length} assets
            </p>
            <Button variant="outline" className="text-xs gap-1">
              <Filter className="h-3 w-3" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAssets.map(asset => (
          <AssetCard 
            key={asset.id}
            asset={asset}
            onLocateClick={handleLocateAsset}
            onViewHistoryClick={handleViewAssetHistory}
          />
        ))}
        
        {filteredAssets.length === 0 && (
          <div className="col-span-full p-8 text-center">
            <p className="text-muted-foreground">No assets found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
