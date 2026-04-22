
import React, { useState, useEffect } from 'react';

interface Props {
  name: string;
  color: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function NichePill({ name, color, delay = 0, className, style }: Props) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [randomConfig] = useState(() => ({
    floatDuration: 3 + Math.random() * 4,
    driftX: (Math.random() - 0.5) * 20,
    driftY: (Math.random() - 0.5) * 20,
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMouseOffset({ x: -x, y: -y }); // Move opposite to mouse
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`annotation-pill no-circles ${className}`}
      style={{
        ...style,
        position: 'relative',
        top: '0',
        left: '0',
        backgroundColor: color,
        color: 'white',
        borderColor: 'transparent',
        animationDelay: `${delay}s, ${Math.random() * 2}s`,
        animationDuration: `0.6s, ${randomConfig.floatDuration}s`,
        transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      {name}
    </div>
  );
}
