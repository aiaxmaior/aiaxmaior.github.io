import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapSVG } from './MapSVG';
import { Vehicle } from './Vehicle';
import { Landmark } from './Landmark';
import { useVehicleControls } from '../../hooks/useVehicleControls';
import { useTerrainDetection } from '../../hooks/useTerrainDetection';
import { landmarks } from '../../data/content';

interface InteractiveMapProps {
  onNavigate: (sectionId: string) => void;
}

export function InteractiveMap({ onNavigate }: InteractiveMapProps) {
  const { position, rotation, isMoving, applyForce } = useVehicleControls();
  const { isInWater, isNearCoast } = useTerrainDetection(position);
  const [showInstructions, setShowInstructions] = useState(true);
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickDelta, setJoystickDelta] = useState({ x: 0, y: 0 });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle joystick touch
  const handleJoystickStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setJoystickActive(true);
    setShowInstructions(false);
  }, []);

  const handleJoystickMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!joystickActive || !joystickRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const maxDistance = rect.width / 2 - 20;
    let dx = clientX - centerX;
    let dy = clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }
    
    setJoystickDelta({ x: dx, y: dy });
    applyForce(dx * 0.02, dy * 0.02);
  }, [joystickActive, applyForce]);

  const handleJoystickEnd = useCallback(() => {
    setJoystickActive(false);
    setJoystickDelta({ x: 0, y: 0 });
  }, []);

  // Hide instructions after first movement
  useEffect(() => {
    if (isMoving && showInstructions) {
      const timer = setTimeout(() => setShowInstructions(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isMoving, showInstructions]);

  // Check for nearby landmarks
  useEffect(() => {
    const nearbyLandmark = landmarks.find(lm => {
      const dx = Math.abs(lm.x - position.x);
      const dy = Math.abs(lm.y - position.y);
      return dx < 8 && dy < 8;
    });
    setActiveLandmark(nearbyLandmark?.id || null);
  }, [position]);

  const handleLandmarkClick = useCallback((targetSection: string) => {
    onNavigate(targetSection);
  }, [onNavigate]);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden rounded-2xl border border-ocean-mid/50">
      {/* Map background */}
      <div className="absolute inset-0">
        <MapSVG />
      </div>

      {/* Landmarks */}
      {landmarks.map(landmark => (
        <Landmark
          key={landmark.id}
          landmark={landmark}
          onClick={() => handleLandmarkClick(landmark.targetSection)}
          isActive={activeLandmark === landmark.id}
        />
      ))}

      {/* Vehicle */}
      <Vehicle
        x={position.x}
        y={position.y}
        rotation={rotation}
        isInWater={isInWater}
        isMoving={isMoving}
      />

      {/* Terrain indicator */}
      <motion.div
        className="absolute top-4 left-4 px-4 py-2 rounded-full glass text-sm font-medium flex items-center gap-2"
        animate={{
          backgroundColor: isInWater 
            ? 'rgba(0, 212, 255, 0.2)' 
            : 'rgba(0, 255, 136, 0.2)',
        }}
      >
        {isInWater ? (
          <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 17 Q7 13 11 17 Q15 21 19 17 L21 17"/>
            <path d="M5 10 L12 4 L19 10 L19 17 L5 17 Z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="8" width="18" height="10" rx="2"/>
            <circle cx="7" cy="18" r="2"/>
            <circle cx="17" cy="18" r="2"/>
            <path d="M5 8 L7 4 L17 4 L19 8"/>
          </svg>
        )}
        <span className={isInWater ? 'text-accent-cyan' : 'text-accent'}>
          {isInWater ? 'Ocean' : 'Land'}
        </span>
        {isNearCoast && (
          <span className="ml-1 text-yellow-400 text-xs">Coast</span>
        )}
      </motion.div>

      {/* Instructions overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl glass-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">↑</kbd>
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">↓</kbd>
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">→</kbd>
              </div>
              <span className="text-metal-chrome">or</span>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">W</kbd>
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">A</kbd>
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">S</kbd>
                <kbd className="px-2 py-1 bg-ocean-mid rounded text-accent font-mono text-xs">D</kbd>
              </div>
              <span className="text-metal-chrome">to explore</span>
            </div>
            <div className="text-center mt-2 text-xs text-metal-light">
              Click landmarks to navigate • Vehicle transforms in water
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini compass */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center">
        <motion.div
          animate={{ rotate: -rotation }}
          className="text-accent"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15 10H9L12 2Z"
              fill="currentColor"
            />
            <path
              d="M12 22L9 14H15L12 22Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        </motion.div>
      </div>

      {/* Active landmark indicator */}
      <AnimatePresence>
        {activeLandmark && (
          <motion.div
            className="absolute bottom-4 right-4 px-4 py-2 rounded-lg glass"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="text-xs text-metal-light">Near</div>
            <div className="text-accent font-semibold">
              {landmarks.find(l => l.id === activeLandmark)?.name}
            </div>
            <div className="text-xs text-metal-chrome mt-1">
              Click to explore →
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile joystick */}
      {isMobile && (
        <div
          ref={joystickRef}
          className="absolute bottom-20 left-4 w-24 h-24 rounded-full glass border-2 border-accent/30 touch-none"
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
          onMouseDown={handleJoystickStart}
          onMouseMove={handleJoystickMove}
          onMouseUp={handleJoystickEnd}
          onMouseLeave={handleJoystickEnd}
        >
          {/* Joystick base */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-accent/30" />
          </div>
          
          {/* Joystick knob */}
          <motion.div
            className="absolute w-10 h-10 rounded-full bg-accent/50 border-2 border-accent"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${joystickDelta.x}px), calc(-50% + ${joystickDelta.y}px))`,
            }}
            animate={{
              scale: joystickActive ? 1.1 : 1,
            }}
          />
          
          {/* Direction indicators */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
              <path d="M50 10 L55 25 L45 25 Z" fill="currentColor" className="text-accent" />
              <path d="M50 90 L55 75 L45 75 Z" fill="currentColor" className="text-accent" />
              <path d="M10 50 L25 45 L25 55 Z" fill="currentColor" className="text-accent" />
              <path d="M90 50 L75 45 L75 55 Z" fill="currentColor" className="text-accent" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
