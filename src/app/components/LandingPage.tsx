// Actualización completa para src/app/components/LandingPage.tsx

import Link from 'next/link';

import { CONTACT_ENABLED } from '@/app/config';

import Card from './Card';
import Case from './Case';
import ContactForm from './ContactForm';
import FAQ from './FAQ';
import Header from './Header';
import PriceCard from './PriceCard';
import SectionHeader from './SectionHeader';
import Stat from './Stat';
import TagGroup from './TagGroup';

const stats = [
  { kpi: '+12', label: 'años construyendo productos digitales' },
  { kpi: '30+', label: 'equipos técnicos acompañados' },
  { kpi: '100%', label: 'entregas a tiempo en 2024' },
];

const services = [
  {
    title: 'Consultoría técnica',
    desc: 'Alineo la visión del negocio con decisiones de arquitectura y roadmap ejecutable.',
    bullets: [
      'Workshops de descubrimiento',
      'Mapeo de riesgos y costos',
      'Planes de implementación por etapas',
    ],
  },
  {
    title: 'Desarrollo end-to-end',
    desc: 'Equipo boutique para diseñar, construir y lanzar MVPs o módulos críticos.',
    bullets: [
      'Product discovery ágil',
      'Implementación iterativa',
      'QA y automatizaciones básicas',
    ],
  },
  {
    title: 'Mentoría de equipos',
    desc: 'Acompaño al staff interno para acelerar adopción de buenas prácticas y reducir deuda.',
    bullets: ['Code reviews dirigidos', 'Capacitación en vivo', 'Tablero de métricas operativo'],
  },
];

const cases = [
  {
    title: 'Sistema de facturación para contadores',
    tech: 'Django · SOAP · AFIP',
    desc: 'CRUD completo de clientes y cuentas corrientes con integración directa a AFIP. Modelo de usuario personalizado con roles y envío automatizado de emails.',
    image: '/facturacion-contadores.png',
  },
  {
    title: 'Sistema de gestión de logística',
    tech: 'Django · SQL Server · ARCA',
    desc: 'CRUD para envíos, clientes, vehículos y conductores con facturación integrada usando Carta de Porte Electrónica de AFIP. Unifiqué datos operativos eliminando dobles cargas.',
    image: '/logistica-dashboard.png',
  },
  {
    title: 'Dashboards analíticos',
    tech: 'Python · Chart.js · PostgreSQL',
    desc: 'Visualización de métricas de negocio en tiempo real con gráficos interactivos para toma de decisiones basada en datos.',
  },
];

const faqs = [
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

const stack = [
  { title: 'Backend', tags: ['Python', 'Django', '.NET', 'Node/REST'] },
  { title: 'Bases de datos', tags: ['SQL Server', 'PostgreSQL'] },
  { title: 'Frontend', tags: ['React', 'Next.js', 'Angular', 'HTML/CSS'] },
  { title: 'DevOps', tags: ['Docker', 'GitHub Actions', 'CI/CD', 'Observabilidad'] },
  { title: 'Seguridad', tags: ['OWASP', 'Hardening', 'Auditorías'] },
  { title: 'Consultoría', tags: ['Workshops', 'Discovery', 'Roadmaps'] },
];

const pricing = [
  {
    title: 'Inicio rápido',
    note: 'MVP en semanas',
    points: ['Brief y alcance cerrado', 'Entrega en 3-4 semanas', 'Documentación esencial'],
  },
  {
    title: 'Evolutivo',
    note: 'Iteraciones mensuales',
    points: ['Equipo extendido', 'Tablero de métricas', 'Revisiones quincenales'],
    featured: true,
  },
  {
    title: 'Soporte continuo',
    note: 'Mantenimiento',
    points: ['Monitoreo básico', 'Gestión de incidencias', 'Actualizaciones planificadas'],
  },
];

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
            </div>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        <section id="servicios" className="py-16">
          <SectionHeader
            sectionId="servicios"
            title="Servicios clave"
            caption="Intervengo en etapas críticas para que tu producto avance sin fricción."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} {...service} />
            ))}
          </div>
        </section>

        <section id="stack" className="py-16">
          <SectionHeader
            sectionId="stack"
            title="Stack & prácticas"
            caption="Tecnologías con las que trabajo a diario y métodos para mantener la calidad."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((group) => (
              <TagGroup key={group.title} {...group} />
            ))}
          </div>
        </section>

        <section id="casos" className="py-16">
          <SectionHeader
            sectionId="casos"
            title="Casos recientes"
            caption="Proyectos donde lideré estrategia técnica y ejecución con impacto medible."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {cases.map((item) => (
              <Case key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section className="py-16">
          <SectionHeader
            title="Planes de trabajo"
            caption="Formatos flexibles según el nivel de acompañamiento que necesites."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.map((plan) => (
              <PriceCard key={plan.title} {...plan} />
            ))}
          </div>
        </section>

        <section id="faq" className="py-16">
          <SectionHeader
            sectionId="faq"
            title="Preguntas frecuentes"
            caption="Resuelvo las dudas más comunes antes de iniciar un engagement."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <FAQ key={faq.q} {...faq} />
            ))}
          </div>
        </section>

        <section id="contacto" className="py-16">
          <SectionHeader
            sectionId="contacto"
            title="Contacto"
            caption="Contame qué querés construir y diseñamos juntos el siguiente paso."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-800 bg-surface-raised/80 p-6">
              <h4 className="text-lg font-semibold">Escribime</h4>
              <p className="mt-2 text-neutral-300">
                Respondés este formulario y coordinamos una llamada exploratoria sin costo.
              </p>
              <div className="mt-6">
                <ContactForm disabled={!CONTACT_ENABLED} />
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-800 bg-surface-raised/80 p-6">
              <h4 className="text-lg font-semibold">Datos directos</h4>
              <ul className="mt-4 space-y-2 text-neutral-300">
                <li>
                  <span className="text-neutral-400">Ubicación:</span> Rosario, Argentina (GMT-3)
                </li>
                <li>
                  <span className="text-neutral-400">Teléfono:</span> +54 341 357 7200
                </li>
                <li>
                  <span className="text-neutral-400">Email:</span> benjamacias01@gmail.com
                </li>
                <li className="text-xs text-neutral-500">
                  También podés usar WhatsApp o email directo desde los botones de la cabecera.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900/80 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} · Todos los derechos reservados.
      </footer>
    </div>
  );
}