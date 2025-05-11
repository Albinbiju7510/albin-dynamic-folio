
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { PortfolioProvider, usePortfolio } from '@/context/PortfolioContext';
import { PortfolioData } from '@/types/portfolio';
import AdminHeader from '@/components/admin/AdminHeader';
import PersonalInfoForm from '@/components/admin/PersonalInfoForm';
import SkillsForm from '@/components/admin/SkillsForm';
import ProjectsForm from '@/components/admin/ProjectsForm';
import RolesForm from '@/components/admin/RolesForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageManagementPanel from '@/components/admin/ImageManagementPanel';
import { Terminal } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const AdminPanel = () => {
  const { data: originalData, updateData } = usePortfolio();
  const [formData, setFormData] = useState<PortfolioData>(originalData);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [loadingAnimation, setLoadingAnimation] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Update form data when the original data changes (e.g. on reset)
  useEffect(() => {
    setFormData(originalData);
  }, [originalData]);

  // Simulated loading animation for "hacker" mode
  useEffect(() => {
    if (theme === 'hacker') {
      setLoadingProgress(0);
      setLoadingAnimation(true);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoadingAnimation(false), 500);
            return 100;
          }
          return newProgress;
        });
      }, 200);
      
      return () => clearInterval(interval);
    } else {
      setLoadingAnimation(false);
    }
  }, [theme]);

  const handleSave = () => {
    updateData(formData);
    
    toast({
      title: "Changes saved",
      description: "Your portfolio has been updated successfully.",
      duration: 3000,
    });
  };

  const toggleHackerMode = () => {
    setTheme(theme === 'hacker' ? 'dark' : 'hacker');
  };

  return (
    <div className={`min-h-screen bg-background ${theme === 'hacker' ? 'font-mono text-green-500' : ''}`}>
      <AdminHeader onSave={handleSave} onToggleHackerMode={toggleHackerMode} currentTheme={theme} />
      
      <main className="container mx-auto px-4 py-8">
        {theme === 'hacker' && loadingAnimation ? (
          <div className="my-10">
            <h2 className="text-green-500 text-xl mb-4 font-mono">Initializing admin interface...</h2>
            <div className="mb-2 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="font-mono text-sm text-green-500">
              <p>{"> "}Loading modules... {Math.min(Math.floor(loadingProgress * 1.5), 100)}%</p>
              {loadingProgress > 30 && <p>{"> "}Establishing secure connection...</p>}
              {loadingProgress > 60 && <p>{"> "}Decrypting portfolio data...</p>}
              {loadingProgress > 80 && <p>{"> "}Preparing administration tools...</p>}
              {loadingProgress >= 100 && <p>{"> "}Access granted. Welcome back, Administrator.</p>}
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid grid-cols-5 w-full ${theme === 'hacker' ? 'bg-gray-900 border border-green-500/30' : ''}`}>
              <TabsTrigger 
                value="personal"
                className={theme === 'hacker' ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger 
                value="skills"
                className={theme === 'hacker' ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
              >
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="projects"
                className={theme === 'hacker' ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="roles"
                className={theme === 'hacker' ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
              >
                Leadership
              </TabsTrigger>
              <TabsTrigger 
                value="images"
                className={theme === 'hacker' ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
              >
                Images
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoForm 
                data={formData} 
                onChange={setFormData} 
              />
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <SkillsForm 
                data={formData} 
                onChange={setFormData} 
              />
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4">
              <ProjectsForm 
                data={formData} 
                onChange={setFormData} 
              />
            </TabsContent>
            
            <TabsContent value="roles" className="space-y-4">
              <RolesForm 
                data={formData} 
                onChange={setFormData} 
              />
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4">
              <ImageManagementPanel
                data={formData}
                onChange={setFormData}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

const AdminPage = () => {
  return (
    <PortfolioProvider>
      <AdminPanel />
    </PortfolioProvider>
  );
};

export default AdminPage;
