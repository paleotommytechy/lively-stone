import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = true 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl p-5 sm:p-6 
        bg-white dark:bg-forest-900/80 
        border border-slate-200 dark:border-forest-800 
        shadow-sm dark:shadow-none
        transition-all duration-300 ease-out
        ${hoverable ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-forest-400 dark:hover:border-gold-500/50' : ''} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const IOSCard = Card;
