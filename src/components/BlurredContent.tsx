import React from 'react';
import { useWhitelist } from '../contexts/WhitelistContext';

interface BlurredContentProps {
  children: React.ReactNode;
  className?: string;
  blurIntensity?: 'light' | 'medium' | 'heavy';
  placeholder?: string;
  forceBlur?: boolean;
}

const BlurredContent: React.FC<BlurredContentProps> = ({ 
  children, 
  className = '', 
  blurIntensity = 'medium',
  placeholder = 'Content hidden for non-whitelisted users',
  forceBlur = false
}) => {
  const { isWhitelisted } = useWhitelist();

  const getBlurClass = () => {
    switch (blurIntensity) {
      case 'light':
        return 'blur-sm';
      case 'heavy':
        return 'blur-xl';
      default:
        return 'blur-md';
    }
  };

  if (!forceBlur && isWhitelisted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`${getBlurClass()} pointer-events-none select-none`}>
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
        <div className="text-center text-white">
          <div className="text-2xl mb-2">🔒</div>
          <div className="text-sm font-medium">{placeholder}</div>
        </div>
      </div>
    </div>
  );
};

export default BlurredContent; 