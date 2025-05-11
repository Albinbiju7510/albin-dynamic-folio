
export interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'technology' | 'tool' | 'soft';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

export interface Role {
  title: string;
  organization: string;
  description: string;
  duration: string;
}

export interface Language {
  name: string;
  proficiency: string;
  skills: string[];
}

export interface Hobby {
  name: string;
  description: string;
  link?: string;
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  other?: Record<string, string>;
}

export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: Skill[];
  projects: Project[];
  roles: Role[];
  languages: Language[];
  hobbies: Hobby[];
  contact: ContactInfo;
}
