import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  ClipboardList, 
  FileText, 
  LogOut,
  HardHat 
} from 'lucide-react';

const FloatingNav = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/workers', icon: Users, label: 'Workers' },
    { path: '/daily-log', icon: ClipboardList, label: 'Daily Log' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="
        flex items-center gap-2
        bg-black/60 backdrop-blur-2xl
        border border-white/10
        rounded-2xl p-2
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
      ">
        {/* Logo */}
        <div className="px-4 py-2 flex items-center gap-2 border-r border-white/10">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <HardHat className="w-5 h-5 text-orange-500" />
          </motion.div>
          <span className="text-sm font-bold tracking-[0.2em] text-white hidden sm:block">
            BLUEVIEW
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex items-center gap-2 px-4 py-3 rounded-xl
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-orange-500/20 text-white' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium hidden md:block">{item.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-orange-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" />

        {/* User & Logout */}
        <div className="flex items-center gap-2 px-2">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-medium text-white">{user.name}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">{user.role}</div>
              </div>
            </div>
          )}
          
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
