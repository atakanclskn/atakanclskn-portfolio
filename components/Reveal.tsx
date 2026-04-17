import React, { ReactNode } from 'react';
import { useInView } from '../lib/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number; // duration in ms
}

/**
 * Wrapper component that reveals its children with a smooth animation
 * when they scroll into the viewport.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const getTransform = () => {
    if (isInView) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)';
      case 'down': return 'translate3d(0, -40px, 0)';
      case 'left': return 'translate3d(40px, 0, 0)';
      case 'right': return 'translate3d(-40px, 0, 0)';
      case 'none': return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
