interface CornerDottedTrianglesProps {
  side: "left" | "right";
  apexOffset?: number | string;
}

export default function CornerDottedTriangles({
  side,
  apexOffset = 160,
  dotGap = 8,
}: CornerDottedTrianglesProps & { dotGap?: number }) {
  const isLeft = side === "left";

  const armBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    [isLeft ? "right" : "left"]: 0,
    width: "1400px",
    height: "1px",
    backgroundImage: `repeating-linear-gradient(to right, var(--border-soft) 0, var(--border-soft) 2px, transparent 2px, transparent ${dotGap}px)`,
    transformOrigin: isLeft ? "right center" : "left center",
  };

  return (
    <div
      className="pointer-events-none absolute top-0 hidden h-full md:block"
      style={{ [isLeft ? "left" : "right"]: 0, width: apexOffset }}
    >
      <div
        style={{ ...armBase, transform: "translateY(-50%) rotate(-45deg)" }}
      />
      <div
        style={{ ...armBase, transform: "translateY(-50%) rotate(45deg)" }}
      />
    </div>
  );
}
