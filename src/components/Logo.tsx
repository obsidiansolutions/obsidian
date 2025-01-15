import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <img
      src="/logo.svg"
      alt="Obsidian AI Logo"
      className={`${className}`}
      style={{ width: size, height: size }}
    />
  );
};