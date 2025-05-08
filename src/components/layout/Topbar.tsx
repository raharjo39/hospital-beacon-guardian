
import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/sonner';

export const Topbar = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Emergency Alert",
      message: "Patient ID 12345 pressed emergency button on Floor 3",
      time: "2 minutes ago",
      read: false,
      type: "emergency"
    },
    {
      id: 2,
      title: "Geofence Alert",
      message: "Wheelchair A22 left hospital perimeter",
      time: "10 minutes ago",
      read: false,
      type: "warning"
    },
    {
      id: 3,
      title: "System Update",
      message: "System maintenance scheduled for tonight at 2 AM",
      time: "1 hour ago",
      read: true,
      type: "info"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast("Notification marked as read");
  };

  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-semibold text-hospital-dark">Hospital Beacon Guardian</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-hospital-alert text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="p-4 border-b">
              <div className="font-medium">Notifications</div>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-0 ${
                      notification.read ? "bg-white" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`font-medium flex items-center gap-2 ${
                        notification.type === 'emergency' ? 'text-hospital-alert' :
                        notification.type === 'warning' ? 'text-hospital-warning' :
                        'text-hospital-primary'
                      }`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-hospital-alert"></span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {notification.time}
                      </div>
                    </div>
                    <div className="text-sm mt-1">{notification.message}</div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-xs"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
