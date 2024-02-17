'use-client';

import * as React from 'react';

import NextImage from '../NextImage';
import { userData } from '../../app/data';

export default function ChatSidebar() {
  return (
    <div className='flex flex-col p-2 justify-center items-start '>
      <div className='sm:flex gap-2 p-2 text-2xl  hidden'>
        <p className='font-medium '>Chats</p>
        <h1 className='text-zinc-300'>(4)</h1>
      </div>
      <div className='w-full flex flex-col items-start gap-2 md:p-2 '>
        {userData.map((user) => (
          <div
            key={user.id}
            className='flex items-center gap-2 md:px-4 md:py-2 w-full transition duration-800 ease-in-out  hover:bg-zinc-100 rounded-md'
          >
            <NextImage
              useSkeleton
              width={50}
              height={50}
              src='/User1.png'
              alt='users'
            />
            <div className='sm:flex flex-col cursor-pointer hidden break-all'>
              <p className='font-medium'>{user.name}</p>
              <p className='text-zinc-300'>Hey, Jakob</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
