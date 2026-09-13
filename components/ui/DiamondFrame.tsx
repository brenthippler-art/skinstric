import { ReactNode } from "react";

interface DiamondFrameProps {
  children: ReactNode;
  scale?: number;
}

const RING_BOXES = [762, 682, 602];
const RING_OPACITIES = [0.3, 0.6, 1];

export default function DiamondFrame({ children, scale = 1 }: DiamondFrameProps) {
  const outerBox = RING_BOXES[0] * scale;

  return (
    <div
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
              transform={`rotate(45 ${outerBox / 2} ${outerBox / 2})`}
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