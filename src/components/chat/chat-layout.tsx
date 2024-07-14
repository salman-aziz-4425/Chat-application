import * as React from 'react';
import { Socket } from 'socket.io-client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Message } from '@/types';

import ChatBottomBar from './chat-bottombar';
import ChatSidebar from './chat-sidebar';
import ChatTopbar from './chat-topbar';
import MessageList from './chat-list';
import useBoundStore from '@/store/user/store';

type User = {
  id: number;
  email: string;
  online: boolean;
};

interface ChatLayoutProps {
  socket: Socket;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ socket }) => {
  const { email, activeusers } = useBoundStore((state) => state);

  const [isMobile, setIsMobile] = React.useState(false);
  const [roomMessages, setRoomMessages] = React.useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);
  const [selectedMail, setSelectedMail] = React.useState<string>("");

  React.useEffect(() => {
    setSelectedMail(activeusers[0].email)
  }, [])

  const handleActiveUsers = React.useCallback((activeUsers: string[]) => {
    setOnlineUsers(activeUsers);
  }, []);

  const handleReceiveMessage = React.useCallback((message: any) => {
    // if (message.sender !== selectedMail) { return setRoomMessages((prevMessage) => prevMessage) }
    setRoomMessages(prevMessages => {
      return [...prevMessages, message];
    });
  }, []);

  React.useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.screen.width <= 629);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    if (email && socket && selectedMail) {
      socket.on('active_user', handleActiveUsers);
      socket.on('receive_message', handleReceiveMessage);
    }
    return () => {
      if (socket) {
        socket.off('active_user', handleActiveUsers).off();
        socket.off('receive_message', handleReceiveMessage).off();
      }
      window.removeEventListener('resize', updateIsMobile);
    };
  }, [socket, email, selectedMail]);


  const handleUserSelection = (userEmail: string) => {
    setSelectedMail(userEmail);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-full max-w-full rounded-lg border box-border"
    >
      <ResizablePanel minSize={isMobile ? 10 : 24} maxSize={isMobile ? 10 : 30}>
        <ChatSidebar users={activeusers as User[]} activeUsers={onlineUsers} setSelectedMail={handleUserSelection} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={25} defaultSize={35}>
        <div className="flex flex-col justify-between h-full w-full">
          <ChatTopbar selectedUser={selectedMail} />
          {selectedMail && <MessageList
            selectedUser={selectedMail}
            messages={roomMessages}
          />}

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
