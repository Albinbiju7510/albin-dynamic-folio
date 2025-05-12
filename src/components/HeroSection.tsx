import React, { useEffect, useState } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/context/PortfolioContext';
import { useToast } from '@/components/ui/use-toast';
import { jsPDF } from 'jspdf';

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Delay the animation slightly for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateResume = () => {
    toast({
      title: "Generating PDF Resume",
      description: "Please wait while your resume is being generated...",
      duration: 3000,
    });
    
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Set font styles
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(128, 0, 128); // Purple color
      
      // Add header/name
      doc.text(data.name, 105, 20, { align: "center" });
      
      // Set normal font for content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Add title/profession
      doc.text(data.title, 105, 30, { align: "center" });
      
      // Add contact info
      doc.setFontSize(10);
      doc.text(`Email: ${data.contact.email}`, 105, 40, { align: "center" });
      if (data.contact.linkedin) {
        doc.text(`LinkedIn: ${data.contact.linkedin}`, 105, 45, { align: "center" });
      }
      if (data.contact.github) {
        doc.text(`GitHub: ${data.contact.github}`, 105, 50, { align: "center" });
      }
      
      // Add a divider
      doc.setDrawColor(128, 0, 128);
      doc.setLineWidth(0.5);
      doc.line(20, 55, 190, 55);
      
      // About section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(128, 0, 128);
      doc.text("About", 20, 65);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      // Split long text into multiple lines
      const aboutLines = doc.splitTextToSize(data.about, 170);
      doc.text(aboutLines, 20, 75);
      
      // Calculate vertical position after about text
      const aboutEndY = 75 + (aboutLines.length * 5);
      
      // Skills section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(128, 0, 128);
      doc.text("Skills", 20, aboutEndY + 10);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      // Group skills by category
      const skillCategories = {
        programming: data.skills.filter(s => s.category === 'programming'),
        technology: data.skills.filter(s => s.category === 'technology'),
        tool: data.skills.filter(s => s.category === 'tool'),
        soft: data.skills.filter(s => s.category === 'soft')
      };
      
      let skillY = aboutEndY + 20;
      
      // List skills by category
      for (const [category, skills] of Object.entries(skillCategories)) {
        if (skills.length > 0) {
          doc.setFont("helvetica", "italic");
          doc.text(category.charAt(0).toUpperCase() + category.slice(1) + ":", 20, skillY);
          doc.setFont("helvetica", "normal");
          
          const skillNames = skills.map(s => s.name).join(", ");
          const skillLines = doc.splitTextToSize(skillNames, 170);
          doc.text(skillLines, 30, skillY + 5);
          
          skillY += (skillLines.length * 5) + 10;
        }
      }
      
      // Projects section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(128, 0, 128);
      doc.text("Projects", 20, skillY + 5);
      
      let projectY = skillY + 15;
      
      // Add projects (limited to keep resume on one page)
      const projectsToShow = data.projects.slice(0, 3); // Show first 3 projects
      
      projectsToShow.forEach((project, index) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(project.title, 20, projectY);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const descLines = doc.splitTextToSize(project.description, 170);
        doc.text(descLines, 20, projectY + 5);
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.text(`Technologies: ${project.technologies.join(", ")}`, 20, projectY + 5 + (descLines.length * 5));
        
        projectY += 20 + (descLines.length * 5);
      });
      
      // Education section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(128, 0, 128);
      doc.text("Education", 20, projectY + 5);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("BTech in Computer Science Engineering", 20, projectY + 15);
      doc.setFontSize(10);
      doc.text("College of Engineering Aranmula (2021 - Present)", 20, projectY + 20);
      
      // Add footer with date
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      const today = new Date();
      doc.text(`Generated on ${today.toLocaleDateString()}`, 105, 285, { align: "center" });
      
      // Save the PDF
      doc.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
      
      toast({
        title: "Resume Generated",
        description: "Your PDF resume has been created and downloaded.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF resume. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-purple-100 to-white dark:from-purple-900/30 dark:to-background">
      {/* Decorative Elements - Circles */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-purple-300/10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-purple-400/10 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-200/20 animate-rotate-slow"></div>

      <div className={`container mx-auto px-4 z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purple-500 tracking-tight">
              Hi, I'm {data.name}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-foreground/80 font-light">
              {data.title}
            </h2>
            <p className="text-lg mb-8 text-foreground/70 max-w-lg">
              Passionate about blending technology and creativity to build innovative solutions that make a difference.
            </p>
            <div className="flex gap-4">
              <Button onClick={scrollToAbout} className="bg-purple-500 hover:bg-purple-600">
                Discover More
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center gap-2"
                onClick={generateResume}
              >
                <Download size={16} />
                Download Resume
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/5">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-purple-300 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/ab897175-147a-4b6b-bc35-be0d1894c521.png" 
                  alt="Albin Biju" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative shape behind profile */}
              <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 -bottom-2 -right-2 opacity-30 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-purple-500" />
      </div>
    </section>
  );
};

export default HeroSection;
