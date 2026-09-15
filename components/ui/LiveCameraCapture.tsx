"use client";

import { useRouter } from "next/navigation";
import { useCameraStream } from "@/lib/useCameraStream";
import CameraChecklist from "@/components/ui/CameraChecklist";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import { BsCameraFill } from "react-icons/bs";

export default function LiveCameraCapture({
  onCapture,
}: {
  onCapture: (dataUrl: string) => void;
}) {
  const { videoRef, error, isReady } = useCameraStream();
  const router = useRouter();

  function handleTakePicture() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");
    onCapture(dataUrl);
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#1A1B1C] text-[#FCFCFC]">
        <p className="label-caps">{error}</p>
        <button
          onClick={() => router.push("/testing/scan")}
          className="label-caps underline cursor-pointer"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-[#CDCECC]">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      <div className="relative z-10">
        <SiteHeader section="INTRO" light />
      </div>

      {isReady && (
        <>
          <button
            onClick={handleTakePicture}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer lg:bottom-auto lg:left-[89.53vw] lg:top-[46.77vh] lg:translate-x-0 lg:flex-row lg:gap-4"
          >
            <span className="label-caps text-[#FCFCFC] opacity-70">
              Take Picture
            </span>
            <span className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-[#FCFCFC]">
              <span className="absolute h-[55.11px] w-[55.11px] rounded-full bg-[#FCFCFC]" />
              <BsCameraFill
                size={22}
                className="relative z-10 text-[#1A1B1C]"
              />
            </span>
          </button>

          <div className="absolute right-6 top-20 flex flex-col items-end gap-2 md:right-10 lg:inset-x-auto lg:bottom-auto lg:left-1/2 lg:top-[88.96vh] lg:right-auto lg:-translate-x-1/2 lg:items-center lg:px-0 lg:md:left-1/2">
            <span className="label-caps text-right text-[#FCFCFC] lg:text-center">
              To get better results make sure to have
            </span>
            <CameraChecklist
              items={[
                "Neutral Expression",
                "Frontal Pose",
                "Adequate Lighting",
              ]}
              light
            />
          </div>

          <div className="absolute bottom-10 left-6 md:left-10">
            <NavDiamondButton
              label="Back"
              direction="left"
              light
              onClick={() => router.push("/testing/scan")}
            />
          </div>
        </>
      )}
    </div>
  );
}
