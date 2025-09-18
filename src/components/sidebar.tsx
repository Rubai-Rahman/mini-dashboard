'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineUser,
} from 'react-icons/ai';
import { IoBarChartOutline } from 'react-icons/io5';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

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
      className={`flex flex-col h-screen shadow-2xl  text-gray-100`}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Brand + Toggle */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-2 bg-blue-700 rounded-lg">
            <IoBarChartOutline className="size-5 text-white" />
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="font-bold text-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Zettabyte
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {isCollapsed ? (
            <MdKeyboardDoubleArrowRight className="size-5" />
          ) : (
            <MdKeyboardDoubleArrowLeft className="size-5" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const active = isActive(item.url);
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link
                  href={item.url}
                  className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <item.icon className="size-5" />
                  </motion.div>

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className="ml-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Stats Section */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="mt-auto p-4 border-t border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-400">
                Quick Stats
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <motion.div
                  className="bg-gray-700 p-2 rounded-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="font-semibold text-white">100</div>
                  <div className="text-gray-400">Posts</div>
                </motion.div>
                <motion.div
                  className="bg-gray-700 p-2 rounded-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="font-semibold text-white">10</div>
                  <div className="text-gray-400">Users</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
