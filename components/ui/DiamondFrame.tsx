"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface DiamondFrameProps {
  children: ReactNode;
  scale?: number;
  spin?: boolean;
  fadeOuterOnHover?: boolean;
}

const RING_BOXES = [762, 682, 602];
const RING_OPACITIES = [0.3, 0.6, 1];
const SPIN_SPEED_MULTIPLIER = 1;
const RING_SPIN_DURATIONS = [40, 46, 52].map((d) => d * SPIN_SPEED_MULTIPLIER);

export default function DiamondFrame({
  children,
  scale = 1,
  spin = false,
  fadeOuterOnHover = false,
}: DiamondFrameProps) {
  const outerBox = RING_BOXES[0] * scale;
  const ringRefs = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    if (!spin) return;

    const tweens = RING_BOXES.map((_, i) => {
      const el = ringRefs.current[i];
      if (!el) return null;
      gsap.set(el, { transformOrigin: "50% 50%", rotation: 45 });
      return gsap.to(el, {
        rotation: "+=360",
        duration: RING_SPIN_DURATIONS[i],
        repeat: -1,
        ease: "none",
      });
    });

    return () => {
      tweens.forEach((t) => t?.kill());
    };
  }, [spin]);

  function handleEnter() {
    if (!fadeOuterOnHover) return;
    gsap.to(ringRefs.current[0], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleLeave() {
    if (!fadeOuterOnHover) return;
    gsap.to(ringRefs.current[0], {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative mx-auto flex items-center justify-center md:[width:var(--diamond-size)] md:[height:var(--diamond-size)]"
      style={{ "--diamond-size": `${outerBox}px` } as React.CSSProperties}
    >
      <svg
        className="absolute inset-0 hidden md:block"
        width={outerBox}
        height={outerBox}
        viewBox={`0 0 ${outerBox} ${outerBox}`}
      >
        {RING_BOXES.map((box, i) => {
          const side = box * scale * 0.7071;
          const offset = (outerBox - side) / 2;
          return (
            <rect
              key={i}
              ref={(el) => {
                ringRefs.current[i] = el;
              }}
              x={offset}
              y={offset}
              width={side}
              height={side}
              fill="none"
              stroke="var(--border-soft)"
              strokeWidth={2}
              strokeOpacity={RING_OPACITIES[i]}
              strokeLinecap="round"
              strokeDasharray="0.5 10"
              transform={
                spin ? undefined : `rotate(45 ${outerBox / 2} ${outerBox / 2})`
              }
            />
          );
        })}
      </svg>
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 md:py-0">
        {children}
      </div>
    </div>
  );
}
