// Guardar como: src/app/components/Header.tsx

'use client';

import { useEffect, useState } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onNavigate?: () => void;
}

function NavLink({ href, children, className = '', target, rel, onNavigate }: NavLinkProps) {
  const isHashLink = href.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      onNavigate();
    }

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

  return (
    <a href={href} onClick={isHashLink ? handleClick : undefined} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-20 border-b transition-all duration-500 ${
        scrolled
          ? 'border-neutral-800/80 bg-neutral-950/95 backdrop-blur-xl shadow-lg shadow-cyan-500/5'
          : 'border-transparent bg-neutral-950/60 backdrop-blur'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300">
            Benjamín Macías
          </span>
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="https://newsbm-tech.com/"
              className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              newsbm-tech.com
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              className="rounded-full border border-neutral-700 p-2 text-neutral-200 transition hover:border-cyan-500 hover:text-white"
            >
              <span className="flex h-5 w-5 flex-col justify-between">
                <span
                  className={`h-0.5 rounded-full bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
                ></span>
                <span className={`h-0.5 rounded-full bg-current transition ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span
                  className={`h-0.5 rounded-full bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
                ></span>
              </span>
            </button>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-6 text-sm text-neutral-300">
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
            <a
              href="https://newsbm-tech.com/"
              className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              Visitar newsbm-tech.com
            </a>
          </div>
        </div>
        <nav
          className={`md:hidden ${
            menuOpen
              ? 'mt-4 flex flex-col gap-4 border-t border-neutral-800 pt-4 text-sm text-neutral-200'
              : 'hidden'
          }`}
        >
          <NavLink className="hover:text-white" href="#servicios" onNavigate={closeMenu}>
            Servicios
          </NavLink>
          <NavLink className="hover:text-white" href="#stack" onNavigate={closeMenu}>
            Stack
          </NavLink>
          <NavLink className="hover:text-white" href="#casos" onNavigate={closeMenu}>
            Casos
          </NavLink>
          <NavLink className="hover:text-white" href="#faq" onNavigate={closeMenu}>
            FAQ
          </NavLink>
          <NavLink
            className="hover:text-white"
            href="/pdf-editor.html"
            target="_blank"
            rel="noopener noreferrer"
            onNavigate={closeMenu}
          >
            Editor PDF
          </NavLink>
          <NavLink
            className="rounded-full border border-cyan-500/60 px-4 py-2 text-center text-cyan-300 transition hover:bg-cyan-500/10"
            href="#contacto"
            onNavigate={closeMenu}
          >
            Agenda una llamada
          </NavLink>
        </nav>
      </div>
    </header>
  );
}