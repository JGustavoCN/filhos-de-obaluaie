'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MasonryItemProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  rowHeight?: number;
}

export default function MasonryItem({ children, className = '', gap = 24, rowHeight = 10 }: MasonryItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(1);

  useEffect(() => {
    if (!contentRef.current) return;

    const calculateSpan = () => {
      if (contentRef.current) {
        // Usa getBoundingClientRect().height para maior precisão (inclui decimais)
        const height = contentRef.current.getBoundingClientRect().height;
        const calculatedSpan = Math.ceil((height + gap) / rowHeight);
        setSpan(calculatedSpan);
      }
    };

    // Cálculo inicial
    calculateSpan();

    // Re-calcula em caso de resize da janela ou do próprio card
    const observer = new ResizeObserver(() => {
      calculateSpan();
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [gap, rowHeight]);

  return (
    <div 
      style={{ gridRowEnd: `span ${span}` }} 
      className={className}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
