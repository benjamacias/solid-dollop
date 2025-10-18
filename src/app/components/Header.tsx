// Guardar como: src/app/components/Header.tsx

'use client';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

function NavLink({ href, children, className = '', target, rel }: NavLinkProps) {
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

  return (
    <a href={href} onClick={isHashLink ? handleClick : undefined} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Benjamín Macías
        </span>
        <nav className="flex items-center gap-5 text-sm text-neutral-300">
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
      </div>
    </header>
  );
}