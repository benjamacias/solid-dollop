'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ChevronRight,
  Clock,
  Code,
  Database,
  GitBranch,
  Layout,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from 'lucide-react';

import ContactForm from './ContactForm';

type ContactInfo = {
  name: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  tagline: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
  Icon: LucideIcon;
};

type Service = {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  gradient: string;
  mailSubject: string;
  mailBody: string;
};

type StackItem = {
  category: string;
  technologies: string[];
  Icon: LucideIcon;
};

type CaseStudy = {
  title: string;
  tech: string;
  description: string;
  results: string[];
  gradient: string;
};

type Plan = {
  title: string;
  note: string;
  features: string[];
  price: string;
  featured: boolean;
  gradient: string;
};

type FAQ = {
  q: string;
  a: string;
};

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type Particle = {
  left: number;
  top: number;
  delay: number;
  duration: number;
};

const contactInfo: ContactInfo = {
  name: 'Benjamín Macías',
  role: 'Fractional CTO',
  location: 'Rosario, Argentina',
  timezone: 'GMT-3',
  email: 'benjamacias01@gmail.com',
  phone: '+54 341 357 7200',
  tagline: 'Transformo ideas en productos robustos listos para escalar',
  description:
    'Diseñemos un roadmap realista, alineado al negocio y ejecutado con disciplina técnica. Yo me encargo de coordinar el delivery end-to-end.',
};

const stats: Stat[] = [
  { value: '+4', label: 'años construyendo productos digitales', Icon: Clock },
  { value: '3+', label: 'equipos técnicos acompañados', Icon: Users },
  { value: '100%', label: 'entregas a tiempo en 2024', Icon: Target },
];

const services: Service[] = [
  {
    id: 'consultoria',
    Icon: Lightbulb,
    title: 'Consultoría técnica',
    description: 'Alineo la visión del negocio con decisiones de arquitectura y roadmap ejecutable.',
    bullets: ['Workshops de descubrimiento', 'Mapeo de riesgos y costos', 'Planes de implementación por etapas'],
    gradient: 'from-purple-500 to-cyan-400',
    mailSubject: 'Consulta: Consultoría técnica',
    mailBody:
      'Hola Benjamín,\n\nEstoy interesado en tus servicios de consultoría técnica.\n\nDetalles del proyecto:\n[Describe tu desafío aquí]\n\nSaludos.',
  },
  {
    id: 'desarrollo',
    Icon: Code,
    title: 'Desarrollo end-to-end',
    description: 'Equipo boutique para diseñar, construir y lanzar MVPs o módulos críticos.',
    bullets: ['Product discovery ágil', 'Implementación iterativa', 'QA y automatizaciones básicas'],
    gradient: 'from-cyan-500 to-blue-500',
    mailSubject: 'Consulta: Desarrollo end-to-end',
    mailBody:
      'Hola Benjamín,\n\nEstoy interesado en desarrollo end-to-end.\n\nDetalles del proyecto:\n[Describe tu proyecto aquí]\n\nSaludos.',
  },
  {
    id: 'mentoria',
    Icon: Users,
    title: 'Mentoría de equipos',
    description: 'Acompaño al staff interno para acelerar adopción de buenas prácticas y reducir deuda.',
    bullets: ['Code reviews dirigidos', 'Capacitación en vivo', 'Tablero de métricas operativo'],
    gradient: 'from-blue-500 to-purple-500',
    mailSubject: 'Consulta: Mentoría de equipos',
    mailBody:
      'Hola Benjamín,\n\nEstoy interesado en mentoría para mi equipo técnico.\n\nDetalles:\n[Describe tu situación actual]\n\nSaludos.',
  },
];

const stack: StackItem[] = [
  { category: 'Backend', technologies: ['Python', 'Django', '.NET', 'Node/REST'], Icon: Database },
  { category: 'Bases de datos', technologies: ['SQL Server', 'PostgreSQL'], Icon: Layout },
  { category: 'Frontend', technologies: ['React', 'Next.js', 'Angular', 'HTML/CSS'], Icon: Code },
  { category: 'DevOps', technologies: ['Docker', 'GitHub Actions', 'CI/CD', 'Observabilidad'], Icon: GitBranch },
  { category: 'Seguridad', technologies: ['OWASP', 'Hardening', 'Auditorías'], Icon: Shield },
  { category: 'Consultoría', technologies: ['Workshops', 'Discovery', 'Roadmaps'], Icon: Lightbulb },
];

