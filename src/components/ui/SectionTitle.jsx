import React from 'react';

const SectionTitle = ({ children, icon }) => {
  return (
    <h2 className="section-title">
      {icon && <span>{icon}</span>}
      {children}
    </h2>
  );
};

export default SectionTitle;
