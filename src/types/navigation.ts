export type DeviceType = 'computer' | 'printer' | 'screen' | 'scanner' | 'kiosk' | 'network' | 'other';

export type DeviceStatus = 'working' | 'maintenance' | 'idle';

export interface DeviceItem {
  id: string;
  name: string;
  type: DeviceType;
  brand: string;
  model: string;
  serialNumber?: string;
  assetTag?: string;
  status: DeviceStatus;
  notes?: string;
}

export type WingType = 'left' | 'right' | 'center';
export type DirectionType = 'left' | 'right' | 'straight' | 'stairs' | 'elevator';

export interface LocationItem {
  id: string;
  name: string;
  floor: number; // 0 = ground, 1 = first floor
  wing: WingType;
  direction: DirectionType;
  directionText: string;
  description: string;
  detailedPath: string[];
  distanceMeters: number;
  walkTimeSeconds: number;
  iconName: string; // lucide icon identifier
  roomNumber?: string;
  colorScheme?: string;
  devices: DeviceItem[];
  // SVG coordinates for visual 2D floorplan (relative to 800x500 viewport)
  mapCoordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
    doorX: number;
    doorY: number;
  };
}

export interface CorridorNode {
  id: string;
  name: string;
  iconName: string;
  x: number;
  y: number;
  floor: number;
}
