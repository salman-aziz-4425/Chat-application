import { create } from 'zustand';

import { createUserSlice } from './userSlice';

const useBoundStore = create<UserState>()((...userData) => ({
  ...createUserSlice(...userData),
}));

export default useBoundStore;
