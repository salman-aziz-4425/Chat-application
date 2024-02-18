import React, { useState } from 'react';

import Button from '../buttons/Button';

import { singleMessage } from '@/types';

interface ChatBottomBarProps {
  roomqMessages: (Messages: any) => void;
  Messages: singleMessage;
}

export default function ChatBottomBar({ roomMessages, Messages }: any) {
  const [Message, setMessages] = useState('');
  return (
    <div className='flex items-center gap-2 w-full py-2 px-8'>
      <input
        onChange={(e) => setMessages(e.target.value)}
        type='text'
        placeholder='Search messages...'
        className='w-full p-3 rounded-lg border-2 focus:outline-none focus:border-blue-500'
      />
      <Button
        variant='dark'
        size='base'
        title='send'
        onClick={() => {
          roomMessages({
            ...Messages,
            messages: [
              ...Messages.messages,
              {
                id: Messages.messages.length + 1,
                name: 'Jane Doe',
                message: Message,
              },
            ],
          });
        }}
      >
        Send
      </Button>
    </div>
  );
}
