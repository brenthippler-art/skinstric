"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/ui/SiteHeader";
import NavDiamondButton from "@/components/ui/NavDiamondButton";
import ClickToTypeField from "@/components/ui/ClickToTypeField";
import { validateTextField } from "@/lib/validation";
import { saveUserInfo } from "@/lib/storage";
import { submitPhaseOne } from "@/lib/api";

type Step = "name" | "location";

export default function TestingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleBack() {
    setError(null);
    if (step === "location") {
      setStep("name");
    } else {
      router.push("/");
    }
  }

  function handleNameSubmit() {
    const result = validateTextField(name, "Name");
    if (!result.isValid) {
      setError(result.error);
      return;
    }
    setError(null);
    setStep("location");
  }

  async function handleLocationSubmit() {
    const result = validateTextField(location, "Location");
    if (!result.isValid) {
      setError(result.error);
      return;
    }

    setError(null);
    setSubmitting(true);

    const userInfo = { name: name.trim(), location: location.trim() };
    saveUserInfo(userInfo);

    try {
      await submitPhaseOne(userInfo);
    } catch {
      // The demo API always simulates success server-side; if the network
      // call itself fails, we still let the user proceed since their info
      // is already safely stored locally.
    } finally {
      setSubmitting(false);
      router.push("/testing/scan");
    }
  }

  const canProceed = step === "location" && location.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader section="INTRO" />

      <span className="uppercase text-[16px] font-semibold px-6 pt-2 text-foreground md:px-10">
        To start analysis
      </span>

      <div className="flex flex-1 items-center justify-center">
        {step === "name" ? (
          <ClickToTypeField
            key="name"
            prompt="Introduce Yourself"
            value={name}
            onChange={setName}
            onSubmit={handleNameSubmit}
            error={error}
            underlineWidthVw={21.72}
          />
        ) : (
          <ClickToTypeField
            key="location"
            prompt="Where are you from?"
            value={location}
            onChange={setLocation}
            onSubmit={handleLocationSubmit}
            error={error}
            underlineWidthVw={25.05}
          />
        )}
      </div>

      <div className="flex items-center justify-between px-6  pb-10 md:px-10">
        <NavDiamondButton label="Back" direction="left" onClick={handleBack} />
        {canProceed && (
          <NavDiamondButton
            label={submitting ? "Submitting..." : "Proceed"}
            direction="right"
            onClick={handleLocationSubmit}
            disabled={submitting}
          />
        )}
      </div>
    </div>
  );
}
