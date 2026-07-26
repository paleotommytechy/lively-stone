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
        rounded-[2rem] p-5 sm:p-6 
        transition-all duration-300 
        ${hoverable ? 'hover:-translate-y-1 hover:shadow-xl ios-active' : ''} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
