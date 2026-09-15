"use client";

import { useLayoutEffect, useRef } from "react";
import { createLineRevealTimeline } from "@/lib/revealAnimation";
import gsap from "gsap";

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center"
      style={{
        border: `1px solid ${selected ? "var(--background)" : "var(--foreground)"}`,
        transform: "rotate(45deg)",
      }}
    >
      <span
        className="h-[6px] w-[6px]"
        style={{
          backgroundColor: selected ? "var(--background)" : "var(--foreground)",
          opacity: selected ? 1 : 0,
        }}
      />
    </span>
  );
}

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

export default function DemographicRankedList({
  category,
  items,
  selectedLabel,
  onSelectedLabel,
}: DemographicRankedItemProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = createLineRevealTimeline(lineRef.current, contentRef.current);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative flex w-full flex-col bg-[#F3F3F4] md:[height:min(56.67vh,544px)] md:[width:min(23.33vw,448px)] md:overflow-y-auto">
      <span
        ref={lineRef}
        className="absolute inset-x-0 top-0 h-px bg-foreground"
      />

      <div ref={contentRef} className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-4 pt-[14px] pb-2">
          <span className="text-[16px] font-medium uppercase tracking-[-0.02em] leading-6 text-[#1A1B1C] opacity-80">
            {category}
          </span>
          <span className="text-[16px] font-medium uppercase tracking-[-0.02em] leading-6 text-[#1A1B1C] opacity-80">
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
              style={{
                backgroundColor: selected ? "var(--foreground)" : "transparent",
              }}
            >
              <RadioDot selected={selected} />
              <span
                className="flex-1 text-[16px] font-normal tracking-[-0.02em] leading-6"
                style={{
                  color: selected ? "var(--background)" : "var(--foreground)",
                }}
              >
                {label}
              </span>
              <span
                className="text-[16px] font-normal tracking-[-0.02em] leading-6"
                style={{
                  color: selected ? "var(--background)" : "var(--foreground)",
                }}
              >
                {Math.round(percentage)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
