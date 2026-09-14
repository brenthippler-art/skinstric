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
        <button className="group flex h-8 w-24 cursor-pointer items-center justify-center bg-foreground transition-colors duration-300 hover:bg-background">
          <span className="relative inline-block h-4 overflow-hidden">
            <span className="invisible whitespace-nowrap text-[10px] font-semibold uppercase leading-4">
              Enter Code
            </span>
            <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[10px] font-normal uppercase leading-4 text-background transition-transform duration-300 ease-out group-hover:-translate-y-full">
              Enter Code
            </span>
            <span className="absolute inset-0 flex translate-y-full items-center justify-center whitespace-nowrap text-[10px] font-semibold uppercase leading-4 text-foreground transition-transform duration-300 ease-out group-hover:translate-y-0">
              Enter Code
            </span>
          </span>
        </button>
      )}
    </header>
  );
}
