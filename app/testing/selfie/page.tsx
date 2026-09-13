"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import PermissionIcon from "@/components/ui/PermissionIcon";
import CameraChecklist from "@/components/ui/CameraChecklist";
import LiveCameraCapture from "@/components/ui/LiveCameraCapture";
import { submitPhaseTwo } from "@/lib/api";
import { BsCameraFill } from "react-icons/bs";

type Stage = "loading" | "capturing" | "review";

function SettingUpCamera() {
  const rings = [
    { size: 604.03, rotate: -15, opacity: 0.3 },
    { size: 498, rotate: 0, opacity: 0.6 },
    { size: 405.18, rotate: 15, opacity: 1 },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
      <div
        className="relative hidden items-center justify-center lg:flex"
        style={{ width: 604.03, height: 604.03 }}
      >
        {rings.map((ring, i) => (
          <span
            key={i}
            className="absolute border-2 border-dashed border-[#A0A4AB]"
            style={{
              width: ring.size,
              height: ring.size,
              opacity: ring.opacity,
              transform: `rotate(${ring.rotate}deg)`,
            }}
          />
        ))}
        <PermissionIcon icon={<BsCameraFill size={80} />} />
      </div>

      <div className="lg:hidden">
        <PermissionIcon icon={<BsCameraFill size={80} />} />
      </div>

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
