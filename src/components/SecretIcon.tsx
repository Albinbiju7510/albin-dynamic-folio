
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key } from 'lucide-react';

const SecretIcon: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
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
    <div 
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={handleClick}
    >
      <div className={`transition-all duration-300 ${isVisible ? 'opacity-30' : 'opacity-0'}`}>
        <Key className="h-6 w-6 text-foreground" />
      </div>
    </div>
  );
};

export default SecretIcon;
