
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const SecretIcon: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
      if (newCount === 1) {
        toast({
          title: "Admin Access",
          description: "Click 5 times to access the admin panel.",
          duration: 3000,
        });
      }
      
      if (newCount >= 5) {
        navigate('/admin');
        return 0;
      }
      
      if (newCount === 1) {
        setTimeout(() => {
          setClickCount(0);
        }, 3000);
      }
      
      return newCount;
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className="fixed bottom-6 right-6 z-50 cursor-pointer p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          onClick={handleClick}
        >
          <div className={`transition-all duration-300 ${isVisible ? 'opacity-60' : 'opacity-20'}`}>
            <Key className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Admin access (click 5 times)</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SecretIcon;
