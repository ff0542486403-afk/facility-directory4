import React from 'react';
import { LocationItem, CorridorNode } from '../types/navigation';
import { DynamicIcon } from './DynamicIcon';
import { Compass, Footprints, DoorOpen, Laptop, Sparkles, Navigation } from 'lucide-react';

interface InteractiveMapSvgProps {
  locations: LocationItem[];
  selectedLocation: LocationItem | null;
  onSelectLocation: (location: LocationItem) => void;
  corridorNodes: CorridorNode[];
  currentFloor: number;
}

export const InteractiveMapSvg: React.FC<InteractiveMapSvgProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  corridorNodes,
  currentFloor,
}) => {
  // Calculate dynamic path points from Entrance (400, 440) -> Corridor Junction -> Room Door
  const getNavigationPathData = () => {
    if (!selectedLocation) return '';

    const startX = 400;
    const startY = 440;
    const targetDoorX = selectedLocation.mapCoordinates.doorX;
    const targetDoorY = selectedLocation.mapCoordinates.doorY;

    // Route points:
    // 1. Start from Main Entrance (400, 440)
    // 2. Go straight along central corridor to targetDoorY
    // 3. Turn into the door at (targetDoorX, targetDoorY)
    return `M ${startX} ${startY} L 400 ${targetDoorY} L ${targetDoorX} ${targetDoorY}`;
  };

  const navPathData = getNavigationPathData();

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800 text-white relative overflow-hidden">
      {/* Top Map Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>المخطط المعماري التفاعلي 2D</span>
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-full font-mono">
              {currentFloor === 0 ? 'الدور الأرضي' : 'الدور الأول'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            انقر على أي مكتب أو قاعة لتتبع مسار الحركة المضيء من المدخل الرئيسي
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-700/80 border border-emerald-400"></span>
            <span>مكاتب الخدمة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-600/80 border border-amber-400"></span>
            <span>كوفي وانتظار</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-800 border border-emerald-400 animate-pulse"></span>
            <span>المسار النشط</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 p-2 flex justify-center">
        <svg
          viewBox="0 0 800 490"
          className="w-full max-w-[800px] h-auto select-none"
          style={{ minWidth: '600px' }}
        >
          {/* Blueprint Grid Background Pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>

            {/* Glowing filter for navigation path */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect width="800" height="490" fill="#0f172a" />
          <rect width="800" height="490" fill="url(#grid)" />

          {/* Building Outer Outline */}
          <rect
            x="20"
            y="20"
            width="760"
            height="450"
            rx="16"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
            strokeDasharray="4 2"
          />

          {/* Central Corridor Pathway */}
          <rect
            x="320"
            y="40"
            width="160"
            height="410"
            rx="12"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="250"
            fill="#64748b"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="2"
          >
            الممر الأوسط الرئيسي
          </text>

          {/* Rooms on the floor */}
          {locations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const { x, y, width, height, doorX, doorY } = loc.mapCoordinates;

            return (
              <g
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className="cursor-pointer transition-all duration-300 group"
              >
                {/* Room Boundary Rect */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx="10"
                  fill={isSelected ? '#064e3b' : '#1e293b'}
                  stroke={isSelected ? '#10b981' : '#334155'}
                  strokeWidth={isSelected ? '3' : '1.5'}
                  className="group-hover:stroke-emerald-400 group-hover:fill-slate-800 transition-all"
                />

                {/* Door Opening Marker */}
                <circle
                  cx={doorX}
                  cy={doorY}
                  r={isSelected ? '6' : '4'}
                  fill={isSelected ? '#34d399' : '#94a3b8'}
                  stroke="#0f172a"
                  strokeWidth="2"
                />

                {/* Room Title text */}
                <text
                  x={x + width / 2}
                  y={y + 35}
                  fill={isSelected ? '#ffffff' : '#f8fafc'}
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {loc.name}
                </text>

                {/* Room Number & Details */}
                <text
                  x={x + width / 2}
                  y={y + 55}
                  fill={isSelected ? '#6ee7b7' : '#94a3b8'}
                  fontSize="10"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {loc.roomNumber || ''} • {loc.distanceMeters}م
                </text>

                {/* Devices Count Pill inside Room */}
                <g transform={`translate(${x + width / 2 - 40}, ${y + 68})`}>
                  <rect
                    width="80"
                    height="20"
                    rx="10"
                    fill={isSelected ? '#065f46' : '#0f172a'}
                    stroke={isSelected ? '#34d399' : '#475569'}
                    strokeWidth="1"
                  />
                  <text
                    x="40"
                    y="14"
                    fill={isSelected ? '#a7f3d0' : '#cbd5e1'}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    💻 {loc.devices.length} أجهزة
                  </text>
                </g>

                {/* Selected Pulse Ring */}
                {isSelected && (
                  <circle
                    cx={x + width / 2}
                    cy={y + height / 2}
                    r={Math.min(width, height) / 2 - 5}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-spin"
                    style={{ transformOrigin: `${x + width / 2}px ${y + height / 2}px`, animationDuration: '10s' }}
                  />
                )}
              </g>
            );
          })}

          {/* Central Corridor Landmarks */}
          {/* Elevators */}
          <rect x="335" y="110" width="60" height="70" rx="8" fill="#1e1e38" stroke="#6366f1" strokeWidth="1.5" />
          <text x="365" y="145" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
            🛗 المصاعد
          </text>
          <text x="365" y="162" fill="#818cf8" fontSize="9" textAnchor="middle">
            الدور 1
          </text>

          {/* Stairs */}
          <rect x="405" y="110" width="60" height="70" rx="8" fill="#1e1e38" stroke="#6366f1" strokeWidth="1.5" />
          <text x="435" y="145" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
            🪜 الدرج
          </text>
          <text x="435" y="162" fill="#818cf8" fontSize="9" textAnchor="middle">
            السلالم
          </text>

          {/* Main Entrance (المدخل الرئيسي) */}
          <rect
            x="340"
            y="410"
            width="120"
            height="55"
            rx="10"
            fill="#064e3b"
            stroke="#d4af37"
            strokeWidth="2"
          />
          <text x="400" y="435" fill="#fef08a" fontSize="12" fontWeight="black" textAnchor="middle">
            🚪 المدخل الرئيسي
          </text>
          <text x="400" y="452" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">
            نقطة انطلاق الزائر
          </text>

          {/* Dynamic Animated Glowing Navigation Path */}
          {selectedLocation && navPathData && (
            <g>
              {/* Outer Glow Path */}
              <path
                d={navPathData}
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                opacity="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              {/* Inner Animated Dashed Path */}
              <path
                d={navPathData}
                fill="none"
                stroke="#34d399"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-dash-flow"
              />

              {/* Start Point Marker (Entrance) */}
              <circle cx="400" cy="440" r="7" fill="#facc15" stroke="#ffffff" strokeWidth="2" />

              {/* Destination Point Marker */}
              <circle
                cx={selectedLocation.mapCoordinates.doorX}
                cy={selectedLocation.mapCoordinates.doorY}
                r="8"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="animate-ping"
              />
              <circle
                cx={selectedLocation.mapCoordinates.doorX}
                cy={selectedLocation.mapCoordinates.doorY}
                r="6"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Helper Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Footprints className="w-4 h-4 text-emerald-400" />
          <span>المسارات محسوبة بدقة من المدخل الرئيسي باتجاه الغرفة المستهدفة</span>
        </span>
        <span className="text-slate-500 font-mono">King Fahd Building • Floor Navigation System</span>
      </div>
    </div>
  );
};
