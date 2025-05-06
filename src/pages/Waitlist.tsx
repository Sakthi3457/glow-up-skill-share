
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockUsers, User } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Waitlist() {
  const [waitlistUsers, setWaitlistUsers] = useState<User[]>(mockUsers.slice(0, 3));
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  
  // Mock skills for filtering
  const allSkills = Array.from(new Set(waitlistUsers.flatMap(user => user.skillsToLearn)));
  
  const filteredUsers = selectedSkill
    ? waitlistUsers.filter(user => user.skillsToLearn.includes(selectedSkill))
    : waitlistUsers;

  const handleApprove = (userId: string) => {
    setWaitlistUsers(prev => prev.filter(user => user.id !== userId));
    // In a real app, this would update the database
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Waitlist</h1>
        
        <div className="flex space-x-2">
          <select 
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No users in the waitlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.map(user => (
            <Card key={user.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-medium">{user.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{user.location}</p>
                    
                    <p className="mb-2 text-sm text-gray-600">{user.bio}</p>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Skills to Learn:</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {user.skillsToLearn.map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Can Teach:</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {user.skillsToTeach.map(skill => (
                          <Badge key={skill} className="bg-blue-100 text-blue-800 border-blue-200">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col gap-2 mt-4 sm:mt-0">
                    <Button 
                      variant="default" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(user.id)}
                    >
                      Approve
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                      Decline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
