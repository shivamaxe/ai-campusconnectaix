import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  LayoutDashboard, 
  UserCircle, 
  BookOpen, 
  Briefcase, 
  Bot, 
  Cpu, 
  Users, 
  BarChart3, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Define navigation based on role
  const getNavLinks = () => {
    const common = [
      { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { name: 'Profile', path: '/dashboard/profile', icon: <UserCircle className="w-5 h-5" /> },
    ];

    if (user?.role === 'student') {
      return [
        ...common,
        { name: 'Courses', path: '/dashboard/courses', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Jobs', path: '/dashboard/jobs', icon: <Briefcase className="w-5 h-5" /> },
        { name: 'AI Career Coach', path: '/dashboard/ai/coach', icon: <Bot className="w-5 h-5" /> },
        { name: 'Digital Twin', path: '/dashboard/ai/twin', icon: <Cpu className="w-5 h-5" /> },
      ];
    }

    if (user?.role === 'recruiter') {
      return [
        ...common,
        { name: 'Job Postings', path: '/dashboard/jobs/manage', icon: <Briefcase className="w-5 h-5" /> },
        { name: 'Applicants', path: '/dashboard/applicants', icon: <Users className="w-5 h-5" /> },
      ];
    }

    // Admin/Faculty
    return [
      ...common,
      { name: 'Students', path: '/dashboard/students', icon: <Users className="w-5 h-5" /> },
      { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    ];
  };

  const links = getNavLinks();

  return (
    <aside className="w-64 h-screen bg-[#0f172a]/95 backdrop-blur-xl border-r border-white/5 flex flex-col hidden md:flex sticky top-0 relative z-20 shadow-2xl">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <span className="text-lg font-bold font-['Outfit'] tracking-tight text-white">
            Campus<span className="text-gradient">Connect AI</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'}`}>
                  {link.icon}
                </div>
                <span className="relative z-10 font-medium text-sm tracking-wide">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-4 h-4 text-blue-400" />
              <p className="text-sm font-semibold text-white">Need help?</p>
            </div>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">Ask the AI Assistant for career guidance.</p>
            <button className="w-full text-xs font-semibold py-2 px-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg transition-all flex items-center justify-center gap-2" onClick={() => navigate('/dashboard/ai/coach')}>
              <MessageSquare className="w-3.5 h-3.5" />
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
