
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
  onTabChange: (tab: string) => void;
  currentTab: string;
}

export const FilterBar = ({ onFilterChange, onTabChange, currentTab }: FilterBarProps) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue={currentTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, ID, or location..."
            className="pl-10"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        
        <Select onValueChange={(value) => onFilterChange({ floor: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Floor" />
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
        
        <Select onValueChange={(value) => onFilterChange({ status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">All Statuses</SelectItem>
              {currentTab === 'assets' || currentTab === 'all' ? (
                <>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                </>
              ) : null}
              {currentTab === 'patients' || currentTab === 'all' ? (
                <>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="discharged">Discharged</SelectItem>
                </>
              ) : null}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
