import React, { ReactNode, useRef, useState } from "react";

// ── BentoTilt ──────────────────────────────────────────────────────────────
// Wrapper that applies a live 3D tilt transform based on mouse position.
// Used around BentoCard instances in the Features grid.
export const BentoTilt = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    // Normalise cursor position to 0–1 range relative to the card
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    // Map to ±7.5° tilt range
    const tiltX = (relativeY - 0.5) * 15;
    const tiltY = (relativeX - 0.5) * 15;

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className || ""}
    >
      {children}
    </div>
  );
};

// ── BentoCard ──────────────────────────────────────────────────────────────
// Individual feature card: full-bleed looping video background with
// a title and optional description overlaid on top.
const BentoCard = ({
  title,
  src,
  description,
}: {
  title: ReactNode;
  src: string;
  description?: string;
  isComingSoon?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative h-96 md:h-full mb-7 w-full overflow-hidden rounded-md md:min-h-[55vh] border border-white/20">
      <div className="absolute size-full">
        {/* Looping background video */}
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          autoPlay
          muted
          className="absolute inset-0 size-full object-cover object-center"
        />

        {/* Title + description overlay */}
        <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
          <div>
            <h1 className="bento-title special-font">{title}</h1>
            {description && (
              <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
