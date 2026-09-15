"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fadeOut } from "@/lib/pageExit";
import gsap from "gsap";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import DiamondFrame from "@/components/ui/DiamondFrame";
import AnalysisMenu, { AnalysisMenuHandle } from "@/components/ui/AnalysisMenu";

type Stage = "loading" | "ready";

export default function AnalysisPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("loading");

  const diamondFadeRef = useRef<HTMLDivElement>(null);
  const captionTextRef = useRef<HTMLSpanElement>(null);

  const loadingRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const menuWrapRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStage("ready"), 1800);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (stage !== "loading") return;

    gsap.set(diamondFadeRef.current, { opacity: 0 });
    gsap.set(captionTextRef.current, {
      clipPath: "inset(0 50% 0 50%)",
      opacity: 0,
    });

    const tl = gsap.timeline();
    tl.to(diamondFadeRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }).to(
      captionTextRef.current,
      {
        clipPath: "inset(0 0% 0 0%)",
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "<0.2",
    );

    return () => {
      tl.kill();
    };
  }, [stage]);

  useLayoutEffect(() => {
    if (stage !== "ready") return;

    gsap.set([captionRef.current, menuWrapRef.current, footerRef.current], {
      opacity: 0,
    });

    const tl = gsap.timeline();
    tl.to(loadingRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }).to(
      [captionRef.current, menuWrapRef.current, footerRef.current],
      { opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
      "<",
    );

    return () => {
      tl.kill();
    };
  }, [stage]);

  const analysisMenuRef = useRef<AnalysisMenuHandle>(null);

  async function playAnalysisExit(destination: string) {
    await Promise.all([
      analysisMenuRef.current?.shrinkOut(),
      fadeOut([captionRef.current, footerRef.current]),
    ]);
    router.push(destination);
  }

  function handleSelect(slug: string) {
    if (slug === "demographics") {
      playAnalysisExit("/analysis/demographics");
    } else {
      console.log(`No page built for "${slug}" yet`);
    }
  }

  if (stage === "loading") {
    return (
      <div
        ref={loadingRef}
        className="flex h-screen flex-col items-center justify-center"
      >
        <div ref={diamondFadeRef}>
          <DiamondFrame spin>
            <span
              ref={captionTextRef}
              className="inline-block text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-foreground"
            >
              Preparing your analysis ...
            </span>
          </DiamondFrame>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <SiteHeader section="ANALYSIS" />

      <div
        ref={captionRef}
        className="absolute left-8 top-24 max-w-[336px] md:left-10"
      >
        <h2 className="text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-foreground">
          A. I. Analysis
        </h2>
        <p className="label-caps mt-2 text-foreground">
          A. I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      <div
        ref={menuWrapRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <DiamondFrame>
          <AnalysisMenu ref={analysisMenuRef} onSelect={handleSelect} />
        </DiamondFrame>
      </div>

      <div
        ref={footerRef}
        className="absolute bottom-10 left-6 right-6 flex items-center justify-between md:left-10 md:right-10"
      >
        <NavDiamondButton
          label="Back"
          direction="left"
          solidText
          onClick={() => playAnalysisExit("/testing/scan")}
        />
        <NavDiamondButton
          label="Get Summary"
          direction="right"
          solidText
          onClick={() => playAnalysisExit("/analysis/summary")}
        />
      </div>
    </div>
  );
}
