import React from 'react';

import Button from '../buttons/Button';

export default function ChatBottomBar() {
  return (
    <div className='flex items-center gap-2 w-full py-2 px-8'>
      <input
        type='text'
        placeholder='Search messages...'
        className='w-full p-3 rounded-lg border-2 focus:outline-none focus:border-blue-500'
      />
      <Button variant='dark' size='base' title='send'>
        Send
      </Button>
    </div>
  );
}
