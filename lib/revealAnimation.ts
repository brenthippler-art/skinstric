import gsap from "gsap";

interface RevealOptions {
  lineDuration?: number;
  contentDuration?: number;
}

export function createLineRevealTimeline(
  line: Element | null,
  content: Element | null,
  { lineDuration = 0.5, contentDuration = 0.6 }: RevealOptions = {},
) {
  gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(content, { clipPath: "inset(0 0 100% 0)" });

  const tl = gsap.timeline();
  tl.to(line, { scaleX: 1, duration: lineDuration, ease: "power2.out" }).to(content, {
    clipPath: "inset(0 0 0% 0)",
    duration: contentDuration,
    ease: "power2.out",
  });

  return tl;
}