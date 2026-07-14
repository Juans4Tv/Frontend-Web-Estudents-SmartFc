import React from 'react';

const EmptyState = ({ image, title, description, action }) => {
  return (
    <div className="empty-state">
      {image && <img src={image} alt={title} />}
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: 'var(--space-6)' }}>{action}</div>}
    </div>
  );
};

export default EmptyState;
