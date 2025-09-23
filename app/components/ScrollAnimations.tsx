import React, { useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with scroll-reveal classes
    const scrollElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );

    scrollElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Add scroll reveal classes to children
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: `${child.props.className || ''} scroll-reveal-stagger`.trim(),
        'data-animation-delay': `${index * 0.1}s`,
      });
    }
    return child;
  });

  return <>{enhancedChildren}</>;
};

// Export function for manual initialization
export const initScrollAnimations = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in');
  animatedElements.forEach((el) => observer.observe(el));

  return observer;
};

export default ScrollAnimations;
