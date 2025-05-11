
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData, Project } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image, Upload, X, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/use-theme';

interface ImageManagementPanelProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

const ImageManagementPanel: React.FC<ImageManagementPanelProps> = ({ data, onChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const handleImageUpload = (projectId: string) => {
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }
    
    const updatedProjects = data.projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          image: imageUrl,
        };
      }
      return project;
    });
    
    onChange({
      ...data,
      projects: updatedProjects,
    });
    
    toast({
      title: "Image Updated",
      description: "Project image has been updated successfully.",
      duration: 3000,
    });
    
    setImageUrl('');
    setSelectedProject(null);
  };
  
  const isHackerTheme = theme === 'hacker';
  
  return (
    <Card className={`shadow-sm ${isHackerTheme ? 'bg-gray-900 border-green-500/30 text-green-500' : ''}`}>
      <CardHeader>
        <CardTitle className={isHackerTheme ? 'text-green-500 font-mono' : ''}>
          Image Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className={`text-lg font-medium ${isHackerTheme ? 'text-green-500 font-mono' : ''}`}>
            Project Images
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.projects.map(project => (
              <ProjectImageCard
                key={project.id}
                project={project}
                onSelectProject={(id) => {
                  setSelectedProject(id === selectedProject ? null : id);
                  setImageUrl(project.image || '');
                }}
                isSelected={selectedProject === project.id}
                isHackerTheme={isHackerTheme}
              />
            ))}
          </div>
        </div>
        
        {selectedProject && (
          <div className={`p-4 rounded-md ${isHackerTheme ? 'bg-gray-800 border border-green-500/30' : 'bg-gray-50 dark:bg-gray-800'}`}>
            <h4 className={`text-md font-medium mb-4 ${isHackerTheme ? 'text-green-500 font-mono' : ''}`}>
              Update Image for {data.projects.find(p => p.id === selectedProject)?.title}
            </h4>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-url" className={isHackerTheme ? 'text-green-500 font-mono' : ''}>
                  Image URL
                </Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={isHackerTheme ? 'bg-gray-900 border-green-500/30 text-green-500 focus:border-green-500' : ''}
                />
              </div>
              
              {imageUrl && (
                <div className="mt-2">
                  <p className={`text-sm mb-2 ${isHackerTheme ? 'text-green-500 font-mono' : 'text-muted-foreground'}`}>Preview:</p>
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="max-h-40 rounded-md object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                      toast({
                        title: "Image Error",
                        description: "Could not load the image preview. Please check the URL.",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProject(null);
                    setImageUrl('');
                  }}
                  className={isHackerTheme ? 'border-green-500/30 text-green-500 hover:bg-green-500/20' : ''}
                >
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={() => handleImageUpload(selectedProject)}
                  className={isHackerTheme 
                    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/30' 
                    : 'bg-purple-500 hover:bg-purple-600'
                  }
                >
                  <Check className="mr-1 h-4 w-4" />
                  Update Image
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ProjectImageCardProps {
  project: Project;
  onSelectProject: (id: string) => void;
  isSelected: boolean;
  isHackerTheme: boolean;
}

const ProjectImageCard: React.FC<ProjectImageCardProps> = ({ 
  project, 
  onSelectProject, 
  isSelected,
  isHackerTheme
}) => {
  return (
    <div 
      className={`
        p-4 rounded-md border cursor-pointer transition-all
        ${isSelected 
          ? isHackerTheme 
            ? 'border-green-500 bg-green-500/10' 
            : 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
          : isHackerTheme 
            ? 'border-green-500/30 hover:bg-green-500/10' 
            : 'hover:border-purple-200 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
        }
      `}
      onClick={() => onSelectProject(project.id)}
    >
      <div className="flex space-x-4">
        <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }} 
            />
          ) : (
            <Image className={`h-8 w-8 ${isHackerTheme ? 'text-green-500/50' : 'text-gray-400'}`} />
          )}
        </div>
        
        <div className="flex-1">
          <h4 className={`text-md font-medium ${isHackerTheme ? 'text-green-500 font-mono' : ''}`}>
            {project.title}
          </h4>
          <p className={`text-sm truncate ${isHackerTheme ? 'text-green-500/70 font-mono' : 'text-muted-foreground'}`}>
            {project.image ? 'Image set' : 'No image'}
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            onSelectProject(project.id);
          }}
          className={isHackerTheme ? 'text-green-500 hover:bg-green-500/20' : ''}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageManagementPanel;
