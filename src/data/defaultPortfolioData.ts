
import { PortfolioData } from '@/types/portfolio';

const defaultPortfolioData: PortfolioData = {
  name: "Albin Biju",
  title: "BTech Computer Science Engineering Student",
  about: "I'm a passionate and forward-thinking third-year BTech Computer Science Engineering student at College of Engineering Aranmula. My journey revolves around developing innovative tech solutions, creating engaging content, and driving impactful projects. I'm all about blending technology and creativity. As an aspiring software developer, I focus on building intuitive web applications, designing user-friendly interfaces (UI/UX), and tackling real-world problems. I believe in pushing boundaries while keeping the human element at the core, whether it's through coding, content creation, or organizing events.",
  
  skills: [
    { name: "Python", level: 90, category: "programming" },
    { name: "JavaScript", level: 85, category: "programming" },
    { name: "HTML/CSS", level: 95, category: "programming" },
    { name: "SQL", level: 80, category: "programming" },
    { name: "Node.js", level: 75, category: "programming" },
    { name: "React", level: 85, category: "technology" },
    { name: "Angular", level: 70, category: "technology" },
    { name: "UI/UX Design", level: 80, category: "technology" },
    { name: "Git/GitHub", level: 85, category: "technology" },
    { name: "MongoDB", level: 75, category: "technology" },
    { name: "MySQL", level: 80, category: "technology" },
    { name: "Figma", level: 85, category: "tool" },
    { name: "VS Code", level: 95, category: "tool" },
    { name: "Adobe XD", level: 75, category: "tool" },
    { name: "Canva", level: 90, category: "tool" },
    { name: "Leadership", level: 90, category: "soft" },
    { name: "Collaboration", level: 95, category: "soft" },
    { name: "Time Management", level: 85, category: "soft" },
    { name: "Agile Practices", level: 80, category: "soft" },
  ],
  
  projects: [
    {
      id: "campus-resource",
      title: "Campus Resource Utilization App",
      description: "A campus management system for students, faculty, and admin to access and utilize campus facilities like libraries and stores. Features include points system, notifications, and easy-to-use interfaces.",
      technologies: ["React", "Node.js", "MySQL", "HTML/CSS"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: "tech-content",
      title: "Tech Content Creation",
      description: "Creating tech-related videos, tutorials, and vlogs on platforms like YouTube. My focus is on simplifying complex topics and making tech more accessible and fun.",
      technologies: ["Video Editing", "Content Creation", "Tech Tutorials"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: "chat-app",
      title: "Multi-User Chat Application",
      description: "Developed a real-time multi-user chat application using TCP for seamless communication between users.",
      technologies: ["Python", "Sockets", "TCP/IP"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: "photography",
      title: "Photography",
      description: "Capturing moments and events through my lens. I focus on event photography and creative shots that tell stories.",
      technologies: ["Photography", "Editing", "Visual Storytelling"],
      image: "/lovable-uploads/d04aa748-67a1-478a-b51e-98046710a436.png",
      link: "https://www.instagram.com/stories.of_albin"
    }
  ],
  
  languages: [
    { name: "Malayalam", proficiency: "Native", skills: ["Read", "Write", "Speak"] },
    { name: "English", proficiency: "Fluent", skills: ["Read", "Write", "Speak"] },
    { name: "Tamil", proficiency: "Basic", skills: ["Speak"] }
  ],

  hobbies: [
    { name: "Photography", description: "Capturing moments through my lens", link: "https://www.instagram.com/stories.of_albin" },
    { name: "Video Editing", description: "Creating engaging visual content" },
    { name: "Event Management", description: "Organizing tech events and workshops" },
    { name: "Coding", description: "Building personal projects" }
  ],
  
  roles: [
    {
      title: "TinkerHub Campus Lead",
      organization: "TinkerHub",
      description: "Led community events and workshops, encouraging collaboration and innovation among students.",
      duration: "2022 - Present"
    },
    {
      title: "UIPATH Creative Head",
      organization: "UIPATH",
      description: "Managed creative campaigns and visual content for automation tools.",
      duration: "2021 - 2022"
    },
    {
      title: "IEEE LINK Representative",
      organization: "IEEE",
      description: "Represented my college in IEEE events, promoting tech and innovation.",
      duration: "2021 - Present"
    },
    {
      title: "mUlearn Community Member",
      organization: "mUlearn",
      description: "Engaged in learning and sharing knowledge within the mUlearn tech community.",
      duration: "2020 - Present"
    },
    {
      title: "IEDC Campus Operation Lead",
      organization: "IEDC",
      description: "Managed operations and helped with various entrepreneurial activities on campus.",
      duration: "2021 - 2022"
    },
    {
      title: "NSS Volunteer Secretary",
      organization: "NSS",
      description: "Led volunteer initiatives focused on social causes and community development.",
      duration: "2020 - 2021"
    }
  ],
  
  contact: {
    email: "albinbiju@example.com",
    linkedin: "https://linkedin.com/in/albinbiju",
    github: "https://github.com/albinbiju",
    instagram: "https://www.instagram.com/stories.of_albin"
  }
};

export default defaultPortfolioData;
