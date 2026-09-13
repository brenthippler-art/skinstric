interface CategoryBoxProps {
  value: string;
  category: string;
  active: boolean;
  onClick: () => void;
}

function CategoryBox({ value, category, active, onClick }: CategoryBoxProps) {
  return (
    <button
      onClick={onClick}
      className={`relative hidden text-left cursor-pointer lg:block ${
        active ? "bg-[#1A1B1C] text-[#FCFCFC]" : "bg-[#F3F3F4] text-[#1A1B1C]"
      }`}
      style={{ width: "10.83vw", maxWidth: 208, height: "10.83vh", maxHeight: 104 }}
    >
      <span
        className="absolute inset-x-0 top-0 h-px bg-[#1A1B1C]"
        style={{ opacity: active ? 0.3 : 1 }}
      />
      <span className="absolute left-4 top-[11px] text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6">
        {value}
      </span>
      <span className="absolute left-4 top-[67px] text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6">
        {category}
      </span>
    </button>
  );
}

function CategoryPill({ value, category, active, onClick }: CategoryBoxProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-0.5 px-2 py-3 text-center cursor-pointer lg:hidden ${
        active ? "bg-[#1A1B1C] text-[#FCFCFC]" : "bg-[#F3F3F4] text-[#1A1B1C]"
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[-0.02em] opacity-70">
        {category}
      </span>
      <span className="text-[13px] font-semibold uppercase tracking-[-0.02em] leading-tight">
        {value}
      </span>
    </button>
  );
}

interface DemographicSidebarProps {
  boxes: { key: string; value: string; category: string; active: boolean }[];
  onSelectCategory: (key: string) => void;
}

export default function DemographicSidebar({ boxes, onSelectCategory }: DemographicSidebarProps) {
  return (
    <>
      <div className="hidden flex-col gap-2 lg:flex">
        {boxes.map(({ key, ...box }) => (
          <CategoryBox key={key} {...box} onClick={() => onSelectCategory(key)} />
        ))}
      </div>
      <div className="flex w-full gap-1 lg:hidden">
        {boxes.map(({ key, ...box }) => (
          <CategoryPill key={key} {...box} onClick={() => onSelectCategory(key)} />
        ))}
      </div>
    </>
  );
}