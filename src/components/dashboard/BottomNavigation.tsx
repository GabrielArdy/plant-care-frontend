'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbHome, TbScan, TbHistory, TbUser, TbPlant2 } from 'react-icons/tb';
import { motion } from 'framer-motion';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center justify-center w-full p-2 ${
        isActive ? 'text-green' : 'text-gray-500'
      }`}
    >
      <div className="relative">
        {isActive && (
          <motion.div
            layoutId="bubble"
            className="absolute -inset-1 rounded-full bg-green/10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative">{icon}</span>
      </div>
      <span className="text-xs mt-1">{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 w-1/2 h-0.5 bg-green rounded-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      icon: <TbHome size={24} />,
      label: 'Home',
    },
    {
      href: '/dashboard/scan',
      icon: <TbScan size={24} />,
      label: 'Scan',
    },
    {
      href: '/dashboard/history',
      icon: <TbHistory size={24} />,
      label: 'History',
    },
    {
      href: '/dashboard/profile',
      icon: <TbUser size={24} />,
      label: 'Profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-[var(--border-color)] flex justify-around items-center h-16 sm:h-[4.5rem] px-1">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname?.startsWith(item.href)
          }
        />
      ))}
    </nav>
  );
}