import * as React from 'react';
import NextImage from '../NextImage';
import useBoundStore from '@/store/user/store';
import { BsCircleFill } from 'react-icons/bs'; // Import an icon for the status indicator

type User = {
  id: number;
  email: string;
  online: boolean;
};

interface ChatSidebarProps {
  users: User[];
  activeUsers: string[];
  setSelectedMail: (userEmail: string) => void; // Correct type for setSelectedMail
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ users, activeUsers: onlineUsers, setSelectedMail }) => {
  const { email: currentUserEmail } = useBoundStore((state) => state);

  const activeUsers = users?.filter((userData) => userData.email !== currentUserEmail);

  return (
    <div className='flex flex-col p-2 justify-center items-start'>
      <div className='sm:flex p-2 text-sm bg-gradient-to-r text-gray-600 from-green-900 to-black rounded-md'>
        <h1 className='text-white'>{currentUserEmail}</h1>
      </div>
      <div className='sm:flex gap-2 p-2 text-xl hidden'>
        <p className='font-medium'>Chats</p>
        <h1 className='text-zinc-800'>({users.length})</h1>
      </div>
      <div className='w-full flex flex-col items-start gap-2 md:p-2'>
        {activeUsers?.map((user) => {
          const name = user?.email.split('@')[0];
          const isOnline = onlineUsers.includes(user?.email);
          return (
            <div
              key={user.id}
              className='flex items-center gap-2 md:px-2 md:py-2 w-full transition duration-800 ease-in-out hover:bg-zinc-100 rounded-md'
              onClick={() => setSelectedMail(user?.email)}
            >
              <NextImage
                useSkeleton
                width={50}
                height={50}
                src='/User1.png'
                alt='User profile'
              />
              <div className='flex items-center'>
                <BsCircleFill color={isOnline ? 'green' : 'red'} className='mr-2' />
                <div className='sm:flex flex-col cursor-pointer hidden break-all'>
                  <p className='font-medium'>{name}</p>
                  <p className='text-zinc-300'>{isOnline ? 'Online' : 'Offline'}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
