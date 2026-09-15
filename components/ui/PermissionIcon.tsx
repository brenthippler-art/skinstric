"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";

interface PermissionIconProps {
  icon: ReactNode;
}

export default function PermissionIcon({ icon }: PermissionIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  function handleEnter() {
    gsap.to(iconRef.current, { scale: 0.9, duration: 0.3, ease: "power2.out" });
  }

  function handleLeave() {
    gsap.to(iconRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  }

  return (
    <div
      ref={iconRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative h-[136px] w-[136px] shrink-0"
    >
      <span className="absolute inset-0 rounded-full border border-[#1A1B1C]" />
      <span
        className="absolute flex items-center justify-center rounded-full border-4 border-[#1A1B1C]"
        style={{ inset: (136 - 116.57) / 2 }}
      >
        {icon}
      </span>
    </div>
  );
}
