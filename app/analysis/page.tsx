"use client";

import { useRouter } from "next/navigation";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import DiamondFrame from "@/components/ui/DiamondFrame";
import AnalysisMenu from "@/components/ui/AnalysisMenu";

export default function AnalysisPage() {
  const router = useRouter();

  function handleSelect(slug: string) {
    if (slug === "demographics") {
      router.push("/analysis/demographics");
    } else {
      // Skin Type Details / Cosmetic Concerns / Weather have no functional
      // requirements or API data in the technical requirements doc — visual
      // quadrants only, no destination page (yet).
      console.log(`No page built for "${slug}" yet`);
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <SiteHeader section="ANALYSIS" />

      <div className="absolute left-8 top-24 max-w-[336px] md:left-10">
        <h2 className="text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-foreground">
          A. I. Analysis
        </h2>
        <p className="label-caps mt-2 text-foreground">
          A. I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <DiamondFrame>
          <AnalysisMenu onSelect={handleSelect} />
        </DiamondFrame>
      </div>

      <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between md:left-10 md:right-10">
        <NavDiamondButton
          label="Back"
          direction="left"
          solidText
          onClick={() => router.push("/testing/scan")}
        />
        <NavDiamondButton
          label="Get Summary"
          direction="right"
          solidText
          onClick={() => router.push("/analysis/summary")}
        />
      </div>
    </div>
  );
}
