import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData, Project } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image, Upload, X, Check, User, FileImage, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageManagementPanelProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

// Main component
const ImageManagementPanel: React.FC<ImageManagementPanelProps> = ({ data, onChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState('/lovable-uploads/ab897175-147a-4b6b-bc35-be0d1894c521.png');
  const [heroImage, setHeroImage] = useState('/lovable-uploads/d04aa748-67a1-478a-b51e-98046710a436.png');
  const [activeTab, setActiveTab] = useState('profile');
  const [socialLinks, setSocialLinks] = useState({
    github: data.socialLinks?.github || '',
    linkedin: data.socialLinks?.linkedin || '',
    twitter: data.socialLinks?.twitter || '',
    instagram: data.socialLinks?.instagram || '',
  });
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

  const handleProfileImageUpdate = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }
    
    setProfileImage(imageUrl);
    
    onChange({
      ...data,
      profileImage: imageUrl
    });
    
    toast({
      title: "Profile Image Updated",
      description: "Your profile image has been updated successfully.",
      duration: 3000,
    });
    
    setImageUrl('');
  };
  
  const handleHeroImageUpdate = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }
    
    setHeroImage(imageUrl);
    
    onChange({
      ...data,
      heroImage: imageUrl
    });
    
    toast({
      title: "Hero Image Updated",
      description: "Your hero image has been updated successfully.",
      duration: 3000,
    });
    
    setImageUrl('');
  };
  
  const handleSocialLinksUpdate = () => {
    onChange({
      ...data,
      socialLinks: socialLinks
    });
    
    toast({
      title: "Social Links Updated",
      description: "Your social links have been updated successfully.",
      duration: 3000,
    });
  };
  
  const isHackerTheme = theme === 'hacker';
  
  return (
    <Card className={`shadow-sm ${isHackerTheme ? 'bg-gray-900 border-green-500/30 text-green-500' : ''}`}>
      <CardHeader>
        <CardTitle className={`${isHackerTheme ? 'text-green-500 font-mono' : ''} font-heading`}>
          Image &amp; Links Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid grid-cols-3 w-full ${isHackerTheme ? 'bg-gray-900 border border-green-500/30' : ''}`}>
            <TabsTrigger 
              value="profile"
              className={isHackerTheme ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
            >
              Profile Image
            </TabsTrigger>
            <TabsTrigger 
              value="hero"
              className={isHackerTheme ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
            >
              Hero Image
            </TabsTrigger>
            <TabsTrigger 
              value="projects"
              className={isHackerTheme ? 'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500' : ''}
            >
              Project Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className={`p-4 rounded-md ${isHackerTheme ? 'bg-gray-800 border border-green-500/30' : 'bg-gray-50 dark:bg-gray-800'}`}>
              {/* Profile Image Section */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-purple-300 dark:border-purple-700 shadow-md mx-auto">
                    <img 
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <p className="text-center mt-2 text-sm text-muted-foreground">Profile Image</p>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="profile-url" className={isHackerTheme ? 'text-green-500 font-mono' : ''}>
                      New Profile Image URL
                    </Label>
                    <Input
                      id="profile-url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      className={isHackerTheme ? 'bg-gray-900 border-green-500/30 text-green-500 focus:border-green-500' : ''}
                    />
                  </div>
                  
                  {imageUrl && (
                    <div className="mt-2">
                      <p className={`text-sm mb-2 ${isHackerTheme ? 'text-green-500 font-mono' : 'text-muted-foreground'}`}>Preview:</p>
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-300 dark:border-purple-700">
                        <img 
                          src={imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
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
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setImageUrl('')}
                      className={isHackerTheme ? 'border-green-500/30 text-green-500 hover:bg-green-500/20' : ''}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Clear
                    </Button>
                    <Button
                      onClick={handleProfileImageUpdate}
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

              {/* Social Links Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className={`text-lg font-medium mb-4 ${isHackerTheme ? 'text-green-500' : ''}`}>
                  Social Media Links
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="github-url">GitHub URL</Label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                        <LinkIcon className="h-4 w-4" />
                      </span>
                      <Input
                        id="github-url"
                        value={socialLinks.github}
                        onChange={(e) => setSocialLinks({...socialLinks, github: e.target.value})}
                        placeholder="https://github.com/yourusername"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                        <LinkIcon className="h-4 w-4" />
                      </span>
                      <Input
                        id="linkedin-url"
                        value={socialLinks.linkedin}
                        onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                        placeholder="https://linkedin.com/in/yourusername"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="twitter-url">Twitter URL</Label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                        <LinkIcon className="h-4 w-4" />
                      </span>
                      <Input
                        id="twitter-url"
                        value={socialLinks.twitter}
                        onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                        placeholder="https://twitter.com/yourusername"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="instagram-url">Instagram URL</Label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                        <LinkIcon className="h-4 w-4" />
                      </span>
                      <Input
                        id="instagram-url"
                        value={socialLinks.instagram}
                        onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                        placeholder="https://instagram.com/yourusername"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSocialLinksUpdate}
                      className={isHackerTheme 
                        ? 'bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/30' 
                        : 'bg-purple-500 hover:bg-purple-600'
                      }
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Save Links
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hero" className="space-y-4 pt-4">
            <div className={`p-4 rounded-md ${isHackerTheme ? 'bg-gray-800 border border-green-500/30' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="relative w-40 h-28 overflow-hidden rounded-md border-2 border-purple-300 dark:border-purple-700 shadow-md mx-auto">
                    <img 
                      src={heroImage}
                      alt="Hero"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <p className="text-center mt-2 text-sm text-muted-foreground">Hero Image</p>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="hero-url" className={isHackerTheme ? 'text-green-500 font-mono' : ''}>
                      New Hero Image URL
                    </Label>
                    <Input
                      id="hero-url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/hero.jpg"
                      className={isHackerTheme ? 'bg-gray-900 border-green-500/30 text-green-500 focus:border-green-500' : ''}
                    />
                  </div>
                  
                  {imageUrl && (
                    <div className="mt-2">
                      <p className={`text-sm mb-2 ${isHackerTheme ? 'text-green-500 font-mono' : 'text-muted-foreground'}`}>Preview:</p>
                      <div className="w-32 h-20 overflow-hidden rounded-md border border-purple-300 dark:border-purple-700">
                        <img 
                          src={imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
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
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setImageUrl('')}
                      className={isHackerTheme ? 'border-green-500/30 text-green-500 hover:bg-green-500/20' : ''}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Clear
                    </Button>
                    <Button
                      onClick={handleHeroImageUpdate}
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
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 pt-4">
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
          </TabsContent>
        </Tabs>
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
