"use client";

export default function Grain() {
  return (
    <>
      {/* SVG grain filter definition */}
      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Full-screen grain overlay */}
      <div
        className="grain-overlay"
        style={{ filter: "url(#grain)" }}
        aria-hidden="true"
      />
    </>
  );
}
