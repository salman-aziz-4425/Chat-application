import ky, { KyInstance } from 'ky';
import useBoundStore from '@/store/user/store';

const api: KyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = useBoundStore.getState().accessToken;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export default api;
