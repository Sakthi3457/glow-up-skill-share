
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/data/mockData";

const Waitlist = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Waitlist | SkillSwap";
  }, []);

  // Filter users who are on waitlist (for demo purposes, we'll just use some mock users)
  const waitlistUsers = mockUsers.filter((mockUser) => 
    mockUser.id !== user?.id // Don't show current user
  ).slice(0, 5); // Just show a few for demo

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-bold">Skill Swap Waitlist</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {waitlistUsers.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No users currently on the waitlist.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {waitlistUsers.map((waitlistUser) => (
                    <div 
                      key={waitlistUser.id} 
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 mb-3 md:mb-0">
                        <div className="h-10 w-10 rounded-full bg-swap-purple/20 flex items-center justify-center">
                          <span className="font-semibold text-swap-purple">{waitlistUser.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{waitlistUser.name}</h3>
                          <p className="text-sm text-gray-500">{waitlistUser.location}</p>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-auto">
                        <p className="text-sm mb-2">Wants to learn:</p>
                        <div className="flex flex-wrap gap-2">
                          {waitlistUser.learningSkills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-swap-blue/10 text-swap-blue border border-swap-blue/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <Button size="sm" className="bg-swap-purple hover:bg-swap-purple/90">
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Waitlist;
