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
      className={`relative h-[104px] w-[208px] text-left cursor-pointer ${active ? "bg-foreground text-background" : "bg-[#F3F3F4] text-foreground"}`}
    >
      <span
        className="absolute inset-x-0 top-0 h-px bg-foreground"
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

interface DemographicSidebarProps {
  boxes: { key: string; value: string; category: string; active: boolean }[];
  onSelectCategory: (key: string) => void;
}

export default function DemographicSidebar({
  boxes,
  onSelectCategory,
}: DemographicSidebarProps) {
  return (
    <div className="flex flex-col gap-2">
      {boxes.map((box, i) => (
        <CategoryBox
          key={box.key}
          value={box.value}
          category={box.category}
          active={box.active}
          onClick={() => onSelectCategory(box.key)}
        />
      ))}
    </div>
  );
}
