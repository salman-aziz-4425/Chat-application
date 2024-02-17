'use client';

import * as React from 'react';

import ChatLayout from '../components/chat/chat-layout';

export default function HomePage() {
  return (
    <div className='flex flex-col h-screen px-4 lg:px-0 w-full justify-center items-center py-40'>
      <div className='z-10  rounded-lg max-w-5xl w-full h-full text-sm lg:flex'>
        <ChatLayout />
      </div>
    </div>
  );
}
