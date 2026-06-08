import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  const baseClasses = "glass-card p-6 overflow-hidden relative";
  
  if (hoverable || onClick) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        className={`${baseClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};
