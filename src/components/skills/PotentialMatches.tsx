
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

interface PotentialMatchesProps {
  userLearnSkills: string[];
  onMatchSelected?: (userId: string) => void;
}

const PotentialMatches = ({ 
  userLearnSkills,
  onMatchSelected 
}: PotentialMatchesProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Filter potential matches based on skills
  const potentialMatches = useMemo(() => {
    if (!userLearnSkills.length || !user) return [];
    
    return mockUsers.filter(mockUser => 
      mockUser.id !== user.id && // Don't include current user
      mockUser.teachingSkills.some(skill => 
        userLearnSkills.includes(skill)
      )
    );
  }, [userLearnSkills, user]);

  const handleSendRequest = () => {
    if (!selectedUserId) {
      toast({
        title: "No user selected",
        description: "Please select a user to connect with.",
        variant: "destructive"
      });
      return;
    }
    
    if (onMatchSelected) {
      onMatchSelected(selectedUserId);
    }
    
    toast({
      title: "Request sent!",
      description: "Your connection request has been sent.",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Find Your Match</CardTitle>
        <CardDescription>
          Connect with users who can teach you the skills you want to learn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Who would you like to meet?</label>
            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a potential match..." />
              </SelectTrigger>
              <SelectContent>
                {potentialMatches.length === 0 ? (
                  <SelectItem value="none" disabled>No matches found</SelectItem>
                ) : (
                  potentialMatches.map(match => (
                    <SelectItem key={match.id} value={match.id}>
                      {match.name} - {match.teachingSkills.filter(skill => 
                        userLearnSkills.includes(skill)
                      ).join(", ")}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSendRequest}
              className="bg-swap-green hover:bg-swap-green/90"
              disabled={!selectedUserId}
            >
              Send Connection Request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PotentialMatches;
