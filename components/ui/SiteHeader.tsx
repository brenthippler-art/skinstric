interface SiteHeaderProps {
  section: string;
  showEnterCode?: boolean;
  light?: boolean;
}

export default function SiteHeader({
  section,
  showEnterCode = false,
  light = false,
}: SiteHeaderProps) {
  const bracketColor = light ? "text-[#FCFCFC]" : "text-border-soft";
  const wordmarkColor = light ? "text-[#FCFCFC]" : "";
  const sectionColor = light ? "text-[#FCFCFC] opacity-60" : "text-muted";

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10">
      <div className="flex items-center gap-3">
        <span
          className={`text-[14px] font-semibold tracking-[-0.02em] ${wordmarkColor}`}
        >
          SKINSTRIC
        </span>
        <span
          className={`text-[14px] font-semibold tracking-[-0.02em] uppercase flex items-center gap-1 ${sectionColor}`}
        >
          <span className={bracketColor}>[</span>
          {section}
          <span className={bracketColor}>]</span>
        </span>
      </div>
      {showEnterCode && (
        <button className="uppercase text-[10px] leading-4 font-semibold bg-foreground text-[#FCFCFC] px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity">
          Enter Code
        </button>
      )}
    </header>
  );
}
