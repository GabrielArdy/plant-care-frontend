'use client';

import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  fullWidth = false,
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const baseStyles = "px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none active:scale-95 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-[#22a861] hover:bg-[#1e8f53] active:bg-[#1a7d49] text-white shadow-sm",
    secondary: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800",
    outline: "bg-white border border-[#22a861] text-[#22a861] hover:bg-[#f7fcf9] active:bg-[#e6f7ef]"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || false} // Ensure consistent boolean value
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};
