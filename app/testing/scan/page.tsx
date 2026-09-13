"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCameraFill, BsImageFill } from "react-icons/bs";
import { submitPhaseTwo } from "@/lib/api";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import IconPointerLabel from "@/components/ui/IconPointerLabel";
import DiamondFrame from "@/components/ui/DiamondFrame";
import CameraPermissionModal from "@/components/ui/CameraPermissionModal";
import PermissionIcon from "@/components/ui/PermissionIcon";

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCameraPrompt, setShowCameraPrompt] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const result = await submitPhaseTwo(base64);
        localStorage.setItem(
          "skinstric_demographics",
          JSON.stringify(result.data),
        );
        router.push("/analysis");
      } catch (err) {
        console.error("Phase Two API call faile: ", err);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleAllowCamera() {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      router.push("/testing/selfie");
    } catch (err) {
      console.error("Camera permission denied or unavailable:", err);
      setShowCameraPrompt(false);
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <SiteHeader section="INTRO" />

      {showCameraPrompt && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowCameraPrompt(false)}
        />
      )}

      <span className="label-caps px-6 pt-2 text-foreground/80 md:px-10">
        To start analysis
      </span>

      {/* Desktop layout: connector-line icon groups with dashed diamond frames */}
      <div className="relative hidden flex-1 items-center lg:flex">
        <div
          className="absolute top-1/2 z-20 -translate-y-1/2"
          style={{ left: "calc(25vw - 255.27px)" }}
        >
          <DiamondFrame scale={0.67}>
            <IconPointerLabel
              icon={<BsCameraFill size={80} />}
              label={"Allow A.I. \nto Scan Your Face"}
              dx={103.5}
              dy={-95.5}
              onClick={() => setShowCameraPrompt(true)}
              overlay={
                showCameraPrompt ? (
                  <CameraPermissionModal
                    onAllow={handleAllowCamera}
                    onDeny={() => setShowCameraPrompt(false)}
                  />
                ) : undefined
              }
              overlayDx={112}
              overlayDy={-39}
            />
          </DiamondFrame>
        </div>

        <div
          className="absolute top-1/2 z-20 -translate-y-1/2"
          style={{ right: "calc(25vw - 255.27px)" }}
        >
          <DiamondFrame scale={0.67}>
            <IconPointerLabel
              icon={<BsImageFill size={80} />}
              label={"Allow A.I. \naccess Gallery"}
              dx={-100.83}
              dy={96.87}
              onClick={() => fileInputRef.current?.click()}
            />
          </DiamondFrame>
        </div>
      </div>

      {/* Mobile/tablet fallback: simple stacked icon + label, no connector line */}
      <div className="flex flex-1 flex-col items-center justify-center gap-12 px-6 lg:hidden">
        <button
          onClick={() => setShowCameraPrompt(true)}
          className="flex flex-col items-center gap-4 cursor-pointer"
        >
          <PermissionIcon icon={<BsCameraFill size={64} />} />
          <span className="label-caps text-center text-foreground">
            Allow A.I. to Scan Your Face
          </span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-4 cursor-pointer"
        >
          <PermissionIcon icon={<BsImageFill size={64} />} />
          <span className="label-caps text-center text-foreground">
            Allow A.I. access Gallery
          </span>
        </button>
      </div>

      {/* Mobile/tablet-only centered permission modal (desktop uses the overlay above) */}
      {showCameraPrompt && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center px-6 lg:hidden"
          onClick={() => setShowCameraPrompt(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CameraPermissionModal
              onAllow={handleAllowCamera}
              onDeny={() => setShowCameraPrompt(false)}
            />
          </div>
        </div>
      )}

      <div className="px-6 pb-10 md:px-10">
        <NavDiamondButton
          label="Back"
          direction="left"
          onClick={() => router.push("/testing")}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}