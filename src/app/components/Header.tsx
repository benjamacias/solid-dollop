// Guardar como: src/app/components/Header.tsx

'use client';

import { useState } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function NavLink({ href, children, className = '', target, rel, onClick }: NavLinkProps) {
  const isHashLink = href.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHashLink) {
      return;
    }

    e.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Calcular la posición para centrar el elemento
      const elementRect = targetElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;

      // Hacer scroll suave a la posición centrada
      window.scrollTo({
        top: middle,
        behavior: 'smooth',
      });

      // Actualizar el hash en la URL
      window.history.pushState(null, '', href);

      // Disparar evento personalizado para el highlight
      window.dispatchEvent(new Event('sectionNavigate'));
    }
  };

  const combinedOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      handleClick(e);
    }

    onClick?.(e);
  };

  return (
    <a href={href} onClick={combinedOnClick} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavId = 'primary-navigation';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Benjamín Macías
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-end rounded-md border border-neutral-800 px-3 py-2 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-700 hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls={mobileNavId}
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menú
        </button>
        <nav className="hidden items-center gap-5 text-sm text-neutral-300 md:flex">
          <NavLink className="hover:text-white" href="#servicios">
            Servicios
          </NavLink>
          <NavLink className="hover:text-white" href="#stack">
            Stack
          </NavLink>
          <NavLink className="hover:text-white" href="#casos">
            Casos
          </NavLink>
          <NavLink className="hover:text-white" href="#faq">
            FAQ
          </NavLink>
          <NavLink className="hover:text-white" href="/pdf-editor.html" target="_blank" rel="noopener noreferrer">
            Editor PDF
          </NavLink>
          <NavLink
            className="rounded-full border border-cyan-500/60 px-4 py-1 text-cyan-300 transition hover:bg-cyan-500/10"
            href="#contacto"
          >
            Agenda una llamada
          </NavLink>
        </nav>
        <div
          id={mobileNavId}
          className={`overflow-hidden rounded-lg border border-neutral-900/80 bg-neutral-950/95 shadow-lg transition-all duration-300 ease-out md:hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-3 px-4 py-3 text-sm text-neutral-300 sm:flex-wrap">
            <NavLink className="transition-colors hover:text-white" href="#servicios" onClick={closeMenu}>
              Servicios
            </NavLink>
            <NavLink className="transition-colors hover:text-white" href="#stack" onClick={closeMenu}>
              Stack
            </NavLink>
            <NavLink className="transition-colors hover:text-white" href="#casos" onClick={closeMenu}>
              Casos
            </NavLink>
            <NavLink className="transition-colors hover:text-white" href="#faq" onClick={closeMenu}>
              FAQ
            </NavLink>
            <NavLink
              className="transition-colors hover:text-white"
              href="/pdf-editor.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Editor PDF
            </NavLink>
            <NavLink
              className="rounded-full border border-cyan-500/60 px-4 py-1 text-center text-cyan-300 transition hover:bg-cyan-500/10"
              href="#contacto"
              onClick={closeMenu}
            >
              Agenda una llamada
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}