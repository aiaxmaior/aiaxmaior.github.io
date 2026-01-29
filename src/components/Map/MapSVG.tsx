import { coastlinePoints } from '../../hooks/useTerrainDetection';

interface MapSVGProps {
  width?: number;
  height?: number;
}

export function MapSVG({ width = 1200, height = 600 }: MapSVGProps) {
  // Convert percentage coastline points to SVG coordinates
  const coastlinePath = coastlinePoints
    .map((p, i) => {
      const x = (p.x / 100) * width;
      const y = (p.y / 100) * height;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  // Create filled path for land (below coastline)
  const landPath = `${coastlinePath} L ${width} ${height} L 0 ${height} Z`;
  
  // Create filled path for water (above coastline)  
  const waterPath = `${coastlinePath} L ${width} 0 L 0 0 Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Ocean gradient */}
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000428" />
          <stop offset="50%" stopColor="#004e92" />
          <stop offset="100%" stopColor="#006bb3" />
        </linearGradient>
        
        {/* Land gradient */}
        <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d3a3a" />
          <stop offset="50%" stopColor="#1a2020" />
          <stop offset="100%" stopColor="#0f1515" />
        </linearGradient>
        
        {/* Beach/coast gradient */}
        <linearGradient id="coastGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a6363" />
          <stop offset="100%" stopColor="#2d3a3a" />
        </linearGradient>

        {/* Wave pattern */}
        <pattern id="wavePattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 0 10 Q 25 0 50 10 T 100 10"
            fill="none"
            stroke="rgba(0, 212, 255, 0.1)"
            strokeWidth="2"
          />
        </pattern>

        {/* Road pattern */}
        <pattern id="roadPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="transparent" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        </pattern>

        {/* Glow filter for landmarks */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width={width} height={height} fill="#0a1628" />

      {/* Water area */}
      <path d={waterPath} fill="url(#oceanGradient)" />
      
      {/* Wave overlay */}
      <path d={waterPath} fill="url(#wavePattern)" opacity="0.5">
        <animate
          attributeName="transform"
          type="translate"
          values="0,0; -100,0; 0,0"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>

      {/* Animated waves */}
      {[...Array(5)].map((_, i) => (
        <path
          key={i}
          d={`M 0 ${50 + i * 30} Q ${width / 4} ${30 + i * 30} ${width / 2} ${50 + i * 30} T ${width} ${50 + i * 30}`}
          fill="none"
          stroke="rgba(0, 212, 255, 0.15)"
          strokeWidth="2"
          opacity={0.3 - i * 0.05}
        >
          <animate
            attributeName="d"
            values={`M 0 ${50 + i * 30} Q ${width / 4} ${30 + i * 30} ${width / 2} ${50 + i * 30} T ${width} ${50 + i * 30}; M 0 ${50 + i * 30} Q ${width / 4} ${70 + i * 30} ${width / 2} ${50 + i * 30} T ${width} ${50 + i * 30}; M 0 ${50 + i * 30} Q ${width / 4} ${30 + i * 30} ${width / 2} ${50 + i * 30} T ${width} ${50 + i * 30}`}
            dur={`${4 + i}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}

      {/* Land area */}
      <path d={landPath} fill="url(#landGradient)" />

      {/* Coastline highlight */}
      <path
        d={coastlinePath}
        fill="none"
        stroke="url(#coastGradient)"
        strokeWidth="8"
        opacity="0.6"
      />
      
      {/* Coastline foam effect */}
      <path
        d={coastlinePath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="3"
        strokeDasharray="10 20"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0; 30"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Road network on land */}
      <g opacity="0.3">
        {/* Horizontal roads */}
        <line x1="0" y1={height * 0.55} x2={width} y2={height * 0.55} stroke="#3d4449" strokeWidth="4" />
        <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#3d4449" strokeWidth="4" />
        
        {/* Vertical roads */}
        <line x1={width * 0.25} y1={height * 0.45} x2={width * 0.25} y2={height} stroke="#3d4449" strokeWidth="4" />
        <line x1={width * 0.5} y1={height * 0.45} x2={width * 0.5} y2={height} stroke="#3d4449" strokeWidth="4" />
        <line x1={width * 0.75} y1={height * 0.45} x2={width * 0.75} y2={height} stroke="#3d4449" strokeWidth="4" />
      </g>

      {/* Decorative elements - small islands */}
      <ellipse cx={width * 0.15} cy={height * 0.18} rx="25" ry="15" fill="#2d3a3a" opacity="0.5" />
      <ellipse cx={width * 0.85} cy={height * 0.22} rx="20" ry="12" fill="#2d3a3a" opacity="0.5" />

      {/* Grid overlay for tech feel */}
      <g opacity="0.05">
        {[...Array(20)].map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={(i / 20) * height}
            x2={width}
            y2={(i / 20) * height}
            stroke="#00ff88"
            strokeWidth="1"
          />
        ))}
        {[...Array(30)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i / 30) * width}
            y1="0"
            x2={(i / 30) * width}
            y2={height}
            stroke="#00ff88"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}
