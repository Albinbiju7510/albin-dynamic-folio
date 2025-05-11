
import React from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PortfolioData, Skill } from '@/types/portfolio';

interface SkillsFormProps {
  data: PortfolioData;
  onChange: (updatedData: PortfolioData) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    
    onChange({
      ...data,
      skills: updatedSkills,
    });
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: '',
      level: 50,
      category: 'programming',
    };
    
    onChange({
      ...data,
      skills: [...data.skills, newSkill],
    });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    
    onChange({
      ...data,
      skills: updatedSkills,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button size="sm" onClick={handleAddSkill}>
          <Plus className="h-4 w-4 mr-1" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        {data.skills.map((skill, index) => (
          <div key={index} className="p-4 border rounded-md mb-4 bg-secondary/20">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2 w-full mr-4">
                <Label htmlFor={`skill-name-${index}`}>Skill Name</Label>
                <Input
                  id={`skill-name-${index}`}
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  placeholder="e.g., JavaScript"
                />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveSkill(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <Label htmlFor={`skill-level-${index}`}>Proficiency Level: {skill.level}%</Label>
              </div>
              <Slider
                id={`skill-level-${index}`}
                value={[skill.level]}
                min={0}
                max={100}
                step={5}
                onValueChange={(values) => handleSkillChange(index, 'level', values[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`skill-category-${index}`}>Category</Label>
              <Select 
                value={skill.category} 
                onValueChange={(value) => handleSkillChange(index, 'category', value as Skill['category'])}
              >
                <SelectTrigger id={`skill-category-${index}`} className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming Language</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="soft">Soft Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        
        {data.skills.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No skills added yet. Click "Add Skill" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
