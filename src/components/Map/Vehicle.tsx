import { motion, AnimatePresence } from 'framer-motion';

interface VehicleProps {
  x: number; // percentage
  y: number; // percentage
  rotation: number;
  isInWater: boolean;
  isMoving: boolean;
}

export function Vehicle({ x, y, rotation, isInWater, isMoving }: VehicleProps) {
  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: isMoving ? 1.05 : 1,
      }}
      transition={{ duration: 0.1 }}
    >
      <AnimatePresence mode="wait">
        {isInWater ? (
          <motion.div
            key="boat"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <BoatSprite isMoving={isMoving} />
          </motion.div>
        ) : (
          <motion.div
            key="car"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <CarSprite isMoving={isMoving} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Shadow/glow effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
        animate={{
          boxShadow: isInWater
            ? '0 0 30px rgba(0, 212, 255, 0.5)'
            : '0 0 30px rgba(0, 255, 136, 0.5)',
        }}
      />
    </motion.div>
  );
}

function CarSprite({ isMoving }: { isMoving: boolean }) {
  return (
    <svg width="50" height="25" viewBox="0 0 50 25" className="drop-shadow-lg">
      {/* Car body */}
      <rect x="5" y="8" width="40" height="12" rx="3" fill="#3d4449" />
      <rect x="10" y="5" width="25" height="10" rx="2" fill="#4a5568" />
      
      {/* Windows */}
      <rect x="12" y="6" width="9" height="7" rx="1" fill="#00d4ff" opacity="0.6" />
      <rect x="23" y="6" width="9" height="7" rx="1" fill="#00d4ff" opacity="0.6" />
      
      {/* Wheels */}
      <circle cx="14" cy="20" r="4" fill="#1a1d21" />
      <circle cx="14" cy="20" r="2" fill="#3d4449" />
      <circle cx="36" cy="20" r="4" fill="#1a1d21" />
      <circle cx="36" cy="20" r="2" fill="#3d4449" />
      
      {/* Headlights */}
      <rect x="43" y="10" width="4" height="3" rx="1" fill="#00ff88">
        {isMoving && (
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="0.3s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      <rect x="43" y="15" width="4" height="3" rx="1" fill="#00ff88">
        {isMoving && (
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="0.3s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      
      {/* Taillights */}
      <rect x="3" y="11" width="3" height="2" rx="0.5" fill="#ff4444" />
      <rect x="3" y="15" width="3" height="2" rx="0.5" fill="#ff4444" />
      
      {/* Speed lines when moving */}
      {isMoving && (
        <g opacity="0.6">
          <line x1="-5" y1="12" x2="2" y2="12" stroke="#00ff88" strokeWidth="1">
            <animate
              attributeName="x1"
              values="-5;-15;-5"
              dur="0.2s"
              repeatCount="indefinite"
            />
          </line>
          <line x1="-3" y1="16" x2="2" y2="16" stroke="#00ff88" strokeWidth="1">
            <animate
              attributeName="x1"
              values="-3;-12;-3"
              dur="0.25s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      )}
    </svg>
  );
}

function BoatSprite({ isMoving }: { isMoving: boolean }) {
  return (
    <svg width="50" height="30" viewBox="0 0 50 30" className="drop-shadow-lg">
      {/* Hull */}
      <path
        d="M 5 20 L 10 25 L 40 25 L 45 20 L 40 15 L 10 15 Z"
        fill="#1e3a5f"
        stroke="#3e6b9b"
        strokeWidth="1"
      />
      
      {/* Deck */}
      <rect x="12" y="12" width="26" height="8" rx="2" fill="#2d4a6f" />
      
      {/* Cabin */}
      <rect x="18" y="6" width="14" height="8" rx="2" fill="#3e6b9b" />
      <rect x="20" y="7" width="4" height="5" rx="1" fill="#00d4ff" opacity="0.6" />
      <rect x="26" y="7" width="4" height="5" rx="1" fill="#00d4ff" opacity="0.6" />
      
      {/* Antenna */}
      <line x1="25" y1="2" x2="25" y2="6" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx="25" cy="2" r="1.5" fill="#00ff88">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Wake effect when moving */}
      {isMoving && (
        <g>
          <path
            d="M 5 22 Q 0 25 -5 22"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          >
            <animate
              attributeName="d"
              values="M 5 22 Q 0 25 -5 22; M 5 22 Q -2 28 -10 22; M 5 22 Q 0 25 -5 22"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M 5 20 Q -2 22 -8 18"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          >
            <animate
              attributeName="d"
              values="M 5 20 Q -2 22 -8 18; M 5 20 Q -5 24 -15 16; M 5 20 Q -2 22 -8 18"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      )}
      
      {/* Navigation lights */}
      <circle cx="45" cy="18" r="2" fill="#00ff88" opacity="0.8">
        {isMoving && (
          <animate
            attributeName="r"
            values="2;3;2"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}
