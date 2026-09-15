"use client";

import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";

interface AnalysisMenuProps {
  onSelect: (slug: string) => void;
}

export interface AnalysisMenuHandle {
  shrinkOut: () => Promise<void>;
}

const QUADRANTS = [
  { label: "Demographics", slug: "demographics", position: "top" as const },
  { label: "Skin Type\nDetails", slug: "skin-type", position: "left" as const },
  {
    label: "Cosmetic\nConcerns",
    slug: "cosmetic-concerns",
    position: "right" as const,
  },
  { label: "Weather", slug: "weather", position: "bottom" as const },
];

const BOX = 313.67;
const HALF = BOX / 2;

const AnalysisMenu = forwardRef<AnalysisMenuHandle, AnalysisMenuProps>(
  function AnalysisMenu({ onSelect }, ref) {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const mobileButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useLayoutEffect(() => {
      const buttons = buttonRefs.current.filter(Boolean) as HTMLButtonElement[];
      const mobileButtons = mobileButtonRefs.current.filter(
        Boolean,
      ) as HTMLButtonElement[];
      const all = [...buttons, ...mobileButtons];

      gsap.set(all, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ delay: 0.4 });
      tl.to(all, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.15,
      });

      return () => {
        tl.kill();
      };
    }, []);

    useImperativeHandle(ref, () => ({
      shrinkOut: () => {
        const buttons = buttonRefs.current.filter(
          Boolean,
        ) as HTMLButtonElement[];
        const mobileButtons = mobileButtonRefs.current.filter(
          Boolean,
        ) as HTMLButtonElement[];
        const all = [...buttons, ...mobileButtons];

        return new Promise<void>((resolve) => {
          gsap.to(all, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            stagger: 0.08,
            onComplete: resolve,
          });
        });
      },
    }));

    return (
      <>
        <div
          className="relative mx-auto hidden md:block"
          style={{ width: BOX, height: BOX, transform: "rotate(45deg)" }}
        >
          {QUADRANTS.map(({ label, slug, position }, i) => (
            <button
              key={position}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
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

        <div className="flex w-full max-w-xs flex-col gap-2 md:hidden">
          {QUADRANTS.map(({ label, slug }, i) => (
            <button
              key={slug}
              ref={(el) => {
                mobileButtonRefs.current[i] = el;
              }}
              onClick={() => onSelect(slug)}
              className="flex cursor-pointer items-center justify-center bg-[#F3F3F4] px-6 py-5 text-center transition-colors hover:bg-[#E1E1E2] active:bg-[#E1E1E2]"
            >
              <span className="text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-foreground">
                {label.replace("\n", " ")}
              </span>
            </button>
          ))}
        </div>
      </>
    );
  },
);

export default AnalysisMenu;
