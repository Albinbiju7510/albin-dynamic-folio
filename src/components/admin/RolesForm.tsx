
import React from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioData, Role } from '@/types/portfolio';

interface RolesFormProps {
  data: PortfolioData;
  onChange: (updatedData: PortfolioData) => void;
}

const RolesForm: React.FC<RolesFormProps> = ({ data, onChange }) => {
  const handleRoleChange = (index: number, field: keyof Role, value: string) => {
    const updatedRoles = [...data.roles];
    updatedRoles[index] = {
      ...updatedRoles[index],
      [field]: value,
    };
    
    onChange({
      ...data,
      roles: updatedRoles,
    });
  };

  const handleAddRole = () => {
    const newRole: Role = {
      title: '',
      organization: '',
      description: '',
      duration: '',
    };
    
    onChange({
      ...data,
      roles: [...data.roles, newRole],
    });
  };

  const handleRemoveRole = (index: number) => {
    const updatedRoles = data.roles.filter((_, i) => i !== index);
    
    onChange({
      ...data,
      roles: updatedRoles,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Leadership & Roles</CardTitle>
        <Button size="sm" onClick={handleAddRole}>
          <Plus className="h-4 w-4 mr-1" />
          Add Role
        </Button>
      </CardHeader>
      <CardContent>
        {data.roles.map((role, index) => (
          <div key={index} className="p-4 border rounded-md mb-4 bg-secondary/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium">Role #{index + 1}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveRole(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor={`role-title-${index}`}>Role Title</Label>
                <Input
                  id={`role-title-${index}`}
                  value={role.title}
                  onChange={(e) => handleRoleChange(index, 'title', e.target.value)}
                  placeholder="e.g., Project Lead"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`role-org-${index}`}>Organization</Label>
                <Input
                  id={`role-org-${index}`}
                  value={role.organization}
                  onChange={(e) => handleRoleChange(index, 'organization', e.target.value)}
                  placeholder="e.g., TinkerHub"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`role-desc-${index}`}>Description</Label>
                <Textarea
                  id={`role-desc-${index}`}
                  value={role.description}
                  onChange={(e) => handleRoleChange(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`role-duration-${index}`}>Duration</Label>
                <Input
                  id={`role-duration-${index}`}
                  value={role.duration}
                  onChange={(e) => handleRoleChange(index, 'duration', e.target.value)}
                  placeholder="e.g., 2020 - Present"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
        
        {data.roles.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No roles added yet. Click "Add Role" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RolesForm;
