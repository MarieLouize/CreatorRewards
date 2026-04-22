
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  range?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagneticWrapper({ children, range = 50, className, style }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      if (Math.abs(distanceX) < range && Math.abs(distanceY) < range) {
        setPosition({ x: distanceX * 0.4, y: distanceY * 0.4 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [range]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s linear',
      }}
    >
      {children}
    </div>
  );
}
