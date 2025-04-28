
import { useEffect } from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Profile = () => {
  useEffect(() => {
    document.title = "Your Profile | SkillSwap";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">
              Complete your profile to help others learn about your skills and experience.
            </p>
          </div>
          
          <ProfileForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
