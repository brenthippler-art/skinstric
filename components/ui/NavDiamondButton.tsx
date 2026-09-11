"use client";

import DiamondArrow from "./DiamondArrow";

interface NavDiamondButtonProps {
  label: string;
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
}

export default function NavDiamondButton({
  label,
  direction,
  onClick,
  disabled = false,
}: NavDiamondButtonProps) {
  const icon = <DiamondArrow direction={direction} />;
  const text = (
    <span className="uppercase text-[14px] leading-4 font-semibold tracking-[-0.02em] text-foreground/70">
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
