import { useEffect, useRef, useState, type ReactNode } from 'react';
import React from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in ms
  // Fix: Add style property to allow passing inline styles.
  style?: React.CSSProperties;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit sooner
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        ...style,
        ...(delay > 0 && { '--animate-delay': `${delay}ms` } as React.CSSProperties),
        transitionDelay: delay > 0 ? 'var(--animate-delay, 0ms)' : undefined
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(AnimateOnScroll);
