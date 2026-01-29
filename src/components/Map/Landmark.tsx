import { motion } from 'framer-motion';
import type { Landmark as LandmarkType } from '../../data/content';

interface LandmarkProps {
  landmark: LandmarkType;
  onClick: () => void;
  isActive?: boolean;
}

// SVG icons for each landmark type (72px viewBox, scaled down for display)
const LandmarkIcons: Record<string, JSX.Element> = {
  voyage: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M36 16 L36 56 M26 26 L36 16 L46 26 M20 46 L36 56 L52 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="36" cy="36" r="6" fill="currentColor"/>
    </svg>
  ),
  marina: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M20 50 Q28 42 36 50 Q44 58 52 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M20 42 Q28 34 36 42 Q44 50 52 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M36 20 L36 38 M30 28 L42 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  safetytrack: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <rect x="24" y="28" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="30" cy="48" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="42" cy="48" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 24 L36 16 L52 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  techhub: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <rect x="22" y="26" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M28 26 L28 20 L44 20 L44 26" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="22" y1="34" x2="50" y2="34" stroke="currentColor" strokeWidth="2"/>
      <circle cx="36" cy="42" r="4" fill="currentColor"/>
    </svg>
  ),
  workshop: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M24 28 L36 20 L48 28 L48 48 L24 48 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="32" y="38" width="8" height="10" stroke="currentColor" strokeWidth="2"/>
      <circle cx="36" cy="32" r="3" fill="currentColor"/>
    </svg>
  ),
  tower: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M36 18 L36 54" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M28 26 L36 18 L44 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="36" cy="34" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="36" cy="34" r="3" fill="currentColor"/>
    </svg>
  ),
  presentations: (
    <svg viewBox="0 0 72 72" fill="none" className="w-9 h-9">
      <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <rect x="20" y="22" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M36 44 L36 52 M28 52 L44 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="36" cy="33" r="6" stroke="currentColor" strokeWidth="2"/>
      <path d="M33 33 L36 36 L42 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export function Landmark({ landmark, onClick, isActive = false }: LandmarkProps) {
  const icon = LandmarkIcons[landmark.id] || LandmarkIcons.techhub;

  return (
    <motion.button
      className="absolute z-10 group flex flex-col items-center"
      style={{
        left: `${landmark.x}%`,
        top: `${landmark.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Static label above icon */}
      <div 
        className={`
          mb-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap
          ${landmark.isWater 
            ? 'bg-ocean-mid/80 text-accent-cyan border border-accent-cyan/30' 
            : 'bg-metal-dark/80 text-accent border border-accent/30'
          }
          backdrop-blur-sm shadow-lg
        `}
      >
        {landmark.label}
      </div>

      {/* Pulsing background */}
      <motion.div
        className={`absolute rounded-full ${
          landmark.isWater ? 'bg-accent-cyan' : 'bg-accent'
        }`}
        animate={{
          scale: isActive ? [1, 1.8, 1] : [1, 1.5, 1],
          opacity: [0.3, 0.05, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '72px',
          height: '72px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: '12px', // Offset for label
        }}
      />

      {/* Icon container */}
      <motion.div
        className={`
          relative rounded-full flex items-center justify-center cursor-pointer
          ${landmark.isWater 
            ? 'text-accent-cyan hover:text-white' 
            : 'text-accent hover:text-white'
          }
          transition-colors duration-300
        `}
        whileHover={{ 
          filter: 'drop-shadow(0 0 12px currentColor)',
        }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
}
