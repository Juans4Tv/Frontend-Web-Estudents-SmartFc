import React from 'react';

const Loading = ({ text = 'Cargando...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
