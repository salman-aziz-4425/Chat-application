import * as React from 'react';
import { Socket } from 'socket.io-client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Message } from '@/types/types';

import ChatBottomBar from './chat-bottombar';
import ChatSidebar from './chat-sidebar';
import ChatTopbar from './chat-topbar';
import MessageList from './chat-list';
import useBoundStore from '@/store/user/store';
import { useAuth } from '@/service/auth.service';
import api from '@/lib/ky';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type User = {
  id: number;
  email: string;
  online: boolean;
};

interface ChatLayoutProps {
  socket: Socket;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ socket }) => {
  const { email, activeusers, setOnlineUsers, onlineUsers } = useBoundStore((state) => state);

  const [isMobile, setIsMobile] = React.useState(false);
  const [roomMessages, setRoomMessages] = React.useState<Message[]>([]);
  const [selectedMail, setSelectedMail] = React.useState<string>("");
  const [ignoredMessages, setIgnoredMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    if (activeusers.length > 0) {
      setSelectedMail(activeusers[0].email);
      fetchMessages(email, activeusers[0].email);
    }
  }, [activeusers]);

  const handleActiveUsers = React.useCallback((activeUsers: string[]) => {
    console.log("active users event");
    if (!activeUsers.includes(email)) {
      socket.emit('user_online', { email });
    }
    setOnlineUsers(activeUsers);
  }, [socket, email]);

  const handleReceiveMessage = React.useCallback((message: Message) => {
    if (message.sender !== selectedMail) {
      setIgnoredMessages(prev => [...prev, message]);
      return;
    }
    setRoomMessages(prevMessages => [...prevMessages, message]);
  }, [selectedMail]);

  const updateIsMobile = React.useCallback(() => {
    setIsMobile(window.screen.width <= 629);
  }, []);

  React.useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    if (email && socket && selectedMail) {
      socket.on('active_user', handleActiveUsers);
      socket.on('receive_message', handleReceiveMessage);
    }
    return () => {
      socket.off('active_user', handleActiveUsers);
      socket.off('receive_message', handleReceiveMessage);
      window.removeEventListener('resize', updateIsMobile);
    };
  }, [socket, email, selectedMail]);

  const fetchMessages = async (sender: string, recipient: string) => {
    try {
      const response = await api.get(`chat/messages?sender=${sender}&recipient=${recipient}`);
      const data: Message[] = await response.json();
      setRoomMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleUserSelection = (userEmail: string) => {
    setSelectedMail(userEmail);
    fetchMessages(email, userEmail);
    // Remove messages from the selected user from ignoredMessages
    setIgnoredMessages(prevIgnoredMessages =>
      prevIgnoredMessages.filter(message => message.sender !== userEmail)
    );
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-full max-w-full rounded-lg border box-border"
    >
      <ResizablePanel minSize={isMobile ? 10 : 24} maxSize={isMobile ? 10 : 30}>
        <ChatSidebar users={activeusers as User[]} activeUsers={onlineUsers} setSelectedMail={handleUserSelection} ignoredMessages={ignoredMessages} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={25} defaultSize={35}>
        <div className="flex flex-col justify-between h-full w-full">
          <ChatTopbar selectedUser={selectedMail} />
          {selectedMail && (
            <MessageList
              selectedUser={selectedMail}
              messages={roomMessages}
            />
          )}
          <ChatBottomBar
            roomMessages={roomMessages}
            setroomMessages={setRoomMessages}
            socket={socket}
            reciver={selectedMail}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChatLayout;
