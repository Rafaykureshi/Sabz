import { Loader } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner = ({ size = 'md', className = '' }: Props) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
};

export default LoadingSpinner;