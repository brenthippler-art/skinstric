"use client";

import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import IconPointerLabel from "@/components/ui/IconPointerLabel";
import DiamondFrame from "@/components/ui/DiamondFrame";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { BsCameraFill, BsImageFill } from "react-icons/bs";
import { submitPhaseTwo } from "@/lib/api";

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <SiteHeader section="INTRO" />

      <span className="label-caps px-6 pt-2 text-foreground/80 md:px-10">
        To start analysis
      </span>

      <div className="relative flex flex-1 items-center">
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: "calc(25vw - 255.27px)" }}
        >
          <DiamondFrame scale={0.67}>
            <IconPointerLabel
              icon={<BsCameraFill size={80} />}
              label={"Allow A.I. \nto Scan Your Face"}
              dx={103.5}
              dy={-95.5}
              onClick={() => console.log("request camera permission")}
            />
          </DiamondFrame>
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2"
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
