import React from 'react';

interface IOSCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const IOSCard: React.FC<IOSCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = true 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        ios-glass-card 
        rounded-3xl sm:rounded-4xl p-5 sm:p-6 
        transition-all duration-300 ease-out
        ${hoverable ? 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/40 ios-active' : ''} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

