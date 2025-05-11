
import React from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData, Project } from '@/types/portfolio';

interface ProjectsFormProps {
  data: PortfolioData;
  onChange: (updatedData: PortfolioData) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    
    onChange({
      ...data,
      projects: updatedProjects,
    });
  };

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      title: '',
      description: '',
      technologies: [],
      image: '',
    };
    
    onChange({
      ...data,
      projects: [...data.projects, newProject],
    });
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = data.projects.filter((_, i) => i !== index);
    
    onChange({
      ...data,
      projects: updatedProjects,
    });
  };

  const handleTechnologiesChange = (index: number, value: string) => {
    // Convert comma-separated string to array
    const techArray = value.split(',').map(item => item.trim()).filter(item => item !== '');
    
    handleProjectChange(index, 'technologies', techArray);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button size="sm" onClick={handleAddProject}>
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent>
        {data.projects.map((project, index) => (
          <div key={project.id} className="p-4 border rounded-md mb-4 bg-secondary/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium">Project #{index + 1}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveProject(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor={`project-title-${index}`}>Title</Label>
                <Input
                  id={`project-title-${index}`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  placeholder="Project Title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`project-desc-${index}`}>Description</Label>
                <Textarea
                  id={`project-desc-${index}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  placeholder="Describe your project"
                  className="mt-1 min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor={`project-tech-${index}`}>Technologies</Label>
                <Input
                  id={`project-tech-${index}`}
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                  placeholder="React, Node.js, MongoDB (comma separated)"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`project-image-${index}`}>Image URL</Label>
                <Input
                  id={`project-image-${index}`}
                  value={project.image || ''}
                  onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`project-link-${index}`}>Project URL</Label>
                <Input
                  id={`project-link-${index}`}
                  value={project.link || ''}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  placeholder="https://project-demo.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`project-github-${index}`}>GitHub URL</Label>
                <Input
                  id={`project-github-${index}`}
                  value={project.github || ''}
                  onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
        
        {data.projects.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No projects added yet. Click "Add Project" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsForm;
