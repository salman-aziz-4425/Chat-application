'use-client';

import * as React from 'react';

import NextImage from '../NextImage';

export default function ChatTopbar({ selectedUser }: any) {
  return (
    <div className='px-4 py-4 border-b flex gap-2 items-center font-bold text-base'>
      <NextImage
        useSkeleton
        width={45}
        height={45}
        src='/User1.png'
        alt='users'
      />
      <h1>{selectedUser}</h1>
    </div>
  );
}
