
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Message, mockMessages, mockUsers, currentUser } from "@/data/mockData";

interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow = ({ conversationId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const otherUser = mockUsers.find((user) => user.id === conversationId);
  
  useEffect(() => {
    // Fetch messages when conversation changes
    const conversationKey = Object.keys(mockMessages).find(key => 
      mockMessages[key].some(msg => 
        msg.senderId === conversationId || msg.receiverId === conversationId
      )
    );
    
    if (conversationKey) {
      setMessages(mockMessages[conversationKey]);
    } else {
      setMessages([]);
    }
    
    // Scroll to bottom on load
    scrollToBottom();
  }, [conversationId]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setIsLoading(true);
    
    // Create new message
    const message: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: conversationId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    // Add message with slight delay to simulate network
    setTimeout(() => {
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      setIsLoading(false);
    }, 500);
  };

  if (!otherUser) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <p className="mb-2">Select a conversation to start messaging</p>
        <p className="text-sm">No messages selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-medium">{otherUser.name}</h3>
            <p className="text-xs text-gray-500">{otherUser.location}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {/* Skill badges */}
          {otherUser.skillsToTeach.length > 0 && (
            <Badge className="bg-swap-green/10 text-swap-green border border-swap-green/20 hidden sm:inline-flex">
              {otherUser.skillsToTeach[0]}
            </Badge>
          )}
          
          {otherUser.skillsToLearn.length > 0 && (
            <Badge className="bg-swap-blue/10 text-swap-blue border border-swap-blue/20 hidden sm:inline-flex">
              {otherUser.skillsToLearn[0]}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No messages yet</p>
              <p className="text-sm">Send a message to start the conversation</p>
            </div>
          ) : (
            messages.map((message) => {
              const isSender = message.senderId === currentUser.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      isSender
                        ? "bg-swap-purple text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p 
                      className={`text-xs mt-1 ${
                        isSender ? "text-purple-200" : "text-gray-500"
                      }`}
                    >
                      {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            className="bg-swap-purple hover:bg-swap-purple/90"
            disabled={isLoading || !newMessage.trim()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
