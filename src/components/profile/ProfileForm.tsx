
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkillSelector from "@/components/skills/SkillSelector";
import { currentUser } from "@/data/mockData";

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    location: currentUser?.location || "",
    profileImage: currentUser?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skillsToTeach: currentUser?.skillsToTeach || [],
    skillsToLearn: currentUser?.skillsToLearn || [],
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsToTeachChange = (skills: string[]) => {
    setProfile((prev) => ({
      ...prev,
      skillsToTeach: skills,
    }));
  };

  const handleSkillsToLearnChange = (skills: string[]) => {
    setProfile((prev) => ({
      ...prev,
      skillsToLearn: skills,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form
      if (!profile.name || !profile.email || !profile.bio || !profile.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      if (profile.skillsToTeach.length === 0 || profile.skillsToLearn.length === 0) {
        toast({
          title: "Skills required",
          description: "Please select at least one skill to teach and one to learn",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.profileImage} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button" className="w-full sm:w-auto">
                  Change Profile Picture
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about yourself, your background, and what you're excited to teach and learn"
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500">
                  Your bio helps others understand your experience and expertise
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <SkillSelector
                selectedSkills={profile.skillsToTeach}
                onChange={handleSkillsToTeachChange}
                label="Skills I Can Teach"
                placeholder="Select skills you can teach..."
                type="teach"
                maxSkills={5}
              />
              
              <SkillSelector
                selectedSkills={profile.skillsToLearn}
                onChange={handleSkillsToLearnChange}
                label="Skills I Want to Learn"
                placeholder="Select skills you want to learn..."
                type="learn"
                maxSkills={5}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-swap-purple hover:bg-swap-purple/90" 
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