const cases: CaseStudy[] = [
  {
    title: 'Sistema de facturación para contadores',
    tech: 'Django · SOAP · AFIP',
    description:
      'CRUD completo de clientes y cuentas corrientes con integración directa a AFIP. Modelo de usuario personalizado con roles y envío automatizado de emails.',
    results: ['+40% eficiencia', '0 errores AFIP', '100% digital'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Sistema de gestión de logística',
    tech: 'Django · SQL Server · ARCA',
    description:
      'CRUD para envíos, clientes, vehículos y conductores con facturación integrada usando Carta de Porte Electrónica de AFIP. Unifiqué datos operativos eliminando dobles cargas.',
    results: ['-60% tiempo procesos', '+25% capacidad', '0 papel'],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Dashboards analíticos',
    tech: 'Python · Chart.js · PostgreSQL',
    description:
      'Visualización de métricas de negocio en tiempo real con gráficos interactivos para toma de decisiones basada en datos.',
    results: ['+80% visibilidad', 'Decisión en minutos', 'KPIs en vivo'],
    gradient: 'from-green-500 to-cyan-500',
  },
];

const plans: Plan[] = [
  {
    title: 'Inicio rápido',
    note: 'MVP en semanas',
    features: ['Brief y alcance cerrado', 'Entrega en 3-4 semanas', 'Documentación esencial', 'Soporte 30 días'],
    price: 'Desde $2.5K',
    featured: false,
    gradient: 'from-gray-600 to-gray-700',
  },
  {
    title: 'Evolutivo',
    note: 'Iteraciones mensuales',
    features: ['Equipo extendido', 'Tablero de métricas', 'Revisiones quincenales', 'Soporte prioritario'],
    price: 'Desde $4.5K/mes',
    featured: true,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Soporte continuo',
    note: 'Mantenimiento',
    features: ['Monitoreo básico', 'Gestión de incidencias', 'Actualizaciones planificadas', 'Backups automáticos'],
    price: 'Desde $1K/mes',
    featured: false,
    gradient: 'from-purple-500 to-pink-500',
  },
];

const navLinks: NavLink[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Stack', href: '#stack' },
  { label: 'Casos', href: '#casos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Editor PDF', href: '/pdf-editor.html', external: true },
];

const faqs: FAQ[] = [
  {
    q: '¿Cómo empezamos a trabajar?',
    a: 'Coordinamos una llamada breve para entender el desafío. Luego propongo un plan y presupuesto cerrado por fase.',
  },
  {
    q: '¿Podés integrarte con mi equipo actual?',
    a: 'Sí. Trabajo como extensión del equipo, adaptándome a los procesos existentes o proponiendo mejoras graduales.',
  },
  {
    q: '¿Qué pasa si necesito soporte luego del lanzamiento?',
    a: 'Ofrezco paquetes de mantenimiento mensual y soporte bajo demanda para garantizar continuidad.',
  },
];

function createDeterministicParticle(index: number): Particle {
  const random = (offset: number) => {
    const value = Math.sin(index * 9973 + offset * 1013) * 43758.5453123;
    return value - Math.floor(value);
  };

  return {
    left: random(1) * 100,
    top: random(2) * 100,
    delay: random(3) * 5,
    duration: 3 + random(4) * 4,
  };
}

function ParticleBackground() {
  const particles = useMemo<Particle[]>(
    () => Array.from({ length: 20 }, (_, index) => createDeterministicParticle(index)),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-400/30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-neutral-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-12 py-16 lg:flex-row lg:items-center">
          <div className="lg:w-3/5">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Fractional CTO · Rosario, ARG
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Transformo ideas en productos robustos listos para escalar
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-300">
              Diseñemos un roadmap realista, alineado al negocio y ejecutado con disciplina técnica. Yo
              me encargo de coordinar el delivery end-to-end.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 font-semibold text-black shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
              >
                Hablemos de tu proyecto
              </Link>
              <Link
                href="#casos"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-6 py-3 font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
              >
                Ver casos reales
              </Link>
              <Link
                href="/consola.html"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-6 py-3 font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
              >
                Abrir Terminal benja
              </Link>
              <Link
                href="/pdf-editor.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-cyan-500/30 px-6 py-3 font-semibold text-cyan-200 transition hover:border-cyan-400 hover:text-cyan-100"
              >
                Abrir editor PDF
              </Link>
            </div>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        <section id="servicios" className="py-20">
          <div className="mb-12 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Servicios clave</span>
            </h2>
            <p className="max-w-2xl text-lg text-neutral-300">
              Intervengo en etapas críticas para que tu producto avance sin fricción.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  index === activeService ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'hover:border-cyan-500/30'
                }`}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                tabIndex={0}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                <div className={`mb-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${service.gradient} p-3 text-white transition-transform duration-300 group-hover:scale-110`}>
                  <service.Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
                <p className="mb-6 leading-relaxed text-neutral-300">{service.description}</p>
                <ul className="mb-6 space-y-3 text-sm text-neutral-400">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleServiceContact(service)}
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-cyan-500/30 hover:bg-neutral-700/50 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Consultar servicio
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="stack" className="py-20">
          <div className="mb-12 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Stack & prácticas</span>
            </h2>
            <p className="max-w-2xl text-lg text-neutral-300">
              Tecnologías con las que trabajo a diario y métodos para mantener la calidad.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((item, index) => (
              <div
                key={item.category}
                className="group relative rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur transition-all duration-500 hover:scale-105 hover:border-cyan-500/30 hover:bg-neutral-900/50"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="text-cyan-400 transition-transform duration-300 group-hover:scale-110">
                    <item.Icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-neutral-200">{item.category}</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {item.technologies.map((tech) => (
                    <span
                      key={`${item.category}-${tech}`}
                      className="rounded-2xl border border-neutral-700/70 bg-neutral-800/50 px-4 py-2 text-sm text-neutral-200 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 backdrop-blur"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="casos" className="py-20">
          <div className="mb-12 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Casos recientes</span>
            </h2>
            <p className="max-w-2xl text-lg text-neutral-300">
              Proyectos donde lideré estrategia técnica y ejecución con impacto medible.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {cases.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 backdrop-blur transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                <div className="relative p-8">
                  <div className="mb-4 text-sm font-mono text-neutral-400">{project.tech}</div>
                  <h3 className="mb-4 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mb-6 leading-relaxed text-neutral-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.results.map((result) => (
                      <span
                        key={`${project.title}-${result}`}
                        className="rounded-full border border-neutral-700 bg-neutral-800/50 px-3 py-1 text-xs text-cyan-300"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="mb-12 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Planes de trabajo</span>
            </h2>
            <p className="max-w-2xl text-lg text-neutral-300">
              Formatos flexibles según el nivel de acompañamiento que necesites.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`group relative rounded-3xl border p-8 backdrop-blur transition-all duration-500 hover:scale-105 ${
                  plan.featured
                    ? 'border-cyan-400/60 bg-neutral-900/50 shadow-2xl shadow-cyan-500/20'
                    : 'border-neutral-800 bg-neutral-900/30 hover:border-cyan-500/30'
                }`}
              >
                {plan.featured ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-xs font-bold text-white">
                      MÁS POPULAR
                    </span>
                  </div>
                ) : null}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                <div className="mb-2 text-sm text-neutral-400">{plan.note}</div>
                <h3 className="mb-2 text-2xl font-bold text-white">{plan.title}</h3>
                <div className="mb-6 text-lg font-bold text-cyan-400">{plan.price}</div>
                <ul className="mb-8 space-y-3 text-sm text-neutral-300">
                  {plan.features.map((feature) => (
                    <li key={`${plan.title}-${feature}`} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handlePlanContact(plan)}
                  className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25'
                      : 'bg-neutral-800 text-neutral-200 hover:scale-105 hover:bg-neutral-700'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Solicitar información
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="py-20">
          <div className="mb-12 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Preguntas frecuentes</span>
            </h2>
            <p className="max-w-2xl text-lg text-neutral-300">
              Resuelvo las dudas más comunes antes de iniciar un engagement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="group relative rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur transition-all duration-500 hover:scale-105 hover:border-cyan-500/30 hover:bg-neutral-900/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <h4 className="mb-4 text-lg font-semibold text-white">{faq.q}</h4>
                <p className="leading-relaxed text-neutral-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="py-20">
          <div className="mb-12 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Contacto</span>
            </h2>
            <p className="max-w-2xl text-lg text-neutral-300">
              Contame qué querés construir y diseñamos juntos el siguiente paso.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-5" />
              <div className="relative">
                <h4 className="text-xl font-semibold text-white">Escribime</h4>
                <p className="mb-8 mt-2 text-neutral-300">
                  Completá el formulario y coordinamos una llamada exploratoria sin costo.
                </p>
                <div className="space-y-6">
                  <ContactForm />
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-5" />
              <div className="relative">
                <h4 className="mb-6 text-xl font-semibold text-white">Datos directos</h4>
                <ul className="space-y-6 text-neutral-300">
                  <li className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-cyan-500/30">
                    <MapPin className="mt-0.5 h-6 w-6 flex-shrink-0 text-cyan-400" />
                    <div>
                      <span className="block text-sm text-neutral-400">Ubicación:</span>
                      {contactInfo.location} ({contactInfo.timezone})
                    </div>
                  </li>
                  <li className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-cyan-500/30">
                    <Phone className="mt-0.5 h-6 w-6 flex-shrink-0 text-cyan-400" />
                    <div>
                      <span className="block text-sm text-neutral-400">Teléfono:</span>
                      <a href={`tel:${contactInfo.phone}`} className="transition hover:text-cyan-300">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-cyan-500/30">
                    <Mail className="mt-0.5 h-6 w-6 flex-shrink-0 text-cyan-400" />
                    <div>
                      <span className="block text-sm text-neutral-400">Email:</span>
                      <a href={`mailto:${contactInfo.email}`} className="transition hover:text-cyan-300">
                        {contactInfo.email}
                      </a>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <p className="text-sm text-cyan-300">
                    También podés usar WhatsApp o email directo para consultas rápidas. Respondo en menos de 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800/80 bg-neutral-900/50 py-12 text-center backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-sm text-neutral-400 sm:px-6 lg:px-8">
          <div>© 2025 {contactInfo.name} · Fractional CTO · Todos los derechos reservados.</div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Zap className="h-3 w-3" />
            Hecho con pasión por la tecnología
          </div>
        </div>
      </footer>
    </div>
  );
}
