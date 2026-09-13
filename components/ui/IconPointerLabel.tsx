"use client";

import { ReactNode } from "react";
import PermissionIcon from "./PermissionIcon";

interface IconPointerLabelProps {
  icon: ReactNode;
  label: string;
  dx: number;
  dy: number;
  onClick?: () => void;
  overlay?: ReactNode;
  overlayDx?: number;
  overlayDy?: number;
}

const ICON_RADIUS = 68;

export default function IconPointerLabel({
  icon,
  label,
  dx,
  dy,
  onClick,
  overlay,
  overlayDx = 0,
  overlayDy = 0,
}: IconPointerLabelProps) {
  const totalDistance = Math.hypot(dx, dy);
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  const lineLength = totalDistance - ICON_RADIUS;
  const pointsRight = dx >= 0;

  return (
    <div className="relative" style={{ width: 136, height: 136 }}>
      <button
        onClick={onClick}
        className="relative inline-flex cursor-pointer"
        style={{ width: 136, height: 136 }}
      >
        <PermissionIcon icon={icon} />

        <span
          className="absolute h-px bg-foreground"
          style={{
            width: lineLength,
            left: "50%",
            top: "50%",
            transformOrigin: "left center",
            transform: `rotate(${angleDeg}deg) translateX(${ICON_RADIUS}px)`,
          }}
        />

        <span
          className="absolute h-[5px] w-[5px] rounded-full border border-foreground bg-background"
          style={{
            left: `calc(50% + ${dx}px)`,
            top: `calc(50% + ${dy}px)`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <span
          className="label-caps absolute whitespace-pre-line text-foreground"
          style={{
            left: `calc(50% + ${dx}px)`,
            top: `calc(50% + ${dy}px)`,
            width: "max-content",
            textAlign: pointsRight ? "left" : "right",
            transform: pointsRight
              ? "translate(10px, -50%)"
              : "translate(calc(-100% - 10px), -50%)",
          }}
        >
          {label}
        </span>
      </button>

      {overlay && (
        <div
          className="absolute z-20"
          style={{ left: `calc(50% + ${overlayDx}px)`, top: `calc(50% + ${overlayDy}px)` }}
        >
          {overlay}
        </div>
      )}
    </div>
  );
}