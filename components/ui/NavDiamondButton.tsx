"use client";

import DiamondArrow from "./DiamondArrow";

interface NavDiamondButtonProps {
  label: string;
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  solidText?: boolean;
  light?: boolean;
}

export default function NavDiamondButton({
  label,
  direction,
  onClick,
  disabled = false,
  solidText = false,
  light = false,
}: NavDiamondButtonProps) {
  const icon = <DiamondArrow direction={direction} light={light} />;
  const textColor = light
    ? solidText
      ? "text-[#FCFCFC]"
      : "text-[#FCFCFC] opacity-70"
    : solidText
      ? "text-foreground"
      : "text-foreground/70";
  const text = (
    <span
      className={`uppercase text-[14px] leading-4 font-semibold tracking-[-0.02em] ${textColor}`}
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
