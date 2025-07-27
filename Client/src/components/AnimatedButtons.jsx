// components/AnimatedButton.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AnimatedButton = ({ text, onClick, className = '' }) => {
  const btnRef = useRef();

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(
      btnRef.current,
      {
        y: -100,
        opacity: 0,
        rotateX: -180,
        borderRadius: 0,
        position: 'relative',
        zIndex: -1,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        borderRadius: '1rem',
        zIndex: 10,
        delay: 0.5,
        duration: 1,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // Continuous bounce
          gsap.to(btnRef.current, {
            y: '-=  5',
            delay: 0.5,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
          });
        },
      }
    );
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`bg-white text-gray-900 px-4 py-2 rounded-md transition ${className}`}
    >
      {text}
    </button>
  );
};

export default AnimatedButton;
