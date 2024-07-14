// userSlice.ts
import { StateCreator } from 'zustand';

export interface UserState {
  email: string;
  accessToken: string | null;
  refreshToken: string | null;
  activeusers: { id: number, email: string, online?: boolean }[];
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setActiveUsers: (activeUsers: { id: number, email: string }[]) => void;
  removeActiveUser: () => void
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
  email: '',
  accessToken: null,
  refreshToken: null,
  activeusers: [],
  setTokens: (accessToken, refreshToken) => {
    try {
      const payloadBase64 = accessToken.split('.')[1];
      const decodedPayload: any = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
      set({ email: decodedPayload.email, accessToken, refreshToken });
    } catch (error) {
      console.error('Failed to decode access token:', error);
    }
  },
  clearTokens: () => set({ accessToken: null, refreshToken: null }),
  setActiveUsers: (activeUsers: { id: number, email: string, online?: boolean }[]) => {
    set({ activeusers: [...activeUsers] })
  },
  removeActiveUser: () =>
    set((state) => ({
      activeusers: state.activeusers.filter((user) => user.email !== state.email),
    })),
});
