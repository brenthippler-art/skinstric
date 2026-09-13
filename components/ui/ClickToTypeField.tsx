"use client";

import { useRef, useEffect, useState } from "react";
import DiamondFrame from "./DiamondFrame";

interface ClickToTypeFieldProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error?: string | null;
  underlineWidthVw: number;
}

export default function ClickToTypeField({
  prompt,
  value,
  onChange,
  onSubmit,
  error,
  underlineWidthVw,
}: ClickToTypeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isAutoFocusing = useRef(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasValue = value.trim().length > 0;

  return (
    <DiamondFrame>
      <span className="label-caps text-muted mb-2">
        {hasValue ? prompt : "Click to type"}
      </span>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (isAutoFocusing.current) {
            isAutoFocusing.current = false;
            return;
          }
          setIsFocused(true);
        }}
        onClick={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder={isFocused ? "" : prompt}
        className={`w-full min-w-[280px] bg-transparent text-center text-[clamp(1.75rem,4vw,3rem)] leading-tight tracking-[-0.03em] outline-none placeholder:tracking-[-0.03em] placeholder:text-foreground ${
          isFocused ? "caret-foreground" : "caret-transparent"
        }`}
      />

      <span
        className="mt-1 h-px bg-[#1A1B1C]"
        style={{ width: `${underlineWidthVw}vw` }}
        aria-hidden="true"
      />

      {error && <span className="label-caps mt-3 text-[#B3261E]">{error}</span>}
    </DiamondFrame>
  );
}
