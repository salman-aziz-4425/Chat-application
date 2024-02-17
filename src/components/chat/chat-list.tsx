import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '../NextImage';
import { Message } from '../../types';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }: Props) => {
  return (
    <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col px-4 py-4'>
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
                    'bg-gray-300 flex flex-col p-3 shadow-md ',
                    message.author === 'Jane Doe'
                      ? 'bg-green-200  rounded-l-lg'
                      : 'rounded-r-lg ',
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
