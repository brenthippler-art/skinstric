"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { createLineRevealTimeline } from "@/lib/revealAnimation";

interface CategoryBoxProps {
  value: string;
  category: string;
  active: boolean;
  onClick: () => void;
}

function CategoryBox({
  value,
  category,
  active,
  onClick,
  lineRef,
  contentRef,
}: CategoryBoxProps & {
  lineRef: (el: HTMLSpanElement | null) => void;
  contentRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative hidden text-left cursor-pointer lg:block ${
        active ? "bg-[#1A1B1C] text-[#FCFCFC]" : "bg-[#F3F3F4] text-[#1A1B1C]"
      }`}
      style={{
        width: "10.83vw",
        maxWidth: 208,
        height: "10.83vh",
        maxHeight: 104,
      }}
    >
      <span
        ref={lineRef}
        className="absolute inset-x-0 top-0 h-px bg-[#1A1B1C]"
        style={{ opacity: active ? 0.3 : 1 }}
      />
      <div ref={contentRef} className="relative h-full">
        <span className="absolute left-4 top-[11px] text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6">
          {value}
        </span>
        <span className="absolute left-4 top-[67px] text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6">
          {category}
        </span>
      </div>
    </button>
  );
}

function CategoryPill({
  value,
  category,
  active,
  onClick,
  pillRef,
}: CategoryBoxProps & { pillRef: (el: HTMLButtonElement | null) => void }) {
  return (
    <button
      ref={pillRef}
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-0.5 px-2 py-3 text-center cursor-pointer lg:hidden ${
        active ? "bg-[#1A1B1C] text-[#FCFCFC]" : "bg-[#F3F3F4] text-[#1A1B1C]"
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[-0.02em] opacity-70">
        {category}
      </span>
      <span className="text-[13px] font-semibold uppercase tracking-[-0.02em] leading-tight">
        {value}
      </span>
    </button>
  );
}

interface DemographicSidebarProps {
  boxes: { key: string; value: string; category: string; active: boolean }[];
  onSelectCategory: (key: string) => void;
}

export default function DemographicSidebar({
  boxes,
  onSelectCategory,
}: DemographicSidebarProps) {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const master = gsap.timeline();

    boxes.forEach((_, i) => {
      const line = lineRefs.current[i];
      const content = contentRefs.current[i];
      if (!line || !content) return;

      const boxTl = createLineRevealTimeline(line, content, {
        lineDuration: 0.3,
        contentDuration: 0.4,
      });

      master.add(boxTl, i * 0.15);
    });

    const pills = pillRefs.current.filter(Boolean) as HTMLButtonElement[];
    gsap.set(pills, { opacity: 0 });
    master.to(
      pills,
      { opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.1 },
      0,
    );

    return () => {
      master.kill();
    };
  }, []);

  return (
    <>
      <div className="hidden flex-col gap-2 lg:flex">
        {boxes.map(({ key, ...box }, i) => (
          <CategoryBox
            key={key}
            {...box}
            onClick={() => onSelectCategory(key)}
            lineRef={(el) => {
              lineRefs.current[i] = el;
            }}
            contentRef={(el) => {
              contentRefs.current[i] = el;
            }}
          />
        ))}
      </div>
      <div className="flex w-full gap-1 lg:hidden">
        {boxes.map(({ key, ...box }, i) => (
          <CategoryPill
            key={key}
            {...box}
            onClick={() => onSelectCategory(key)}
            pillRef={(el) => {
              pillRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </>
  );
}
