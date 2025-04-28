
import { useEffect } from "react";
import DashboardComponent from "@/components/dashboard/Dashboard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | SkillSwap";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <DashboardComponent />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
