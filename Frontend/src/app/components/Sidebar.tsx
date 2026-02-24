import { Home, Users, Trophy, Brain, X } from 'lucide-react';
import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  const judgeLinks = [
    { to: '/judge', icon: Home, label: 'Dashboard' },
    { to: '/judge/teams', icon: Users, label: 'Evaluate Teams' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  const teamLinks = [
    { to: '/team', icon: Home, label: 'Dashboard' },
    { to: '/team/project', icon: Users, label: 'My Project' },
    { to: '/quiz', icon: Brain, label: 'Quiz' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  const links = user?.role === 'judge' ? judgeLinks : teamLinks;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-64 z-40
          bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl
          border-r border-white/10
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden self-end p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-4"
          >
            <X className="w-5 h-5" />
          </button>

          <nav className="flex-1 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Role Badge */}
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Role</p>
            <p className="font-semibold capitalize">
              {user?.role?.replace('-', ' ')}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
