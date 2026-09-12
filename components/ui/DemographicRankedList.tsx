"use client";

interface RankedItem {
  label: string;
  percentage: number;
}

interface DemographicRankedItemProps {
  category: string;
  items: RankedItem[];
  selectedLabel: string;
  onSelectedLabel: (label: string) => void;
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className="relative inline-flex h-2 w-2 shrink-0 items-center justify-center"
      style={{
        border: `1px solid ${selected ? "var(--background)" : "var(--foreground)"}`,
        transform: "rotate(45deg)",
      }}
    >
      <span
        className="h-[4px] w-[4px]"
        style={{
          backgroundColor: selected ? "var(--background)" : "var(--foreground)",
          opacity: selected ? 1 : 0,
        }}
      />
    </span>
  );
}

export default function DemographicRankedList({
  category,
  items,
  selectedLabel,
  onSelectedLabel,
}: DemographicRankedItemProps) {
  return (
    <div
      className="relative flex flex-col bg-[#F3F3F4]"
      style={{ width: 448, height: 544 }}
    >
      <span className="absolute inset-x-0 top-0 h-px bg-foreground" />

      <div className="flex items-center justify-between px-4 pt-[14px] pb-2">
        <span className="text-[16px] font-medium uppercase tracking-[-0.02em] leading-6 text-foreground opacity-80">
          {category}
        </span>
        <span className="text-[16px] font-medium uppercase tracking-[-0.02em] leading-6 text-foreground opacity-80">
          A. I. Confidence
        </span>
      </div>

      {items.map(({ label, percentage }) => {
        const selected = label === selectedLabel;
        return (
          <button
            key={label}
            onClick={() => onSelectedLabel(label)}
            className="flex h-12 items-center gap-3 px-4 text-left cursor-pointer"
            style={{ backgroundColor: selected ? "#1A1B1C" : "transparent" }}
          >
            <RadioDot selected={selected} />
            <span
              className="flex-1 text-[16px] font-normal tracking-[-0.02em] leading-6"
              style={{ color: selected ? "#FCFCFC" : "#1A1B1C" }}
            >
              {label}
            </span>
            <span
              className="text-[16px] font-normal tracking-[-0.02em] leading-6"
              style={{ color: selected ? "#FCFCFC" : "#1A1B1C" }}
            >
              {Math.round(percentage)}%
            </span>
          </button>
        );
      })}
    </div>
  );
}
