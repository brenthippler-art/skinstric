"use client";

import DiamondArrow from "./DiamondArrow";

interface NavDiamondButtonProps {
  label: string;
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  solidText?: boolean;
}

export default function NavDiamondButton({
  label,
  direction,
  onClick,
  disabled = false,
  solidText = false,
}: NavDiamondButtonProps) {
  const icon = <DiamondArrow direction={direction} />;
  const text = (
    // Figma's opacity for nav-button labels is inconsistent across screens —
    // most use foreground/70, but the Analysis screen's Back/Get Summary
    // buttons are specified at full foreground. `solidText` lets a page opt
    // into that exception without changing the shared default everywhere else.
    <span
      className={`uppercase text-[14px] leading-4 font-semibold tracking-[-0.02em] ${solidText ? "text-foreground" : "text-foreground/70"}`}
    >
      {label}
    </span>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex items-center gap-6 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
    >
      {direction === "left" ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
    </button>
  );
}
