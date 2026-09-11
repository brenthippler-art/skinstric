interface SiteHeaderProps {
  section: string;
  showEnterCode?: boolean;
}

export default function SiteHeader({
  section,
  showEnterCode = false,
}: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10">
      <div className="flex items-center gap-3">
        <span className="text-[14px] font-semibold tracking-[-0.02em]">
          SKINSTRIC
        </span>
        <span className="text-[14px] font-semibold tracking-[-0.02em] uppercase text-muted flex items-center gap-1">
          <span className="text-border-soft">[</span>
          {section}
          <span className="text-border-soft">]</span>
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
