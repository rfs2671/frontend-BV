import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  ClipboardList, 
  FileText, 
  LogOut
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div 
        className="flex items-center gap-2 px-3 py-3 rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
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
                flex items-center gap-2 px-5 py-3 rounded-full
                transition-all duration-300
                ${isActive 
                  ? 'bg-white/[0.08] text-white/90' 
                  : 'text-white/35 hover:text-white/60'
                }
              `}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className={`text-sm font-medium ${isActive ? '' : 'hidden md:block'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-white/[0.08] mx-2" />

        {/* Logout */}
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
