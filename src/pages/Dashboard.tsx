
import { useEffect } from "react";
import DashboardComponent from "@/components/dashboard/Dashboard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MeetingPreference from "@/components/skills/MeetingPreference";

const Dashboard = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6">
            <MeetingPreference onPreferenceChange={handleMeetingPreference} />
          </div>
          <DashboardComponent />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
