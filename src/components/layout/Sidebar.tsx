
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Hospital, Map, Users, Database, Bell, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const navItems = [
    { icon: Map, label: 'Dashboard', path: '/' },
    { icon: Hospital, label: 'Assets', path: '/assets' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Database, label: 'History', path: '/history' },
    { icon: Clock, label: 'Time Logs', path: '/time-logs' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Hospital className="h-6 w-6 text-hospital-secondary" />
          <span className="font-bold text-xl text-hospital-dark">Hospital Beacon</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="h-8 w-8 rounded-full bg-hospital-secondary text-white flex items-center justify-center">
            <span className="text-sm font-medium">RS</span>
          </div>
          <div>
            <p className="text-sm font-medium">Rumah Sakit Admin</p>
            <p className="text-xs text-muted-foreground">admin@rs.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
