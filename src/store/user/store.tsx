import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createUserSlice, UserState } from './userSlice';

const useBoundStore = create<UserState>()(
  persist(
    (set, get, api) => ({
      ...createUserSlice(set, get, api)
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  )
);

export default useBoundStore;
