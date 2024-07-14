import React, { useState, useEffect } from 'react';
import Button from '../buttons/Button';
import useBoundStore from '@/store/user/store';

const ChatBottomBar = ({ roomMessages, setroomMessages, reciver, socket }: any) => {
  const { email } = useBoundStore((state) => state);
  const [message, setMessage] = useState('');

  useEffect(() => {
    return () => {
      socket.off('send_message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    setroomMessages([...roomMessages, { sender: email, recipient: reciver, message }]);
    socket.emit('send_message', { sender: email, recipient: reciver, message });
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='flex items-center gap-2 w-full py-2 px-8'>
      <input
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        value={message}
        type='text'
        placeholder='Type your message...'
        className='w-full p-3 rounded-lg border-2 focus:outline-none focus:border-blue-500'
      />
      <Button variant='dark' size='base' title='Send' onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default ChatBottomBar;
