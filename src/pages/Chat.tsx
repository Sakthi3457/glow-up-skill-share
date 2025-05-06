import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export default function Chat() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data - replace with actual data from your backend
  const conversations: Conversation[] = [
    {
      id: 1,
      user: {
        id: '1',
        name: 'John Doe',
        avatar: 'J',
      },
      lastMessage: 'Hey, are you available for a JavaScript session tomorrow?',
      lastMessageTime: '10:30 AM',
      unread: 2,
    },
    {
      id: 2,
      user: {
        id: '2',
        name: 'Jane Smith',
        avatar: 'J',
      },
      lastMessage: 'Thanks for the Spanish lesson!',
      lastMessageTime: 'Yesterday',
      unread: 0,
    },
    {
      id: 3,
      user: {
        id: '3',
        name: 'Mike Johnson',
        avatar: 'M',
      },
      lastMessage: 'When can we schedule the next guitar lesson?',
      lastMessageTime: '2 days ago',
      unread: 1,
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      senderId: '1',
      receiverId: user?.id || '',
      content: 'Hey, are you available for a JavaScript session tomorrow?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      senderId: user?.id || '',
      receiverId: '1',
      content: 'Yes, I can do tomorrow afternoon. What time works for you?',
      timestamp: '10:32 AM',
    },
    {
      id: 3,
      senderId: '1',
      receiverId: user?.id || '',
      content: 'How about 2 PM?',
      timestamp: '10:33 AM',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // TODO: Implement message sending logic
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Messages</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="flex h-[600px]">
              {/* Conversations list */}
              <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
                <div className="h-full overflow-y-auto">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedConversation === conversation.id
                          ? 'bg-gray-50 dark:bg-gray-700'
                          : ''
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {conversation.user.avatar}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {conversation.user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.lastMessageTime}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600">
                            <span className="text-xs font-medium text-white">
                              {conversation.unread}
                            </span>
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat header */}
                    <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {conversations.find((c) => c.id === selectedConversation)?.user.avatar}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {conversations.find((c) => c.id === selectedConversation)?.user.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              message.senderId === user?.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.senderId === user?.id
                                  ? 'text-blue-100'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message input */}
                    <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                      <form onSubmit={handleSendMessage} className="flex space-x-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a conversation to start chatting
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 