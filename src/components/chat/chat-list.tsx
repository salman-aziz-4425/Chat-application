import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import NextImage from '../NextImage';
import { Message } from '../../types';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col px-4 py-4'
      ref={messagesContainerRef}
    >
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: 'string',
                bounce: 0.3,
                duration: messages.indexOf(message) * 0.05 + 0.2,
              },
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            className='py-2'
          >
            <div className={cn(message.author === 'Jane Doe' && 'justify-end')}>
              <div
                className={cn(
                  message.author === 'Jane Doe'
                    ? 'flex items-center flex-row-reverse gap-2'
                    : 'flex gap-2 items-center w-full',
                )}
              >
                <NextImage
                  useSkeleton
                  width={50}
                  height={50}
                  src='/User1.png'
                  alt='users'
                />
                <div
                  className={cn(
                    'bg-gray-300 flex flex-col p-3 shadow-md max-w-80 rounded-bl-lg break-all',
                    message.author === 'Jane Doe'
                      ? 'bg-green-200  rounded-l-lg rounded-br-lg'
                      : 'rounded-bl-lg rounded-r-lg',
                  )}
                >
                  <p className='text-gray-800 font-semibold'>
                    {message.author}
                  </p>
                  <p className='text-gray-800'>{message.content}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
