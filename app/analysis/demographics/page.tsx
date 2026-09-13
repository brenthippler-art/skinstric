"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import DemographicSidebar from "@/components/ui/DemographicSidebar";
import DemographicPanel from "@/components/ui/DemographicPanel";
import DemographicRankedList from "@/components/ui/DemographicRankedList";

type Category = "race" | "age" | "gender";
type ScoreMap = Record<string, number>;
type DemographicData = Record<Category, ScoreMap>;

const CATEGORY_ORDER: Category[] = ["race", "age", "gender"];
const CATEGORY_DISPLAY: Record<Category, string> = {
  race: "Race",
  age: "Age",
  gender: "Sex",
};

function titleCase(label: string) {
  return label.replace(/\b\w/g, (c) => c.toUpperCase());
}

function topLabel(scores: ScoreMap) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function DemographicPage() {
  const router = useRouter();
  const [data, setData] = useState<DemographicData | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("race");
  const [selected, setSelected] = useState<Record<Category, string>>({
    race: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem("skinstric_demographics");
    if (!raw) return;
    const parsed = JSON.parse(raw) as DemographicData;
    setData(parsed);
    setSelected({
      race: topLabel(parsed.race),
      age: topLabel(parsed.age),
      gender: topLabel(parsed.gender),
    });
  }, []);

  if (!data) {
    return (
      <div className="label-caps flex h-screen items-center justify-center text-muted">
        Loading...
      </div>
    );
  }

  const sidebarBoxes = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    value: titleCase(selected[cat]),
    category: CATEGORY_DISPLAY[cat],
    active: cat === activeCategory,
  }));

  const activeScores = data[activeCategory];
  const activeSelectedRaw = selected[activeCategory];
  const activePercentage = Number(
    (activeScores[activeSelectedRaw] * 100).toFixed(2),
  );

  const rankedItems = Object.entries(activeScores)
    .map(([rawLabel, score]) => ({
      label: titleCase(rawLabel),
      rawLabel,
      percentage: score * 100,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  function handleSelectedLabel(displayLabel: string) {
    const match = rankedItems.find((item) => item.label === displayLabel);
    if (!match) return;
    setSelected((prev) => ({ ...prev, [activeCategory]: match.rawLabel }));
  }

  function handleReset() {
    if (!data) return;

    setSelected({
      race: topLabel(data.race),
      age: topLabel(data.age),
      gender: topLabel(data.gender),
    });
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-y-auto md:h-screen md:overflow-hidden">
      <SiteHeader section="ANALYSIS" />

      <div className="flex flex-col px-8">
        <span className="text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-foreground pt-8">
          A. I. Analysis
        </span>
        <h2 className="text-[clamp(2.5rem,3.75vw,4.5rem)] font-normal uppercase leading-tight tracking-[-0.05em] text-foreground">
          DEMOGRAPHICS
        </h2>
        <p className="label-caps text-foreground lg:pb-18">Predicted Race & Age</p>
      </div>

      <div className="flex flex-1 flex-wrap items-start gap-4 px-6 py-8 md:gap-6 md:px-10 lg:min-h-0 lg:flex-nowrap lg:px-0 lg:py-0 lg:[gap:0.83vw] lg:[padding-left:1.67vw]">
        <DemographicSidebar
          boxes={sidebarBoxes}
          onSelectCategory={(key) => setActiveCategory(key as Category)}
        />
        <DemographicPanel
          value={titleCase(activeSelectedRaw)}
          percentage={activePercentage}
        />
        <DemographicRankedList
          category={CATEGORY_DISPLAY[activeCategory]}
          items={rankedItems}
          selectedLabel={titleCase(activeSelectedRaw)}
          onSelectedLabel={handleSelectedLabel}
        />
      </div>

      <div className="flex items-center justify-between px-6 pb-10 md:px-10">
        <NavDiamondButton
          label="Back"
          direction="left"
          solidText
          onClick={() => router.push("/analysis")}
        />
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="label-caps border border-foreground px-4 py-2 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => console.log("Confirmed selections:", selected)}
            className="label-caps bg-foreground text-background px-4 py-2 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}