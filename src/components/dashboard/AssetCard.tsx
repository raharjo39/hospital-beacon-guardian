
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Clock, User } from 'lucide-react';

export interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  floor: number;
  status: 'active' | 'inactive' | 'maintenance' | 'alert';
  lastUpdated: string;
  pic: string;
}

interface AssetCardProps {
  asset: Asset;
  onLocateClick: (id: string) => void;
  onViewHistoryClick: (id: string) => void;
}

export const AssetCard = ({ asset, onLocateClick, onViewHistoryClick }: AssetCardProps) => {
  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'alert':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-semibold text-base">{asset.name}</h3>
          <p className="text-sm text-muted-foreground">{asset.type}</p>
        </div>
        <Badge className={getStatusColor(asset.status)} variant="outline">
          {asset.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center text-sm">
          <span className="font-medium min-w-24">Location:</span>
          <span>{asset.location} (Floor {asset.floor})</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Updated {asset.lastUpdated}</span>
        </div>
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">PIC: {asset.pic}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="text-hospital-primary border-hospital-primary hover:bg-hospital-primary/10 w-full"
          onClick={() => onLocateClick(asset.id)}
        >
          Locate
        </Button>
        <Button 
          variant="outline" 
          className="text-hospital-secondary border-hospital-secondary hover:bg-hospital-secondary/10 w-full" 
          onClick={() => onViewHistoryClick(asset.id)}
        >
          History
        </Button>
      </CardFooter>
    </Card>
  );
};
