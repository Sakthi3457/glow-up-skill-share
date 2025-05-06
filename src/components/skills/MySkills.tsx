
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SkillSelector from "@/components/skills/SkillSelector";
import { useToast } from "@/hooks/use-toast";

interface MySkillsProps {
  initialTeachSkills?: string[];
  initialLearnSkills?: string[];
  onSkillsUpdate?: (teachSkills: string[], learnSkills: string[]) => void;
}

const MySkills = ({ 
  initialTeachSkills = [], 
  initialLearnSkills = [],
  onSkillsUpdate 
}: MySkillsProps) => {
  const [teachSkills, setTeachSkills] = useState<string[]>(initialTeachSkills);
  const [learnSkills, setLearnSkills] = useState<string[]>(initialLearnSkills);
  const { toast } = useToast();
  
  const handleSaveSkills = () => {
    // Call the callback if provided
    if (onSkillsUpdate) {
      onSkillsUpdate(teachSkills, learnSkills);
    }
    
    // Show a success toast
    toast({
      title: "Skills updated",
      description: "Your skills have been successfully updated.",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">My Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <SkillSelector
              selectedSkills={teachSkills}
              onChange={setTeachSkills}
              label="Skills I Know"
              placeholder="Add skills you can teach"
              type="teach"
              maxSkills={8}
            />
          </div>
          
          <div>
            <SkillSelector
              selectedSkills={learnSkills}
              onChange={setLearnSkills}
              label="Skills I Want to Learn"
              placeholder="Add skills you want to learn"
              type="learn"
              maxSkills={8}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveSkills}
              className="bg-swap-purple hover:bg-swap-purple/90"
            >
              Save Skills
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MySkills;
