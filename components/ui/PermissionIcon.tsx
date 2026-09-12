import { ReactNode } from "react";

interface PermissionIconProps {
  icon: ReactNode;
}

/**
 * Concentric-circle icon used for both camera/gallery permission buttons.
 * Ring sizes from Figma: 136 (outer, thin), 116.57 (middle, bold),
 * 102 (innermost — rendered as a plain filled disc, no visible border).
 * Ellipse 96 (dashed, opacity 0) is the hover-state reveal — skipped for
 * now, same as the diamond nav button's hover layers.
 */
export default function PermissionIcon({ icon }: PermissionIconProps) {
  return (
    <div className="relative h-[136px] w-[136px] shrink-0">
      <span className="absolute inset-0 rounded-full border border-[#1A1B1C]" />
      <span
        className="absolute flex items-center justify-center rounded-full border-4 border-[#1A1B1C]"
        style={{ inset: (136 - 116.57) / 2 }}
      >
        {icon}
      </span>
      {/* <span
        className="absolute rounded-full bg-[#1A1B1C]"
        style={{ inset: (136 - 102) / 2 }}
      /> */}
      {/* <span
        className="absolute flex items-center justify-center rounded-full bg-[#FCFCFC]"
        style={{ inset: (136 - 92.29) / 2 }}
      >
        {icon}
      </span> */}
    </div>
  );
}
