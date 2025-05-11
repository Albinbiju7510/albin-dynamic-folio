
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({ name: '', email: '', message: '' });
    // Show success message or toast notification
    alert("Message sent! (This is a demo - no actual email was sent)");
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-semibold mb-4 text-purple-500">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out to me for collaborations, internships, or if you just want to chat about technology and innovation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-purple-500 mt-1 mr-4" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href={`mailto:${data.contact.email}`} className="text-muted-foreground hover:text-purple-500 transition-colors">
                    {data.contact.email}
                  </a>
                </div>
              </div>
              
              {data.contact.linkedin && (
                <div className="flex items-start">
                  <Linkedin className="w-5 h-5 text-purple-500 mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <a 
                      href={data.contact.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              )}
              
              {data.contact.github && (
                <div className="flex items-start">
                  <Github className="w-5 h-5 text-purple-500 mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <a 
                      href={data.contact.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      View Projects on GitHub
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                  placeholder="What would you like to discuss?"
                />
              </div>
              
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
