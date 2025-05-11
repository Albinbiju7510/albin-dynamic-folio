
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

const AdminPanel = () => {
  const { data: originalData, updateData } = usePortfolio();
  const [formData, setFormData] = useState<PortfolioData>(originalData);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update form data when the original data changes (e.g. on reset)
  useEffect(() => {
    setFormData(originalData);
  }, [originalData]);

  const handleSave = () => {
    updateData(formData);
    
    toast({
      title: "Changes saved",
      description: "Your portfolio has been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onSave={handleSave} />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="roles">Leadership</TabsTrigger>
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
        </Tabs>
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
