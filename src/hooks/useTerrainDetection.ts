import { useMemo } from 'react';

interface Position {
  x: number;
  y: number;
}

// The coastline is defined as a percentage-based path
// Below the coastline (higher Y values) is land, above is water

// Define more complex coastline with variation
const coastlinePoints = [
  { x: 0, y: 42 },
  { x: 10, y: 38 },
  { x: 20, y: 44 },
  { x: 30, y: 40 },
  { x: 40, y: 36 },
  { x: 50, y: 42 },
  { x: 60, y: 38 },
  { x: 70, y: 44 },
  { x: 80, y: 40 },
  { x: 90, y: 36 },
  { x: 100, y: 42 },
];

function getCoastlineYAtX(x: number): number {
  // Find the two points that bracket x
  let p1 = coastlinePoints[0];
  let p2 = coastlinePoints[coastlinePoints.length - 1];
  
  for (let i = 0; i < coastlinePoints.length - 1; i++) {
    if (coastlinePoints[i].x <= x && coastlinePoints[i + 1].x >= x) {
      p1 = coastlinePoints[i];
      p2 = coastlinePoints[i + 1];
      break;
    }
  }
  
  // Linear interpolation
  const t = (x - p1.x) / (p2.x - p1.x);
  return p1.y + t * (p2.y - p1.y);
}

export function useTerrainDetection(position: Position) {
  const isInWater = useMemo(() => {
    const coastlineY = getCoastlineYAtX(position.x);
    return position.y < coastlineY;
  }, [position.x, position.y]);

  const distanceToCoast = useMemo(() => {
    const coastlineY = getCoastlineYAtX(position.x);
    return Math.abs(position.y - coastlineY);
  }, [position.x, position.y]);

  const isNearCoast = useMemo(() => {
    return distanceToCoast < 8;
  }, [distanceToCoast]);

  return {
    isInWater,
    isNearCoast,
    distanceToCoast,
    coastlineY: getCoastlineYAtX(position.x),
  };
}

export { coastlinePoints, getCoastlineYAtX };
