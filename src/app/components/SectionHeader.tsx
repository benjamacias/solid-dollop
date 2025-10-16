'use client';

import { useEffect, useState } from 'react';

interface SectionHeaderProps {
  title: string;
  caption?: string;
  sectionId?: string;
}

export default function SectionHeader({ title, caption, sectionId }: SectionHeaderProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (!sectionId) return;

    const handleSectionHighlight = () => {
      const hash = window.location.hash.substring(1);
      if (hash === sectionId) {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2500);
      }
    };

    // Escuchar el evento personalizado para forzar highlight
    window.addEventListener('sectionNavigate', handleSectionHighlight);
    window.addEventListener('hashchange', handleSectionHighlight);
    
    return () => {
      window.removeEventListener('sectionNavigate', handleSectionHighlight);
      window.removeEventListener('hashchange', handleSectionHighlight);
    };
  }, [sectionId]);

  return (
    <div className="flex flex-col items-start gap-2">
      <h2
        className={`text-2xl font-bold tracking-tight sm:text-3xl transition-all duration-500 ${
          isHighlighted
            ? 'text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]'
            : 'text-white'
        }`}
      >
        {title}
      </h2>
      {caption ? (
        <p className="max-w-2xl text-neutral-300">{caption}</p>
      ) : null}
    </div>
  );
}