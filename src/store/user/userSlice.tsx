import { StateCreator } from 'zustand';

export const createUserSlice: StateCreator<UserState> = (set) => ({
  username: '',
  password: '',
  addUser: ({ username, password }: UserState) =>
    set(() => ({
      username,
      password,
    })),
});
