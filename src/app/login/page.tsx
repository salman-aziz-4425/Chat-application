'use client';
import { useAuth } from '@/service/auth.service';
import useBoundStore from '@/store/user/store';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const Login: React.FC = () => {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);

      router.push('/chat')
    } catch (error: any) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-900 to-black">
      <div className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end mb-4">
            <p className="text-sm text-blue-600 cursor-pointer hover:underline">Forgot your password?</p>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Create Account</span>
        </p>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
