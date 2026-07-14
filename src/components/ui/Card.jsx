import React from 'react';

const Card = ({ children, className = '', onClick, header, footer, hover = false, ...props }) => {
  const classes = [
    'card',
    onClick || hover ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} {...props}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
