// Signature motif: a smooth signal/spline curve — a meaningful nod to the
// professor's field (digital signal processing & spline functions). Draws
// itself on load. Decorative but domain-true, not generic ornament.
export function SignalMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 240"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* sampling nodes implied by a piecewise spline through control points */}
      <path
        pathLength={1}
        className="animate-spline"
        d="M0,170 C100,170 140,60 240,60 C340,60 360,200 480,200 C600,200 600,40 720,40 C840,40 860,150 960,150 C1060,150 1100,90 1200,90"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        className="animate-spline-pulse"
        d="M0,170 C100,170 140,60 240,60 C340,60 360,200 480,200 C600,200 600,40 720,40 C840,40 860,150 960,150 C1060,150 1100,90 1200,90"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.18"
      />
    </svg>
  );
}
