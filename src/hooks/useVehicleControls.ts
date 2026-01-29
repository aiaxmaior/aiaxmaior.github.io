import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  vx: number;
  vy: number;
}

interface VehicleControlsConfig {
  maxSpeed?: number;
  acceleration?: number;
  friction?: number;
  bounds?: { minX: number; maxX: number; minY: number; maxY: number };
}

interface VehicleControlsReturn {
  position: Position;
  velocity: Velocity;
  rotation: number;
  isMoving: boolean;
  setPosition: (pos: Position) => void;
  applyForce: (dx: number, dy: number) => void;
}

export function useVehicleControls(config: VehicleControlsConfig = {}): VehicleControlsReturn {
  const {
    maxSpeed = 2.5,
    acceleration = 0.15,
    friction = 0.94,
    bounds = { minX: 2, maxX: 98, minY: 2, maxY: 98 },
  } = config;

  const [position, setPosition] = useState<Position>({ x: 50, y: 75 });
  const [velocity, setVelocity] = useState<Velocity>({ vx: 0, vy: 0 });
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  
  const keysPressed = useRef<Set<string>>(new Set());
  const externalForce = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const animationFrameRef = useRef<number>();

  // Apply external force (for touch controls)
  const applyForce = useCallback((dx: number, dy: number) => {
    externalForce.current = { dx, dy };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
      e.preventDefault();
      keysPressed.current.add(key);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    keysPressed.current.delete(key);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const updatePhysics = () => {
      const keys = keysPressed.current;
      let ax = externalForce.current.dx;
      let ay = externalForce.current.dy;

      // Reset external force after applying
      externalForce.current = { dx: 0, dy: 0 };

      // Calculate acceleration based on pressed keys
      if (keys.has('arrowup') || keys.has('w')) ay -= acceleration;
      if (keys.has('arrowdown') || keys.has('s')) ay += acceleration;
      if (keys.has('arrowleft') || keys.has('a')) ax -= acceleration;
      if (keys.has('arrowright') || keys.has('d')) ax += acceleration;

      setVelocity(prev => {
        let newVx = (prev.vx + ax) * friction;
        let newVy = (prev.vy + ay) * friction;

        // Clamp velocity to max speed
        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          newVx *= scale;
          newVy *= scale;
        }

        // Stop if very slow
        if (Math.abs(newVx) < 0.01) newVx = 0;
        if (Math.abs(newVy) < 0.01) newVy = 0;

        return { vx: newVx, vy: newVy };
      });

      setPosition(prev => {
        const newX = Math.max(bounds.minX, Math.min(bounds.maxX, prev.x + velocity.vx));
        const newY = Math.max(bounds.minY, Math.min(bounds.maxY, prev.y + velocity.vy));
        return { x: newX, y: newY };
      });

      // Update rotation based on velocity direction
      if (Math.abs(velocity.vx) > 0.1 || Math.abs(velocity.vy) > 0.1) {
        setRotation(Math.atan2(velocity.vy, velocity.vx) * (180 / Math.PI));
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [velocity, acceleration, friction, maxSpeed, bounds]);

  return {
    position,
    velocity,
    rotation,
    isMoving,
    setPosition,
    applyForce,
  };
}
