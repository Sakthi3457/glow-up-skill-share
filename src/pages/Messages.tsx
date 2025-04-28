
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MessageList from "@/components/messaging/MessageList";
import ChatWindow from "@/components/messaging/ChatWindow";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversation") || "";
  
  useEffect(() => {
    document.title = "Messages | SkillSwap";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">
              Connect with your skill swap partners through direct messaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
            <div className="md:col-span-1 h-full">
              <MessageList />
            </div>
            
            <div className="md:col-span-2 h-full">
              <ChatWindow conversationId={conversationId} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
