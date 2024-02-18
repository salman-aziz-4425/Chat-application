'use client';

import * as React from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import { userData } from '@/app/data';

import ChatBottomBar from './chat-bottombar';
import MessageList from './chat-list';
import ChatSidebar from './chat-sidebar';
import ChatTopbar from './chat-topbar';

import { Message } from '@/types';

export default function ChatLayout() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [roomMessages, setRoomMessages] = React.useState([] as any);

  React.useEffect(() => {
    window.screen.width <= 629 ? setIsMobile(true) : setIsMobile(false);
    setRoomMessages(userData[0]);
  }, []);

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='min-h-full max-w-full rounded-lg border box-border'
    >
      <ResizablePanel minSize={isMobile ? 10 : 24} maxSize={isMobile ? 10 : 30}>
        <ChatSidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel minSize={25} defaultSize={35}>
        <div className='flex flex-col justify-between h-full w-full'>
          <ChatTopbar />
          <MessageList
            key={roomMessages.id}
            messages={
              (roomMessages?.messages || []).map((data: any) => ({
                id: data?.id,
                author: data?.name,
                content: data?.message,
              })) as Message[]
            }
          />
          <ChatBottomBar
            Messages={roomMessages}
            roomMessages={setRoomMessages}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
