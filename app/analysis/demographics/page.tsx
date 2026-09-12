"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import DiamondArrow from "@/components/ui/DiamondArrow";
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

  function cycleCategory(direction: 1 | -1) {
    const idx = CATEGORY_ORDER.indexOf(activeCategory);
    const nextIdx =
      (idx + direction + CATEGORY_ORDER.length) % CATEGORY_ORDER.length;
    setActiveCategory(CATEGORY_ORDER[nextIdx]);
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
    setSelected({
      race: topLabel(data.race),
      age: topLabel(data.age),
      gender: topLabel(data.gender),
    });
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <SiteHeader section="ANALYSIS" />

      <div className="absolute left-8 top-20 flex flex-col gap-6">
        <span className="uppercase text-[16px] font-semibold">
          A. I. Analysis
        </span>
        <h2 className="text-[72px] font-normal uppercase leading-10 tracking-[-0.05em] text-foreground">
          DEMOGRAPHICS
        </h2>
        <p className="uppercase">Predicted Race & Age</p>
      </div>

      <div className="absolute inset-x-0 top-66 bottom-24 flex items-center pl-8">
        <div className="flex items-start gap-4">
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
      </div>

      <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between md:left-10 md:right-10">
        <NavDiamondButton
          label="Back"
          direction="left"
          solidText
          onClick={() => router.push("/analysis")}
        />
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="text-foreground uppercase text-xs border border-foreground px-4 py-2 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => console.log("Confirmed selections:", selected)}
            className="text-background text-xs uppercase bg-foreground text-background px-4 py-2 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
