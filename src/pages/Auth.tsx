
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  
  useEffect(() => {
    // Update page title based on auth mode
    document.title = mode === "login" ? "Login | SkillSwap" : "Sign Up | SkillSwap";
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {mode === "login" ? "Welcome Back!" : "Join SkillSwap"}
            </h1>
            <p className="text-gray-600">
              {mode === "login"
                ? "Sign in to continue your skill-swapping journey"
                : "Connect with others, share your knowledge, and learn new skills"}
            </p>
          </div>
          
          <AuthForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
