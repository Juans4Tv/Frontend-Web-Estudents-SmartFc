import React from 'react';

const Input = ({ label, icon, error, success, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={`form-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="form-error">{error}</span>}
      {success && <span className="form-success">{success}</span>}
    </div>
  );
};

export default Input;
