
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData } from '@/types/portfolio';

interface PersonalInfoFormProps {
  data: PortfolioData;
  onChange: (updatedData: PortfolioData) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    onChange({
      ...data,
      contact: {
        ...data.contact,
        [name]: value,
      },
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="about">About Me</Label>
          <Textarea
            id="about"
            name="about"
            value={data.about}
            onChange={handleChange}
            placeholder="Write something about yourself"
            className="min-h-[150px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.contact.email}
            onChange={handleContactChange}
            placeholder="Your email address"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            value={data.contact.linkedin || ''}
            onChange={handleContactChange}
            placeholder="https://linkedin.com/in/yourusername"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            type="url"
            value={data.contact.github || ''}
            onChange={handleContactChange}
            placeholder="https://github.com/yourusername"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
