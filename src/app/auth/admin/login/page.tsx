import React from 'react';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import { TbPlant2, TbShield } from 'react-icons/tb';
import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-[var(--background)]">
      <Link href="/" className="flex items-center mb-6 sm:mb-8 text-[#22a861]">
        <TbPlant2 size={32} className="mr-2" />
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">PlantCare</span>
          <div className="flex items-center mt-1 bg-[#22a861]/10 px-2 py-0.5 rounded-md">
            <TbShield size={14} className="mr-1 text-[#22a861]" />
            <span className="text-xs font-medium text-[#22a861]">Admin Panel</span>
          </div>
        </div>
      </Link>
      
      <div className="w-full max-w-md px-4">
        <AdminLoginForm />
      </div>
      
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} PlantCare Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}
