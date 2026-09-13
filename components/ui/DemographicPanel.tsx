interface DemographicPanelProps {
  value: string;
  percentage: number;
}

export default function DemographicPanel({ value, percentage }: DemographicPanelProps) {
  return (
    <div className="relative w-full bg-[#F3F3F4] px-4 py-6 md:px-0 md:py-0 md:[height:min(56.67vh,544px)] md:[width:min(60.83vw,1168px)]">
      <span className="absolute inset-x-0 top-0 h-px bg-[#1A1B1C]" />

      <span className="block text-[clamp(1.5rem,2.5vw,2.5rem)] font-normal leading-tight tracking-[-0.05em] text-[#1A1B1C] md:absolute md:left-4 md:top-5">
        {value}
      </span>

      <div className="relative mx-auto mt-6 aspect-square w-40 md:absolute md:bottom-6 md:right-6 md:mx-0 md:mt-0 md:w-auto md:[height:min(60%,22vw)]">
        <CircleChart percentage={percentage} />
      </div>
    </div>
  );
}

function CircleChart({ percentage }: { percentage: number }) {
  const RADIUS = 47;
  const STROKE_WIDTH = 0.8;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx={50} cy={50} r={RADIUS} fill="none" stroke="#C1C2C3" strokeWidth={STROKE_WIDTH} />
        <circle
          cx={50}
          cy={50}
          r={RADIUS}
          fill="none"
          stroke="#1A1B1C"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-baseline text-[#1A1B1C]">
          <span className="text-[clamp(1.25rem,2.2vw,2.5rem)] font-normal tracking-[-0.05em]">
            {Math.round(percentage)}
          </span>
          <span className="text-[clamp(0.75rem,1.3vw,1.5rem)] font-normal tracking-[-0.05em]">%</span>
        </span>
      </div>
    </div>
  );
}