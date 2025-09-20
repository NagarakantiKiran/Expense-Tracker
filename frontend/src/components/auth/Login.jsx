import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    const res = await login(data);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm space-y-7 border border-gray-700 backdrop-blur-md"
      >
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold text-indigo-400 tracking-tight">Sign In</h2>
          <p className="text-gray-400 text-xs">Welcome back! Please login</p>
        </div>
        {error && (
          <div className="bg-red-900/60 text-red-200 px-4 py-2 rounded-lg text-xs text-center font-medium">
            {error}
          </div>
        )}
        <div className="space-y-3">
          <div>
            <input
              {...register('email', { required: true })}
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 text-sm outline-none transition-all"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              {...register('password', { required: true })}
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 text-sm outline-none transition-all"
              placeholder="Password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-base tracking-wide"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : 'Login'}
        </button>
        <div className="text-center text-xs text-gray-400 pt-2">
          Don&apos;t have an account?{' '}
          <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
