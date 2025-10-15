'use client';


{/* STACK */}
<section id="stack" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
<SectionHeader title="Stack & prácticas" caption="Tecnologías y formas de trabajo" />
<div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
<TagGroup title="Backend" tags={[ 'Python', 'Django', '.NET', 'Node/REST' ]} />
<TagGroup title="Bases de datos" tags={[ 'SQL Server', 'PostgreSQL' ]} />
<TagGroup title="Frontend" tags={[ 'Ionic/Angular', 'React', 'HTML/CSS' ]} />
<TagGroup title="Dev & Calidad" tags={[ 'Git', 'Docker', 'CI/CD', 'Tests' ]} />
<TagGroup title="Seguridad" tags={[ 'Roles/Permisos', 'Headers/SSL', 'Dependencias' ]} />
<TagGroup title="Consultoría" tags={[ 'Modelado de datos', 'APIs REST', 'SOLID/KISS/DRY' ]} />
</div>
</section>


{/* PRECIOS */}
<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
<SectionHeader title="Costos accesibles" caption="Modularidad y alcance cerrado para optimizar presupuesto" />
<div className="mt-8 grid md:grid-cols-3 gap-6">
<PriceCard title="Inicio Rápido" note="MVP pequeño" points={[ '1–2 pantallas', 'Cálculos básicos', 'Entrega en días' ]} />
<PriceCard title="Evolutivo" note="Iteraciones" points={[ 'Backlog por sprints', 'Mejoras continuas', 'Soporte' ]} featured />
<PriceCard title="Mantenimiento" note="Mensual" points={[ 'Updates', 'Monitoreo básico', 'Tickets' ]} />
</div>
</section>


{/* FAQ */}
<section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
<SectionHeader title="Preguntas frecuentes" caption="Lo que suelen preguntar antes de empezar" />
<div className="mt-8 grid md:grid-cols-3 gap-6">
{faqs.map((f) => (
<FAQ key={f.q} q={f.q} a={f.a} />
))}
</div>
</section>


{/* CONTACTO */}
<section id="contacto" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
<SectionHeader title="Contacto" caption="Hablemos de tu idea y la convertimos en producto" />
<div className="mt-8 grid md:grid-cols-2 gap-6">
<div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
<h4 className="text-lg font-semibold">Escríbeme</h4>
<p className="mt-2 text-neutral-300">Completá el formulario y me pondré en contacto a la brevedad.</p>
{!CONTACT_ENABLED && (
<div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-amber-300 text-sm">
El envío está deshabilitado: configurá <code>NEXT_PUBLIC_CONTACT_ENABLED=true</code> y variables del servidor en <code>.env.local</code>.
</div>
)}
<div className="mt-4">
<ContactForm disabled={!CONTACT_ENABLED} />
</div>
</div>
<div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
<h4 className="text-lg font-semibold">Datos</h4>
<ul className="mt-3 text-neutral-300 space-y-2">
<li><span className="text-neutral-400">Ubicación:</span> Rosario, Argentina</li>
<li><span className="text-neutral-400">Teléfono:</span> +54 341 357 7200</li>
<li><span className="text-neutral-400">Email:</span> benjamacias01@gmail.com</li>
<li className="text-neutral-400 text-xs">También podés usar los botones de la cabecera para WhatsApp/Email directo.</li>
</ul>
</div>
</div>
</section>


{/* FOOTER */}
<footer className="border-t border-neutral-900 py-10 text-center text-sm text-neutral-500">
<p>© {new Date().getFullYear()} · Todos los derechos reservados.</p>
</footer>
</div>
);
}