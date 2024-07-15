// userSlice.ts
import { StateCreator } from 'zustand';
import { getFromLocalStorage, setFromLocalStorage } from '@/lib/helper';

export interface UserState {
  email: string;
  accessToken: string | null;
  refreshToken: string | null;
  activeusers: { id: number, email: string, online?: boolean }[];
  onlineUsers: string[];
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setActiveUsers: (activeUsers: { id: number, email: string, online?: boolean }[]) => void;
  removeActiveUser: () => void;
  setOnlineUsers: (onlineUsers: string[]) => void;
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
  email: '',
  accessToken: getFromLocalStorage('accessToken'),
  refreshToken: getFromLocalStorage('refreshToken'),
  activeusers: JSON.parse(getFromLocalStorage('activeusers') || '[]'),
  onlineUsers: JSON.parse(getFromLocalStorage('onlineUsers') || '[]'),

  setTokens: (accessToken, refreshToken) => {
    try {
      const payloadBase64 = accessToken.split('.')[1];
      const decodedPayload: any = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
      set({ email: decodedPayload.email, accessToken, refreshToken });
      setFromLocalStorage('accessToken', accessToken);
      setFromLocalStorage('refreshToken', refreshToken);
    } catch (error) {
      console.error('Failed to decode access token:', error);
    }
  },

  clearTokens: () => {
    set({ accessToken: null, refreshToken: null });
    setFromLocalStorage('accessToken', null);
    setFromLocalStorage('refreshToken', null);
  },

  setActiveUsers: (activeUsers) => {
    set({ activeusers: [...activeUsers] });
    setFromLocalStorage('activeusers', JSON.stringify(activeUsers));
  },

  removeActiveUser: () => {
    set((state) => ({
      activeusers: state.activeusers.filter((user) => user.email !== state.email),
    }));
  },

  setOnlineUsers: (onlineUsers) => {
    set({ onlineUsers: [...onlineUsers] });
    setFromLocalStorage('onlineUsers', JSON.stringify(onlineUsers));
  },
});
