interface SectionHeaderProps {
  title: string;
  caption?: string;
  highlighted?: boolean;
}

export default function SectionHeader({ title, caption, highlighted = false }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2
        className={`text-2xl font-bold tracking-tight transition-colors duration-500 sm:text-3xl ${
          highlighted ? 'text-cyan-300' : 'text-white'
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
