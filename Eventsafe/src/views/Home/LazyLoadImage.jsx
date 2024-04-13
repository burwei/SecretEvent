import React, { useRef, useEffect, useState } from 'react';

const LazyLoadImage = ({ src, alt, width, height, borderRadius }) => {
  const imageRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={isVisible ? src : ''}
      alt={alt}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default LazyLoadImage;
