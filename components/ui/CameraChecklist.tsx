interface CameraChecklistProps {
  items: string[];
  light?: boolean;
}

export default function CameraChecklist({
  items,
  light = false,
}: CameraChecklistProps) {
  const color = light ? "#FCFCFC" : "#1A1B1C";
  return (
    <div className="flex flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-8">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-[5px]">
          <span
            className="h-2 w-2 shrink-0"
            style={{
              border: `1px solid ${color}`,
              transform: "rotate(-45deg)",
            }}
          />
          <span className="label-caps whitespace-nowrap" style={{ color }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
