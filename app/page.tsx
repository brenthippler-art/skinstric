"use client";

import { useRouter } from "next/navigation";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import CornerDottedTriangles from "@/components/ui/CornerDottedTriangles";

export default function IntroPage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <SiteHeader section="INTRO" showEnterCode />

      <div className="relative flex flex-1 items-center justify-center">
        <CornerDottedTriangles side="left" apexOffset="15.68vw" dotGap={8} />
        <CornerDottedTriangles side="right" apexOffset="15.68vw" dotGap={8} />

        <h1 className="relative z-10 max-w-4xl px-6 text-center font-light leading-[0.9375] tracking-[-0.07em] text-[clamp(2.5rem,6.667vw,8rem)]">
          Sophisticated
          <br />
          skincare
        </h1>

        <div className="absolute bottom-6 left-6 z-10 md:bottom-auto md:left-10 md:top-1/2 md:-translate-y-1/2">
          <NavDiamondButton
            label="Discover A.I."
            direction="left"
            onClick={() => router.push("/discover")}
          />
        </div>

        <div className="absolute bottom-6 right-6 z-10 md:bottom-auto md:right-10 md:top-1/2 md:-translate-y-1/2">
          <NavDiamondButton
            label="Take Test"
            direction="right"
            onClick={() => router.push("/testing")}
          />
        </div>
      </div>

      <p className="label-caps max-w-[316px] ml-8 pb-4 text-foreground">
        Skinstric developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </p>
    </div>
  );
}
