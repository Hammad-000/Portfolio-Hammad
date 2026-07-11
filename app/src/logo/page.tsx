export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`logo-hammad-svg transition-all duration-300 ${className}`}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hammad Logo"
    >
      {/* Icon: Sharp Tech 'H' */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 8v24" />
        <path d="M26 8v24" />
        <path d="M14 20h12" />
      </g>

      {/* Text: Balanced Premium FontSpacing */}
      <text
        x="42"
        y="27"
        fontSize="24"
        fontWeight="900"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.03em"
      >
       
      </text>
    </svg>
  );
}