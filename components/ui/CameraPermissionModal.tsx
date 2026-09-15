interface CameraPermissionModalProps {
  onAllow: () => void;
  onDeny: () => void;
}

export default function CameraPermissionModal({
  onAllow,
  onDeny,
}: CameraPermissionModalProps) {
  return (
    <div
      className="flex flex-col bg-[#1A1B1C]"
      style={{ width: 352, height: 136 }}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="px-4 pt-[14px] text-[16px] font-semibold uppercase leading-6 text-[#FCFCFC]">
        Allow A.I. to access your camera
      </span>
      <span className="mt-auto h-px w-full bg-[#FCFCFC]" />
      <div className="flex justify-end">
        <button
          onClick={onDeny}
          className="px-4 py-[9px] text-[14px] font-semibold uppercase tracking-[-0.02em] text-[#FCFCFC] opacity-70 cursor-pointer"
        >
          Deny
        </button>
        <button
          onClick={onAllow}
          className="px-4 py-[9px] text-[14px] font-semibold uppercase tracking-[-0.02em] text-[#FCFCFC] cursor-pointer"
        >
          Allow
        </button>
      </div>
    </div>
  );
}
