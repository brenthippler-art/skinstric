interface DiamondArrowProps {
  direction: "left" | "right";
  light?: boolean;
  className?: string;
}

export default function DiamondArrow({
  direction,
  light = false,
  className = "",
}: DiamondArrowProps) {
  const color = light ? "#FCFCFC" : "#1A1B1C";
  return (
    <span
      className={`relative inline-flex h-[31px] w-[31px] items-center justify-center ${className}`}
      style={{ transform: "rotate(45deg)", border: `1px solid ${color}` }}
    >
      <span
        className="block h-0 w-0"
        style={{
          transform: `rotate(-45deg) ${direction === "left" ? "scaleX(-1)" : ""}`,
          borderTop: "5.445px solid transparent",
          borderBottom: "5.445px solid transparent",
          borderLeft: `9.43px solid ${color}`,
        }}
      />
    </span>
  );
}
