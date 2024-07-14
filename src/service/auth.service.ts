import api from "@/lib/ky";
import useBoundStore from "@/store/user/store";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { accessToken, refreshToken, setTokens, clearTokens } = useBoundStore((state) => state);
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      const response: Response = await api.post("user/login", {
        json: { email, password }
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { accessToken, refreshToken } = await response.json();
      setTokens(accessToken, refreshToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to log in');
    }
  };

  const logout = () => {
    clearTokens();
    router.push("/")
  };

  const isAuthenticated = () => {
    return !!accessToken;
  };

  return {
    login,
    logout,
    isAuthenticated,
    accessToken,
    refreshToken,
  };
}
