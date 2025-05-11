
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface AdminHeaderProps {
  onSave: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onSave }) => {
  const navigate = useNavigate();
  const { resetData } = usePortfolio();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data to defaults? This cannot be undone.")) {
      resetData();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Portfolio Admin</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={onSave} className="bg-purple-500 hover:bg-purple-600">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
