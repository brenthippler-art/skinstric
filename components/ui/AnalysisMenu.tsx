"use client";

interface AnalysisMenuProps {
  onSelect: (section: string) => void;
}

const QUADRANTS = [
  { label: "Demographics", slug: "demographics", position: "top" as const },
  { label: "Skin Type\nDetails", slug: "skin-type", position: "left" as const },
  {
    label: "Cosmetic\nConcerns",
    slug: "consmetic-concerns",
    position: "right" as const,
  },
  { label: "Weather", slug: "weather", position: "bottom" as const },
];

const BOX = 313.67;
const HALF = BOX / 2;

export default function AnalysisMenu({ onSelect }: AnalysisMenuProps) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: BOX, height: BOX, transform: "rotate(45deg)" }}
    >
      {QUADRANTS.map(({ label, slug, position }) => (
        <button
          key={position}
          onClick={() => onSelect(slug)}
          className="absolute flex items-center justify-center border border-background bg-[#F3F3F4] hover:bg-[#E1E1E2] transition-colors cursor-pointer"
          style={{
            width: HALF,
            height: HALF,
            top: position === "left" || position === "bottom" ? HALF : 0,
            left: position === "right" || position === "bottom" ? HALF : 0,
          }}
        >
          <span
            className="whitespace-pre-line text-center text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-foreground"
            style={{ transform: "rotate(-45deg)" }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
