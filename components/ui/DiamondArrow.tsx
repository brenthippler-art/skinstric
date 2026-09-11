interface DiamondArrowProps {
  direction: "left" | "right";
  className?: string;
}

export default function DiamondArrow({
  direction,
  className = "",
}: DiamondArrowProps) {
  return (
    <span
      className={`relative inline-flex h-[31px] w-[31px] items-center justify-center border border-[#1A1B1C] ${className}`}
      style={{ transform: "rotate(45deg)" }}
    >
      <span
        className="block h-0 w-0"
        style={{
          transform: `rotate(-45deg) ${direction === "left" ? "scaleX(-1)" : ""}`,
          borderTop: "5.445px solid transparent",
          borderBottom: "5.445px solid transparent",
          borderLeft: "9.43px solid #1A1B1C",
        }}
      />
    </span>
  );
}
