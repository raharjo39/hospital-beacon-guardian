
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Berhasil keluar dari sistem');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="flex items-center space-x-2"
    >
      <LogOut className="h-4 w-4" />
      <span>Keluar</span>
    </Button>
  );
};

export default LogoutButton;
