
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MeetingPreference from "@/components/skills/MeetingPreference";
import MySkills from "@/components/skills/MySkills";
import PotentialMatches from "@/components/skills/PotentialMatches";
import { useAuth } from '../context/AuthContext';
import { currentUser } from "@/data/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  // Using currentUser from mockData for the initial skills, would come from backend in real app
  const [teachSkills, setTeachSkills] = useState<string[]>(currentUser.teachingSkills || []);
  const [learnSkills, setLearnSkills] = useState<string[]>(currentUser.learningSkills || []);

  useEffect(() => {
    document.title = "Dashboard | SkillSwap";
  }, []);

  const handleMeetingPreference = (data: {
    type: "online" | "in-person";
    platform?: string;
    location?: string;
  }) => {
    console.log("Meeting preference:", data);
    // This will be connected to backend later
  };

  const handleSkillsUpdate = (newTeachSkills: string[], newLearnSkills: string[]) => {
    setTeachSkills(newTeachSkills);
    setLearnSkills(newLearnSkills);
    console.log("Updated skills:", { teach: newTeachSkills, learn: newLearnSkills });
    // This would be saved to backend in a real app
  };

  const handleMatchSelected = (userId: string) => {
    console.log("Selected match:", userId);
    // This would send a request in a real app
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          {/* Welcome Banner with dynamic greeting */}
          <div className="bg-gradient-to-r from-swap-purple/10 to-swap-blue/10 rounded-xl p-6 mb-8">
            <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Skill Swapper'}! 👋</h1>
            <p className="text-gray-600 mt-2">
              Your skill exchange journey continues. Check your matches and requests below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1">
              {/* Meeting Preference */}
              <div className="mb-6">
                <MeetingPreference onPreferenceChange={handleMeetingPreference} />
              </div>
              
              {/* Potential Matches */}
              <div>
                <PotentialMatches 
                  userLearnSkills={learnSkills} 
                  onMatchSelected={handleMatchSelected}
                />
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              {/* My Skills */}
              <MySkills 
                initialTeachSkills={teachSkills}
                initialLearnSkills={learnSkills}
                onSkillsUpdate={handleSkillsUpdate}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
