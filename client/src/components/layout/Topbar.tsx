import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { Bell, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Topbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="h-16 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 z-10 sticky top-0 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative hidden md:block w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/5 rounded-xl leading-5 bg-white/5 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-colors sm:text-sm"
            placeholder="Search for jobs, courses, or events..."
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-[#0f172a]"></span>
        </button>

        <div className="h-6 w-px bg-white/10 mx-1"></div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white leading-none mb-1">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-400 capitalize leading-none">{user?.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 ring-2 ring-white/10 cursor-pointer">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 ml-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
