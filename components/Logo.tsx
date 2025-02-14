export default function Logo() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="w-auto h-12">
      <style>
        {`
          .text { font-family: serif; fill: currentColor; }
          .cross { fill: none; stroke: currentColor; stroke-width: 3; }
          .circle { fill: none; stroke: currentColor; stroke-width: 2; }
        `}
      </style>

      {/* Background Circle */}
      <circle cx="100" cy="50" r="40" className="circle" />

      {/* Cross */}
      <path d="M100 20 L100 80 M80 50 L120 50" className="cross" />

      {/* Text */}
      <text x="100" y="95" textAnchor="middle" className="text" fontSize="24">
        CNP
      </text>

      {/* Decorative Arc */}
      <path d="M70 30 A40 40 0 0 1 130 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    </svg>
  )
}
