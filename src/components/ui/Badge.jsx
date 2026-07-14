import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error'
  };

  return (
    <span className={`badge ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
