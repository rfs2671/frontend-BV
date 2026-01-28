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
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="nav-glass flex items-center gap-1 px-2 py-2 relative">
        {/* Active indicator background - animated */}
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          if (!isActive) return null;
          
          return (
            <motion.div
              key={`indicator-${item.path}`}
              layoutId="activeNavBg"
              className="absolute bg-white/15 rounded-2xl"
              style={{
                height: 'calc(100% - 16px)',
                top: '8px',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          );
        })}
        
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
                relative flex items-center gap-2 px-5 py-3 rounded-2xl z-10
                transition-colors duration-200
                ${isActive 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/70'
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
