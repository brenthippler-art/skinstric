import gsap from "gsap";

export function fadeOut(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(targets, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      ...vars,
      onComplete: resolve,
    });
  });
}