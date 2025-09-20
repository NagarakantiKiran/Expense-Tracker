import React from 'react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-indigo-700 text-white mb-8 rounded-b-xl shadow">
      <div className="text-2xl font-bold tracking-tight">Expense Tracker</div>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium">{user.name}</span>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="hover:underline">
              Login
            </a>
            <a href="/register" className="hover:underline">
              Register
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
