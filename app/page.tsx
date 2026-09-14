"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import SiteHeader from "@/components/ui/SiteHeader";
import CornerDottedTriangles from "@/components/ui/CornerDottedTriangles";

const REVEAL_BOXES = [762, 682, 602];

export default function IntroPage() {
  const router = useRouter();

  // Shared
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Mount-in diamond reveal overlay
  const diamondOverlayRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Right side ("Take Test")
  const takeTestGroupRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const takeTestLabelRef = useRef<HTMLSpanElement>(null);
  const outerDiamondRef = useRef<HTMLSpanElement>(null);
  const innerDiamondRef = useRef<HTMLSpanElement>(null);
  const baseDiamondRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Left side ("Discover A.I.")
  const discoverGroupRef = useRef<HTMLDivElement>(null);
  const discoverRing2Ref = useRef<HTMLDivElement>(null);
  const discoverRing3Ref = useRef<HTMLDivElement>(null);
  const discoverLabelRef = useRef<HTMLSpanElement>(null);
  const discoverOuterDiamondRef = useRef<HTMLSpanElement>(null);
  const discoverInnerDiamondRef = useRef<HTMLSpanElement>(null);
  const discoverBaseDiamondRef = useRef<HTMLSpanElement>(null);
  const discoverTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(headerRef.current, { opacity: 0 });
    gsap.set(h1Ref.current, { y: 100 });
    gsap.set(pRef.current, { y: 60 });
    gsap.set(discoverGroupRef.current, { x: "-100vw" });
    gsap.set(takeTestGroupRef.current, { x: "100vw" });

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];

    const tl = gsap.timeline();

    tl.to(
      paths,
      { strokeDashoffset: 0, duration: 4, ease: "power1.inOut" },
      0,
    )
      .to(
        diamondOverlayRef.current,
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        "+=0.3",
      )
      .to(h1Ref.current, { y: 0, duration: 0.8, ease: "power3.out" }, "<")
      .to(pRef.current, { y: 0, duration: 0.8, ease: "power3.out" }, "<")
      .to(
        discoverGroupRef.current,
        { x: 0, duration: 0.8, ease: "power3.out" },
        "<",
      )
      .to(
        takeTestGroupRef.current,
        { x: 0, duration: 0.8, ease: "power3.out" },
        "<",
      )
      .to(
        headerRef.current,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "<",
      );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    gsap.set([outerDiamondRef.current, innerDiamondRef.current], {
      xPercent: -50,
      yPercent: -50,
      rotation: 45,
      scale: 0.5,
      opacity: 0,
    });

    gsap.set(ring2Ref.current, {
      transformOrigin: "right center",
      scaleX: 15.68 / 18,
    });
    gsap.set(ring3Ref.current, {
      transformOrigin: "right center",
      scaleX: 15.68 / 20,
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: "power2.out" },
    });

    tl.to(h1Ref.current, { x: "-30vw" }, 0)
      .fromTo(
        h1Ref.current,
        { textAlign: "center" },
        { textAlign: "left", duration: 0, immediateRender: false },
        0,
      )
      .to(discoverGroupRef.current, { opacity: 0 }, 0)
      .to(ring2Ref.current, { opacity: 0.85, scaleX: 1 }, 0)
      .to(ring3Ref.current, { opacity: 0.7, scaleX: 1 }, 0)
      .to(baseDiamondRef.current, { opacity: 0 }, 0)
      .to(outerDiamondRef.current, { opacity: 1, scale: 1 }, 0)
      .to(innerDiamondRef.current, { opacity: 1, scale: 1 }, 0)
      .to(takeTestLabelRef.current, { x: -28 }, 0);

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    gsap.set(
      [discoverOuterDiamondRef.current, discoverInnerDiamondRef.current],
      {
        xPercent: -50,
        yPercent: -50,
        rotation: 45,
        scale: 0.5,
        opacity: 0,
      },
    );

    gsap.set(discoverRing2Ref.current, {
      transformOrigin: "left center",
      scaleX: 15.68 / 18,
    });
    gsap.set(discoverRing3Ref.current, {
      transformOrigin: "left center",
      scaleX: 15.68 / 20,
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: "power2.out" },
    });

    tl.to(h1Ref.current, { x: "30vw" }, 0)
      .fromTo(
        h1Ref.current,
        { textAlign: "center" },
        { textAlign: "right", duration: 0, immediateRender: false },
        0,
      )
      .to(takeTestGroupRef.current, { opacity: 0 }, 0)
      .to(discoverRing2Ref.current, { opacity: 0.85, scaleX: 1 }, 0)
      .to(discoverRing3Ref.current, { opacity: 0.7, scaleX: 1 }, 0)
      .to(discoverBaseDiamondRef.current, { opacity: 0 }, 0)
      .to(discoverOuterDiamondRef.current, { opacity: 1, scale: 1 }, 0)
      .to(discoverInnerDiamondRef.current, { opacity: 1, scale: 1 }, 0)
      .to(discoverLabelRef.current, { x: 28 }, 0);

    discoverTimelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        ref={diamondOverlayRef}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        <svg
          width={REVEAL_BOXES[0]}
          height={REVEAL_BOXES[0]}
          viewBox={`0 0 ${REVEAL_BOXES[0]} ${REVEAL_BOXES[0]}`}
        >
          <defs>
            {REVEAL_BOXES.map((box, i) => {
              const c = REVEAL_BOXES[0] / 2;
              const half = box / 2;
              const d = `M ${c} ${c - half} L ${c + half} ${c} L ${c} ${c + half} L ${c - half} ${c} Z`;
              const perimeter = box * 2.828427;
              return (
                <mask
                  key={box}
                  id={`reveal-mask-${i}`}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={REVEAL_BOXES[0]}
                  height={REVEAL_BOXES[0]}
                >
                  <path
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={d}
                    stroke="white"
                    strokeWidth={6}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={perimeter}
                    strokeDashoffset={perimeter}
                  />
                </mask>
              );
            })}
          </defs>

          {REVEAL_BOXES.map((box, i) => {
            const c = REVEAL_BOXES[0] / 2;
            const half = box / 2;
            const d = `M ${c} ${c - half} L ${c + half} ${c} L ${c} ${c + half} L ${c - half} ${c} Z`;
            return (
              <path
                key={box}
                d={d}
                fill="none"
                stroke="var(--border-soft)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="0.5 10"
                mask={`url(#reveal-mask-${i})`}
              />
            );
          })}
        </svg>
      </div>

      <div ref={headerRef}>
        <SiteHeader section="INTRO" showEnterCode />
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div
          ref={discoverGroupRef}
          className="pointer-events-none absolute inset-0"
        >
          <CornerDottedTriangles side="left" apexOffset="15.68vw" dotGap={8} />

          <div className="absolute bottom-6 left-6 z-10 md:bottom-auto md:left-10 md:top-1/2 md:-translate-y-1/2">
            <button
              onClick={() => router.push("/discover")}
              onMouseEnter={() => discoverTimelineRef.current?.play()}
              onMouseLeave={() => discoverTimelineRef.current?.reverse()}
              className="group pointer-events-auto flex items-center gap-6 cursor-pointer"
            >
              <span className="relative inline-flex h-[31px] w-[31px] items-center justify-center">
                <span
                  ref={discoverOuterDiamondRef}
                  className="absolute left-1/2 top-1/2 border border-foreground"
                  style={{ width: 70.71, height: 70.71 }}
                />
                <span
                  ref={discoverInnerDiamondRef}
                  className="absolute left-1/2 top-1/2 border border-dashed border-foreground"
                  style={{ width: 49.5, height: 49.5 }}
                />
                <span
                  ref={discoverBaseDiamondRef}
                  className="absolute inset-0 border border-foreground"
                  style={{ transform: "rotate(45deg)" }}
                />
                <span
                  className="relative block h-0 w-0"
                  style={{
                    transform: "scaleX(-1)",
                    borderTop: "5.445px solid transparent",
                    borderBottom: "5.445px solid transparent",
                    borderLeft: "9.43px solid var(--foreground)",
                  }}
                />
              </span>
              <span
                ref={discoverLabelRef}
                className="translate-y-[2px] uppercase text-[14px] leading-4 font-semibold tracking-[-0.02em] text-foreground/70"
              >
                Discover A.I.
              </span>
            </button>
          </div>
        </div>

        <div
          ref={discoverRing2Ref}
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0 }}
        >
          <CornerDottedTriangles side="left" apexOffset="18vw" dotGap={10} />
        </div>
        <div
          ref={discoverRing3Ref}
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0 }}
        >
          <CornerDottedTriangles side="left" apexOffset="20vw" dotGap={12} />
        </div>

        <div
          ref={takeTestGroupRef}
          className="pointer-events-none absolute inset-0"
        >
          <CornerDottedTriangles side="right" apexOffset="15.68vw" dotGap={8} />
          <div
            ref={ring2Ref}
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0 }}
          >
            <CornerDottedTriangles side="right" apexOffset="18vw" dotGap={10} />
          </div>
          <div
            ref={ring3Ref}
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0 }}
          >
            <CornerDottedTriangles side="right" apexOffset="20vw" dotGap={12} />
          </div>

          <div className="absolute bottom-6 right-6 z-10 md:bottom-auto md:right-10 md:top-1/2 md:-translate-y-1/2">
            <button
              onClick={() => router.push("/testing")}
              onMouseEnter={() => timelineRef.current?.play()}
              onMouseLeave={() => timelineRef.current?.reverse()}
              className="group pointer-events-auto flex items-center gap-6 cursor-pointer"
            >
              <span
                ref={takeTestLabelRef}
                className="translate-y-[2px] uppercase text-[14px] leading-4 font-semibold tracking-[-0.02em] text-foreground/70"
              >
                Take Test
              </span>
              <span className="relative inline-flex h-[31px] w-[31px] items-center justify-center">
                <span
                  ref={outerDiamondRef}
                  className="absolute left-1/2 top-1/2 border border-foreground"
                  style={{ width: 70.71, height: 70.71 }}
                />
                <span
                  ref={innerDiamondRef}
                  className="absolute left-1/2 top-1/2 border border-dashed border-foreground"
                  style={{ width: 49.5, height: 49.5 }}
                />
                <span
                  ref={baseDiamondRef}
                  className="absolute inset-0 border border-foreground"
                  style={{ transform: "rotate(45deg)" }}
                />
                <span
                  className="block h-0 w-0"
                  style={{
                    borderTop: "5.445px solid transparent",
                    borderBottom: "5.445px solid transparent",
                    borderLeft: "9.43px solid var(--foreground)",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        <h1
          ref={h1Ref}
          className="relative z-10 max-w-4xl px-6 text-center font-light leading-[0.9375] tracking-[-0.07em] text-[clamp(2.5rem,6.667vw,8rem)]"
        >
          Sophisticated
          <br />
          skincare
        </h1>
      </div>

      <p
        ref={pRef}
        className="label-caps max-w-[316px] ml-8 pb-4 text-foreground"
      >
        Skinstric developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </p>
    </div>
  );
}
