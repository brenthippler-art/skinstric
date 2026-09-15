"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitPhaseTwo } from "@/lib/api";
import { BsCameraFill } from "react-icons/bs";
import gsap from "gsap";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import DiamondFrame from "@/components/ui/DiamondFrame";
import PermissionIcon from "@/components/ui/PermissionIcon";
import CameraChecklist from "@/components/ui/CameraChecklist";
import LiveCameraCapture from "@/components/ui/LiveCameraCapture";

type Stage = "loading" | "capturing" | "review";

function SettingUpCamera() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col items-center justify-center gap-6 px-6"
    >
      <DiamondFrame spin>
        <PermissionIcon icon={<BsCameraFill size={80} />} />
      </DiamondFrame>

      <span className="text-center text-[16px] font-semibold uppercase tracking-[-0.02em] leading-6 text-[#1A1B1C]">
        Setting up camera ...
      </span>

      <div className="flex flex-col items-center gap-2">
        <span className="label-caps text-center text-[#1A1B1C]">
          To get better results make sure to have
        </span>
        <CameraChecklist
          items={["Neutral Expression", "Frontal Pose", "Adequate Lighting"]}
        />
      </div>
    </div>
  );
}

export default function SelfiePage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("loading");
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStage("capturing"), 1500);
    return () => clearTimeout(timer);
  }, []);

  function handleCapture(dataUrl: string) {
    setPhoto(dataUrl);
    setStage("review");
  }

  async function handleProceed() {
    if (!photo) return;
    setSubmitting(true);
    try {
      const result = await submitPhaseTwo(photo);
      localStorage.setItem(
        "skinstric_demographics",
        JSON.stringify(result.data),
      );
      router.push("/analysis");
    } catch (err) {
      console.error("Phase Two API call failed:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (stage === "loading") {
    return (
      <div className="flex h-screen flex-col">
        <SiteHeader section="INTRO" />
        <SettingUpCamera />
      </div>
    );
  }

  if (stage === "capturing") {
    return <LiveCameraCapture onCapture={handleCapture} />;
  }

  // stage === "review"
  return (
    <div className="relative h-screen overflow-hidden bg-[#1A1B1C]">
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt="Captured selfie"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <span
        className="label-caps absolute left-1/2 -translate-x-1/2 text-center text-[#FCFCFC]"
        style={{ top: "26.46vh" }}
      >
        Great shot!
      </span>

      <div className="absolute right-6 top-20 flex flex-col items-end gap-2 md:right-10 lg:inset-x-auto lg:bottom-auto lg:left-1/2 lg:top-[88.96vh] lg:right-auto lg:-translate-x-1/2 lg:items-center">
        <span className="label-caps text-right text-[#FCFCFC] lg:text-center">
          To get better results make sure to have
        </span>
        <CameraChecklist
          items={["Neutral Expression", "Frontal Pose", "Adequate Lighting"]}
          light
        />
      </div>

      <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between md:left-10 md:right-10">
        <NavDiamondButton
          label="Back"
          direction="left"
          solidText
          light
          onClick={() => setStage("capturing")}
        />
        <NavDiamondButton
          label={submitting ? "Submitting..." : "Proceed"}
          direction="right"
          solidText
          light
          disabled={submitting}
          onClick={handleProceed}
        />
      </div>
    </div>
  );
}
