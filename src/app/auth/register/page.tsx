import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { TbPlant2 } from 'react-icons/tb';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-[var(--background)]">
      <Link href="/" className="flex items-center mb-6 sm:mb-8 text-[#22a861]">
        <TbPlant2 size={32} className="mr-2" />
        <span className="text-2xl font-bold">PlantCare</span>
      </Link>
      
      <div className="w-full max-w-md px-4">
        <RegisterForm />
      </div>
      
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} PlantCare. All rights reserved.
        </p>
      </div>
    </div>
  );
}
