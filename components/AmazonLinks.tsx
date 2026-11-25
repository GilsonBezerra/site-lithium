type Props = { title: string; kindleUrl?: string | null; printUrl?: string | null; block?: boolean };

export default function AmazonLinks({ title, kindleUrl, printUrl, block }: Props) {
  const links = [
    { url: kindleUrl, label: "Kindle na Amazon", style: "primary" },
    { url: printUrl, label: "Impresso na Amazon", style: kindleUrl ? "ghost" : "primary" },
  ].filter((l) => l.url);
  if (links.length === 0) return null;

  return (
    <div className="lith-amazon">
      {links.map((l) => (
        <a
          key={l.label}
          className={`lith-btn lith-btn--${l.style} lith-btn--sm${block ? " lith-btn--block" : ""}`}
          href={l.url!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label}: ${title} (abre em nova aba)`}
        >
          <i className="fab fa-amazon" aria-hidden="true"></i> {l.label}
        </a>
      ))}
    </div>
  );
}
