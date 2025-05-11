
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Github, ExternalLink } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const getSelectedProject = () => {
    return data.projects.find(project => project.id === selectedProject);
  };

  return (
    <section id="projects" ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {data.projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card group cursor-pointer transition-all duration-700 delay-${index % 3}00 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              onClick={() => setSelectedProject(project.id)}
            >
              {project.image && (
                <div className="h-48 w-full mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2 text-purple-500">{project.title}</h3>
              <p className="text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm text-purple-500">Click to view details</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-purple-600/5 border border-purple-200/50 dark:border-purple-500/10">
            {getSelectedProject() && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-purple-500">{getSelectedProject()?.title}</DialogTitle>
                </DialogHeader>
                
                {getSelectedProject()?.image && (
                  <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
                    <img 
                      src={getSelectedProject()?.image} 
                      alt={getSelectedProject()?.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <DialogDescription className="text-foreground">
                  {getSelectedProject()?.description}
                </DialogDescription>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {getSelectedProject()?.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex mt-6 space-x-4">
                  {getSelectedProject()?.github && (
                    <a 
                      href={getSelectedProject()?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      <Github className="w-5 h-5 mr-1" />
                      <span>View Code</span>
                    </a>
                  )}
                  {getSelectedProject()?.link && (
                    <a 
                      href={getSelectedProject()?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-1" />
                      <span>Visit Project</span>
                    </a>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
