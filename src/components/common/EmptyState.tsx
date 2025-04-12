import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <h3>{title}</h3>
        <p>{message}</p>
        {action && (
          <button className="action-button" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState; 