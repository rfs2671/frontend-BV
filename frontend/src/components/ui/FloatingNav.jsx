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
  Building2
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
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="
        flex items-center gap-1
        bg-[#0a0a14]/90 backdrop-blur-2xl
        border border-white/[0.08]
        rounded-2xl p-2
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
      ">
        {/* Logo */}
        <div className="px-4 py-2 flex items-center gap-2 border-r border-white/[0.08] mr-2">
          <Building2 className="w-4 h-4 text-white/50" strokeWidth={1.5} />
          <span className="text-xs font-semibold tracking-[0.2em] text-white/70">
            BLUEVIEW
          </span>
        </div>

        {/* Nav Items */}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex items-center gap-2 px-4 py-3 rounded-xl
                transition-all duration-300
                ${isActive 
                  ? 'bg-white/[0.08] text-white' 
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                }
              `}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-xs font-medium hidden md:block">{item.label}</span>
            </motion.button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-8 bg-white/[0.08] mx-2" />

        {/* User */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-2">
            <div className="text-right">
              <div className="text-xs font-medium text-white/70">{user.name}</div>
              <div className="text-[10px] text-white/30">{user.role}</div>
            </div>
          </div>
        )}
        
        {/* Logout */}
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
