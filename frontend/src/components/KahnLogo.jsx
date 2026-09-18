export default function KahnLogo({ 
  size = 32, 
  variant = 'crimson', // 'crimson' (faithful to Kayn), 'cyan', 'cyber'
  className = '',
  glow = true
}) {
  const isCrimson = variant === 'crimson'

  const gradientId = `kahn-grad-${variant}`
  const edgeGradId = `kahn-edge-${variant}`
  const glowId = `kahn-glow-${variant}`

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`kahn-logo-svg ${className}`}
      style={{
        filter: glow 
          ? isCrimson 
            ? 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.65)) drop-shadow(0 0 16px rgba(251, 146, 60, 0.4))'
            : 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.65)) drop-shadow(0 0 16px rgba(139, 92, 246, 0.4))'
          : 'none',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <defs>
        {/* Core Blade Body Gradient */}
        <linearGradient id={gradientId} x1="15%" y1="15%" x2="85%" y2="85%">
          {isCrimson ? (
            <>
              <stop offset="0%" stopColor="#1e0b16" />
              <stop offset="45%" stopColor="#3b081b" />
              <stop offset="85%" stopColor="#0f0714" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0a192f" />
              <stop offset="45%" stopColor="#1e1b4b" />
              <stop offset="85%" stopColor="#0f172a" />
            </>
          )}
        </linearGradient>

        {/* Sharp Cutting Edge Gradient */}
        <linearGradient id={edgeGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          {isCrimson ? (
            <>
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="25%" stopColor="#fb923c" />
              <stop offset="60%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="30%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#818cf8" />
            </>
          )}
        </linearGradient>

        {/* Energy Center Radial */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          {isCrimson ? (
            <>
              <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#ea580c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </>
          )}
        </radialGradient>
      </defs>

      {/* Central Vortex Energy Aura */}
      <circle cx="50" cy="50" r="34" fill={`url(#${glowId})`} />

      {/* Center Energy Slash Arcs */}
      <path 
        d="M32 46 C38 40, 62 40, 68 54" 
        stroke={`url(#${edgeGradId})`} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.85" 
      />
      <path 
        d="M68 54 C62 60, 38 60, 32 46" 
        stroke={`url(#${edgeGradId})`} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.85" 
      />

      {/* UPPER SCYTHE BLADE (Swooping downwards from Top-Right to Left) */}
      <g className="kahn-blade-upper">
        {/* Blade Body with Jagged Spine Nodes */}
        <path
          d="M78 18 
             C72 22, 65 20, 58 17 
             C55 13, 48 13, 44 16
             C40 13, 34 16, 30 19
             C24 23, 18 29, 13 37
             C10 42, 8 47, 8 50
             C11 48, 16 43, 22 39
             C30 34, 40 31, 52 31
             C62 31, 71 35, 76 43
             C80 49, 81 55, 78 60
             C83 52, 84 41, 80 32
             C84 30, 83 24, 78 18 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Outer Serrated Jagged Ridge / Spines */}
        <path
          d="M78 18 
             L74 24 L69 20 L64 25 L58 18 L52 23 L46 17 L40 22 L32 20 L24 28 L17 37 L8 50"
          stroke={`url(#${edgeGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Razor Inner Cutting Edge with lethal crescent curvature */}
        <path
          d="M8 50 
             C14 44, 24 38, 35 34 
             C47 30, 58 31, 68 35 
             C75 39, 80 46, 78 60"
          stroke={`url(#${edgeGradId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Inner Runes / Core Slash Line */}
        <path
          d="M24 38 C36 32, 50 33, 62 37"
          stroke="#ffedd5"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      {/* LOWER SCYTHE BLADE (Rotational Twin Swooping upwards from Bottom-Left to Right) */}
      <g className="kahn-blade-lower">
        {/* Blade Body with Jagged Spine Nodes */}
        <path
          d="M22 82 
             C28 78, 35 80, 42 83 
             C45 87, 52 87, 56 84
             C60 87, 66 84, 70 81
             C76 77, 82 71, 87 63
             C90 58, 92 53, 92 50
             C89 52, 84 57, 78 61
             C70 66, 60 69, 48 69
             C38 69, 29 65, 24 57
             C20 51, 19 45, 22 40
             C17 48, 16 59, 20 68
             C16 70, 17 76, 22 82 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Outer Serrated Jagged Ridge / Spines */}
        <path
          d="M22 82 
             L26 76 L31 80 L36 75 L42 82 L48 77 L54 83 L60 78 L68 80 L76 72 L83 63 L92 50"
          stroke={`url(#${edgeGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Razor Inner Cutting Edge with lethal crescent curvature */}
        <path
          d="M92 50 
             C86 56, 76 62, 65 66 
             C53 70, 42 69, 32 65 
             C25 61, 20 54, 22 40"
          stroke={`url(#${edgeGradId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Inner Runes / Core Slash Line */}
        <path
          d="M76 62 C64 68, 50 67, 38 63"
          stroke="#ffedd5"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
    </svg>
  )
}
