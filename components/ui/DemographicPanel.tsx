interface DemographicPanelProps {
  value: string;
  percentage: number;
}

const CIRCLE_SIZE = 384;
const STROKE_WIDTH = 3;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DemographicPanel({
  value,
  percentage,
}: DemographicPanelProps) {
  const dashOffset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div className="relative bg-[#F3F3F4]" style={{ width: 1168, height: 544 }}>
      <span className="absolute inset-x-0 top-0 h-px rounded-sm bg-foreground" />

      <span
        className="absolute text-[40px] font-normal leading-10 tracking-[-0.05em] text-foreground"
        style={{ left: 15, top: 20 }}
      >
        {value}
      </span>

      <div
        className="absolute"
        style={{ left: 768, top: 136, width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
      >
        <svg
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
        >
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#C1C2C3"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
          />
        </svg>

        <div
          className="absolute flex items-baseline"
          style={{ left: 165, top: 158 }}
        >
          <span className="text-[40px] font-normal leading-10 tracking-[-0.05em] text-foreground">
            {Math.round(percentage)}
          </span>
          <span className="text-[24px] font-normal leading-10 tracking-[-0.05em] text-foreground">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
