
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Conversation, mockConversations, mockUsers } from "@/data/mockData";

const MessageList = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const activeConversationId = searchParams.get("conversation");
  
  const getOtherParticipant = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find((id) => id !== "1");
    return mockUsers.find((user) => user.id === otherParticipantId);
  };
  
  const filteredConversations = conversations.filter((conversation) => {
    const otherUser = getOtherParticipant(conversation);
    if (!otherUser) return false;
    
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No conversations found
          </div>
        ) : (
          <ul className="divide-y">
            {filteredConversations.map((conversation) => {
              const otherUser = getOtherParticipant(conversation);
              if (!otherUser) return null;
              
              const isActive = activeConversationId === otherUser.id;
              
              return (
                <li key={conversation.id}>
                  <Link
                    to={`/messages?conversation=${otherUser.id}`}
                    className={cn(
                      "flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors",
                      isActive && "bg-swap-purple/5"
                    )}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
                      <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-gray-900 truncate">
                          {otherUser.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    
                    {conversation.unreadCount > 0 && (
                      <Badge className="rounded-full px-1.5 bg-swap-purple">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageList;
