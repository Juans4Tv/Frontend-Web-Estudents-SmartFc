import React from 'react';

const StatCard = ({ icon, value, label, variant = 'primary' }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${variant}`}>{icon}</div>
      <div className="stat-info">
        <h4>{value}</h4>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
