
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Terminal, Sun, Moon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface AdminHeaderProps {
  onSave: () => void;
  onToggleHackerMode?: () => void;
  currentTheme?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onSave, onToggleHackerMode, currentTheme }) => {
  const navigate = useNavigate();
  const { resetData } = usePortfolio();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data to defaults? This cannot be undone.")) {
      resetData();
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full bg-background border-b ${currentTheme === 'hacker' ? 'border-green-500/30' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className={currentTheme === 'hacker' ? 'text-green-500 hover:bg-green-500/20' : ''}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className={`text-xl font-bold ${currentTheme === 'hacker' ? 'text-green-500 font-mono' : ''}`}>
            Portfolio Admin
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {onToggleHackerMode && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onToggleHackerMode}
              className={currentTheme === 'hacker' ? 'border-green-500/30 hover:bg-green-500/20' : ''}
            >
              {currentTheme === 'hacker' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Terminal className="h-5 w-5" />
              )}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={handleReset}
            className={currentTheme === 'hacker' ? 'border-green-500/30 hover:bg-green-500/20 text-green-500' : ''}
          >
            Reset to Default
          </Button>
          
          <Button 
            onClick={onSave} 
            className={currentTheme === 'hacker' 
              ? 'bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/30' 
              : 'bg-purple-500 hover:bg-purple-600'
            }
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
