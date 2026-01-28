import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  ClipboardList, 
  FileText
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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div 
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full
                transition-all duration-300
                ${isActive 
                  ? 'bg-white/[0.08] text-white/90' 
                  : 'text-white/40 hover:text-white/60'
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
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
