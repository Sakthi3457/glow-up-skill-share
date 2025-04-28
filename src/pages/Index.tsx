
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { skillsList } from "@/data/mockData";

const Index = () => {
  useEffect(() => {
    document.title = "SkillSwap | Connect, Learn, Share Skills";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-swap-purple/10 to-swap-blue/5 -z-10"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-swap-purple/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-swap-blue/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-swap-purple via-swap-blue to-swap-pink bg-clip-text text-transparent animate-fade-in">
                Share Skills, Change Lives
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Connect with people around the world to teach what you know and learn what you don't.
                No money needed—just an eagerness to share and grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="bg-swap-purple hover:bg-swap-purple/90 text-lg px-8">
                    Get Started
                  </Button>
                </Link>
                <Link to="/auth?mode=login">
                  <Button size="lg" variant="outline" className="border-swap-purple text-swap-purple hover:bg-swap-purple/10 text-lg px-8">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Discover Skills to Share & Learn</h2>
              <p className="text-xl text-gray-600">
                From coding to cooking, language learning to yoga instruction, there's someone ready to swap skills with you.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {skillsList.slice(0, 12).map((skill) => (
                <div
                  key={skill}
                  className="skill-badge hover-scale bg-white shadow-sm border border-gray-200 px-4 py-2 rounded-full text-gray-800"
                >
                  {skill}
                </div>
              ))}
              <div className="skill-badge bg-swap-purple/10 text-swap-purple border border-swap-purple/20 px-4 py-2 rounded-full hover-scale">
                And many more...
              </div>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How SkillSwap Works</h2>
              <p className="text-xl text-gray-600">
                A simple process to connect, learn, and grow together
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="card-gradient border-0 shadow-md hover-scale">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-swap-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                  <p className="text-gray-600">
                    Sign up and tell us what you can teach and what you want to learn
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-gradient border-0 shadow-md hover-scale">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-swap-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Find Your Match</h3>
                  <p className="text-gray-600">
                    Get matched with people who want to learn your skills and can teach you theirs
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-gradient border-0 shadow-md hover-scale">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-swap-green rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Start Swapping</h3>
                  <p className="text-gray-600">
                    Schedule sessions, teach what you know, learn what you don't, and grow together
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials (placeholder) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600">
                Hear from our community of skill swappers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-swap-purple/20 flex items-center justify-center text-swap-purple font-bold text-xl mr-4">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium">James R.</h3>
                      <p className="text-sm text-gray-500">Taught JavaScript, Learned Spanish</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "I've been trying to learn Spanish for years but never committed to classes. Swapping my JavaScript knowledge for Spanish lessons made me accountable and made learning fun. Now I can code and order food in Barcelona!"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-swap-blue/20 flex items-center justify-center text-swap-blue font-bold text-xl mr-4">
                      M
                    </div>
                    <div>
                      <h3 className="font-medium">Maria T.</h3>
                      <p className="text-sm text-gray-500">Taught Yoga, Learned Digital Marketing</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "As a yoga instructor, I wanted to promote my classes online but didn't know where to start. I swapped yoga lessons for digital marketing help, and now my classes are fully booked! The person I taught is now much more relaxed and centered."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-swap-purple to-swap-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Swapping Skills?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community today and begin your journey of teaching and learning
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" variant="secondary" className="bg-white text-swap-purple hover:bg-gray-100 px-8 text-lg">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
