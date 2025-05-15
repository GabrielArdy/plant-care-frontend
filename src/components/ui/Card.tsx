import React from 'react';
import Link from 'next/link';
import { IconCheck } from 'react-icons/tb';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`bg-[var(--card-background)] rounded-xl border border-[var(--border-color)] shadow-sm p-6 card ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      {children}
    </div>
  );
};

interface CardLinkProps {
  href: string;
  text: string;
  className?: string;
}

export const CardLink: React.FC<CardLinkProps> = ({
  href,
  text,
  className = '',
}) => {
  return (
    <Link href={href} className={`text-green hover:underline ${className}`}>
      {text}
    </Link>
  );
};
