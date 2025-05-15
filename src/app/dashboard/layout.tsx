'use client';

import React from 'react';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { TbPlant2 } from 'react-icons/tb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] pb-16 sm:pb-[4.5rem]">
      {/* App Header */}
      <header className="sticky top-0 z-10 w-full bg-white border-b border-[var(--border-color)] px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
          <TbPlant2 size={28} className="text-green mr-2" />
          <span className="text-xl font-bold">PlantCare</span>
        </Link>

        <div className="flex items-center space-x-3">
          {/* Add notification or any header icons here */}
        </div>
      </header>

      {/* Main Content with Animation */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={usePathname()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
