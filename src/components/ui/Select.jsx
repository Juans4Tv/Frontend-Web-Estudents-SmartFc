import React from 'react';

const Select = ({ label, icon, error, children, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <select className={`form-select ${error ? 'error' : ''}`} {...props}>
          {children}
        </select>
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default Select;
