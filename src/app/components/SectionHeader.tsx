interface SectionHeaderProps {
  title: string;
  caption?: string;
}

export default function SectionHeader({ title, caption }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {caption ? (
        <p className="max-w-2xl text-neutral-300">{caption}</p>
      ) : null}
    </div>
  );
}
