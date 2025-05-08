
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface Marker {
  id: string;
  type: 'asset' | 'patient' | 'emergency';
  position: { x: number; y: number };
  label: string;
  details: string;
}

interface FloorPlanProps {
  markers: Marker[];
  onMarkerClick: (marker: Marker) => void;
  currentFloor: number;
  totalFloors: number;
  onFloorChange: (floor: number) => void;
}

export const FloorPlan = ({ 
  markers, 
  onMarkerClick, 
  currentFloor,
  totalFloors,
  onFloorChange 
}: FloorPlanProps) => {
  return (
    <div className="relative h-full w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-md backdrop-blur-sm shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Floor:</span>
          <Select value={currentFloor.toString()} onValueChange={(value) => onFloorChange(parseInt(value))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Floor</SelectLabel>
                {[...Array(totalFloors)].map((_, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    Floor {index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 z-10 bg-white/80 p-2 rounded-md backdrop-blur-sm shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-hospital-primary mr-2"></span>
            <span className="text-xs">Assets</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-hospital-secondary mr-2"></span>
            <span className="text-xs">Patients</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-hospital-alert mr-2"></span>
            <span className="text-xs">Emergency</span>
          </div>
        </div>
      </div>
      
      <div className="h-full w-full">
        <div className="relative w-full h-full bg-[#f8fafc] overflow-hidden">
          <div className="grid grid-cols-12 h-full w-full">
            {/* Grid lines for visualization */}
            {[...Array(12)].map((_, i) => (
              <div key={`col-${i}`} className="h-full border-r border-gray-100"></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div key={`row-${i}`} className="absolute w-full border-t border-gray-100" style={{ top: `${(i + 1) * 100 / 12}%` }}></div>
            ))}
            
            {/* Room outlines */}
            <div className="absolute top-[10%] left-[10%] w-[25%] h-[20%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Room 101</div>
            </div>
            <div className="absolute top-[10%] left-[40%] w-[25%] h-[20%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Room 102</div>
            </div>
            <div className="absolute top-[10%] left-[70%] w-[20%] h-[20%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Room 103</div>
            </div>
            <div className="absolute top-[35%] left-[10%] w-[35%] h-[25%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Emergency Room</div>
            </div>
            <div className="absolute top-[35%] left-[50%] w-[40%] h-[25%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Nurses Station</div>
            </div>
            <div className="absolute top-[65%] left-[10%] w-[25%] h-[25%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Room 104</div>
            </div>
            <div className="absolute top-[65%] left-[40%] w-[25%] h-[25%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Room 105</div>
            </div>
            <div className="absolute top-[65%] left-[70%] w-[20%] h-[25%] border-2 border-gray-200 rounded-sm bg-gray-50/50">
              <div className="absolute top-0 left-0 p-1 text-xs text-gray-500">Room 106</div>
            </div>
            
            {/* Hallway */}
            <div className="absolute top-[30%] left-[5%] w-[90%] h-[5%] bg-gray-100/70"></div>
            <div className="absolute top-[60%] left-[5%] w-[90%] h-[5%] bg-gray-100/70"></div>
            <div className="absolute top-[30%] left-[5%] w-[5%] h-[35%] bg-gray-100/70"></div>
            <div className="absolute top-[30%] left-[90%] w-[5%] h-[35%] bg-gray-100/70"></div>

            {/* Markers for assets and patients */}
            {markers.map((marker) => (
              <TooltipProvider key={marker.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className={`floor-marker ${marker.type}`} 
                      style={{ 
                        left: `${marker.position.x}%`, 
                        top: `${marker.position.y}%` 
                      }}
                      onClick={() => onMarkerClick(marker)}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{marker.label}</p>
                    <p className="text-xs">{marker.details}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
