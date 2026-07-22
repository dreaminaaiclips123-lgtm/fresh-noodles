export default function BowlMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bowl-glow" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bowl-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="#8f1c10" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="90" rx="190" ry="90" fill="url(#bowl-glow)" />
      <path
        d="M40 110 C40 170 110 210 200 210 C290 210 360 170 360 110 Z"
        fill="url(#bowl-body)"
      />
      <ellipse cx="200" cy="110" rx="160" ry="34" fill="var(--color-surface-2)" />
      <ellipse
        cx="200"
        cy="110"
        rx="160"
        ry="34"
        fill="none"
        stroke="var(--color-gold)"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <path
        d="M120 104c14-10 26 6 40-2s24-10 40 0 26 8 40 0 24-8 40 0"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
