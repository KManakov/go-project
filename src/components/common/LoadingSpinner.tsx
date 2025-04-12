import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner-ring"></div>
    </div>
  );
};

export default LoadingSpinner; 