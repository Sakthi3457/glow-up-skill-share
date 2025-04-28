
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { currentUser, mockMatchRequests, mockUsers, MatchRequest } from "@/data/mockData";

const Dashboard = () => {
  const [matchRequests, setMatchRequests] = useState<MatchRequest[]>(mockMatchRequests);
  const { toast } = useToast();

  const pendingRequests = matchRequests.filter((request) => request.status === "pending");
  const activeMatches = matchRequests.filter((request) => request.status === "accepted");

  const handleRequestAction = (requestId: string, action: "accepted" | "rejected") => {
    setMatchRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: action }
          : request
      )
    );

    toast({
      title: `Request ${action}`,
      description: `You have ${action} the skill swap request`,
    });
  };

  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="border-0 bg-gradient-to-r from-swap-purple/10 to-swap-blue/10">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">Welcome, {currentUser.name}! 👋</h1>
              <p className="text-gray-600">
                Your skill exchange journey continues. Check your matches and requests below.
              </p>
            </div>
            <Link to="/profile">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Matches</CardTitle>
            <CardDescription>
              People you're currently swapping skills with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-swap-purple">
              {activeMatches.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Pending Requests</CardTitle>
            <CardDescription>
              Skill swap requests waiting for action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-swap-blue">
              {pendingRequests.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Your Rating</CardTitle>
            <CardDescription>
              Average rating from previous swaps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-swap-orange">
                {currentUser.rating}
              </span>
              <div className="ml-2 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(currentUser.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 fill-current"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Skill Swap Requests</TabsTrigger>
          <TabsTrigger value="matches">Active Matches</TabsTrigger>
          <TabsTrigger value="badges">My Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">No pending requests at the moment.</p>
                <Link to="/search" className="mt-4 inline-block">
                  <Button>Find Skill Matches</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map(request => {
              const requester = getUserById(request.requesterId);
              return requester ? (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={requester.profileImage} alt={requester.name} />
                        <AvatarFallback>{requester.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-medium">{requester.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{requester.location}</p>
                        
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                          <Badge className="bg-swap-green/10 text-swap-green border border-swap-green/20">
                            Teaches: {request.requesterTeachSkill}
                          </Badge>
                          <Badge className="bg-swap-blue/10 text-swap-blue border border-swap-blue/20">
                            Learns: {request.requesterLearnSkill}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600">"{request.message}"</p>
                      </div>
                      
                      <div className="flex space-x-2 md:self-center">
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleRequestAction(request.id, "rejected")}
                        >
                          Decline
                        </Button>
                        <Button
                          className="bg-swap-green hover:bg-swap-green/90"
                          onClick={() => handleRequestAction(request.id, "accepted")}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })
          )}
        </TabsContent>
        
        <TabsContent value="matches" className="space-y-4">
          {activeMatches.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">No active matches. Accept some requests to start swapping!</p>
              </CardContent>
            </Card>
          ) : (
            activeMatches.map(match => {
              const matchedUser = getUserById(match.requesterId);
              return matchedUser ? (
                <Card key={match.id} className="hover:border-swap-purple/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={matchedUser.profileImage} alt={matchedUser.name} />
                        <AvatarFallback>{matchedUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-medium">{matchedUser.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{matchedUser.location}</p>
                        
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                          <Badge className="bg-swap-green/10 text-swap-green border border-swap-green/20">
                            Teaches: {match.requesterTeachSkill}
                          </Badge>
                          <Badge className="bg-swap-blue/10 text-swap-blue border border-swap-blue/20">
                            Learns: {match.requesterLearnSkill}
                          </Badge>
                        </div>
                      </div>
                      
                      <Link to={`/messages?conversation=${matchedUser.id}`}>
                        <Button className="bg-swap-purple hover:bg-swap-purple/90">
                          Message
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })
          )}
        </TabsContent>
        
        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievement Badges</CardTitle>
              <CardDescription>
                Earn badges by participating in skill swaps and helping others learn
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentUser.badges.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  You haven't earned any badges yet. Complete your first skill swap to start collecting badges!
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentUser.badges.map(badge => (
                    <Card key={badge.id} className="overflow-hidden hover-scale">
                      <div className="bg-gradient-to-br from-swap-purple to-swap-pink h-3"></div>
                      <CardContent className="pt-6 text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-swap-purple/10 text-swap-purple mb-4">
                          {badge.icon === "trophy" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trophy"
                            >
                              <path d="M6 9H4.5a1.5 1.5 0 0 1 0-3h.5"></path>
                              <path d="M18 9h1.5a1.5 1.5 0 0 0 0-3h-.5"></path>
                              <path d="M4 22h16"></path>
                              <path d="M10 22v-4.5a2.5 2.5 0 0 1 5 0V22"></path>
                              <rect width="16" height="8" x="4" y="2" rx="2"></rect>
                              <path d="M8 10v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-5"></path>
                            </svg>
                          )}
                          {badge.icon === "message-circle" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-message-circle"
                            >
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                          )}
                        </div>
                        <h3 className="text-base font-semibold">{badge.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
