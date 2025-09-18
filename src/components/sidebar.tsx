'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsBarChartLine } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';

const navItems = [
  { title: 'Dashboard', url: '/', icon: AiOutlineHome },
  { title: 'Posts', url: '/posts', icon: AiOutlineFileText },
  { title: 'Users', url: '/users', icon: AiOutlineUser },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname?.startsWith(path);
  };

  return (
    <motion.aside
      className={`bg-primary border-r border-border flex flex-col h-screen transition-all duration-300 ${
        isCollapsed ? 'w-14' : 'w-64'
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 56 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Brand / Toggle */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BsBarChartLine className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <motion.span
              className="font-bold text-primary-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Zettabyte
            </motion.span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="hover:bg-sidebar-accent p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <GiHamburgerMenu className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const active = isActive(item.url);
            return (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon
                    className={`h-4 w-4 ${!isCollapsed ? 'mr-3' : ''}`}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 * index }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Optional Stats Section */}
      {!isCollapsed && (
        <motion.div
          className="mt-auto p-4 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground font-medium">
              Quick Stats
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-sidebar-accent p-2 rounded-md">
                <div className="font-semibold text-sidebar-accent-foreground">
                  100
                </div>
                <div className="text-muted-foreground">Posts</div>
              </div>
              <div className="bg-sidebar-accent p-2 rounded-md">
                <div className="font-semibold text-sidebar-accent-foreground">
                  10
                </div>
                <div className="text-muted-foreground">Users</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
