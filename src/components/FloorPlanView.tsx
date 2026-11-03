import React, { useState } from 'react';
import {
  LocationItem,
  CorridorNode,
  DeviceItem
} from '../types/navigation';
import { DynamicIcon } from './DynamicIcon';
import {
  Monitor,
  Laptop,
  Printer,
  Tv,
  Scan,
  Smartphone,
  Network,
  PlusCircle,
  Eye,
  CheckCircle2,
  AlertTriangle,
  DoorOpen,
  ArrowUpDown,
  Footprints,
  Box,
  Layers,
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FloorPlanViewProps {
  locations: LocationItem[];
  selectedLocation: LocationItem | null;
  onSelectLocation: (location: LocationItem) => void;
  corridorNodes: CorridorNode[];
  onOpenAddDevice: (location: LocationItem) => void;
  onViewLocationDetails: (location: LocationItem) => void;
}

export const FloorPlanView: React.FC<FloorPlanViewProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  corridorNodes,
  onOpenAddDevice,
  onViewLocationDetails,
}) => {
  // Store expanded devices list for each card ID
  const [expandedDevices, setExpandedDevices] = useState<Record<string, boolean>>({
    'loc-coffee': false,
    'loc-serv1': true,
    'loc-serv-main': true,
  });

  const toggleDevices = (e: React.MouseEvent, locationId: string) => {
    e.stopPropagation();
    setExpandedDevices((prev) => ({
      ...prev,
      [locationId]: !prev[locationId],
    }));
  };

  const leftLocations = locations.filter((loc) => loc.wing === 'left');
  const rightLocations = locations.filter((loc) => loc.wing === 'right');
  const centerLocations = locations.filter((loc) => loc.wing === 'center');

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'computer':
        return <Laptop className="w-3.5 h-3.5 text-blue-600" />;
      case 'printer':
        return <Printer className="w-3.5 h-3.5 text-emerald-600" />;
      case 'screen':
        return <Tv className="w-3.5 h-3.5 text-purple-600" />;
      case 'scanner':
        return <Scan className="w-3.5 h-3.5 text-amber-600" />;
      case 'kiosk':
        return <Smartphone className="w-3.5 h-3.5 text-rose-600" />;
      case 'network':
        return <Network className="w-3.5 h-3.5 text-indigo-600" />;
      default:
        return <DynamicIcon name="computer" className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  // Determine which corridor node is active based on selection
  const isCorridorNodeActive = (nodeId: string) => {
    if (!selectedLocation) return false;
    if (nodeId === 'nodeEntrance') return true;
    if (nodeId === 'nodeCorridor') return true;
    if (nodeId === 'nodeElevator' && (selectedLocation.direction === 'elevator' || selectedLocation.floor === 1)) return true;
    if (nodeId === 'nodeStairs' && (selectedLocation.direction === 'stairs' || selectedLocation.floor === 1)) return true;
    return false;
  };

  const renderLocationCard = (loc: LocationItem) => {
    const isSelected = selectedLocation?.id === loc.id;
    const isExpanded = !!expandedDevices[loc.id];

    return (
      <div
        key={loc.id}
        onClick={() => onSelectLocation(loc)}
        className={`location-card rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer relative bg-white shadow-sm hover:shadow-md ${
          isSelected
            ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400 ring-offset-2'
            : 'border-slate-200 hover:border-emerald-600/70 hover:-translate-y-0.5'
        }`}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold transition ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <DynamicIcon name={loc.iconName} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                {loc.name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <span>{loc.description}</span>
                {loc.roomNumber && (
                  <span className="font-mono font-bold text-slate-400 text-[10px]">
                    ({loc.roomNumber})
                  </span>
                )}
              </p>
            </div>
          </div>

          {isSelected && (
            <span className="flex-shrink-0 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>المسار محدد</span>
            </span>
          )}
        </div>

        {/* Devices Header & Toggle Button */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={(e) => toggleDevices(e, loc.id)}
            className="toggle-devices-btn inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95"
          >
            <Laptop className="w-3.5 h-3.5 text-emerald-700" />
            <span>بيانات الأجهزة والمعدات</span>
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
              {loc.devices.length}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAddDevice(loc);
            }}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md transition"
            title="إضافة عهدة أو جهاز جديد لهذا القسم"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>إضافة جهاز</span>
          </button>
        </div>

        {/* Devices Expanded Content */}
        {isExpanded && (
          <div className="devices-info mt-2.5 pt-2.5 border-t border-dashed border-slate-200 space-y-1.5 animate-fadeIn">
            {loc.devices.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-1 text-center">
                لا توجد أجهزة مسجلة حالياً في هذه القاعة
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {loc.devices.map((device) => (
                  <div
                    key={device.id}
                    className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200/80 hover:bg-sky-100 text-sky-950 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-2xs transition"
                  >
                    {getDeviceIcon(device.type)}
                    <span>{device.name}</span>
                    {device.brand && (
                      <span className="text-[10px] bg-sky-200/60 text-sky-900 px-1 rounded font-bold">
                        {device.brand}
                      </span>
                    )}
                    {device.status === 'working' ? (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        title="يعمل بحالة ممتازة"
                      />
                    ) : (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        title="قيد الفحص أو الصيانة"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-inner">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Wing (الجانب الأيسر - الكوفي والخدمات) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-gradient-to-l from-slate-200 to-slate-100 border border-slate-300/80 rounded-xl px-4 py-2 text-center shadow-xs">
            <span className="text-xs font-black text-slate-700 flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              الجانب الأيسر (الكوفي، خدمة المستفيدين، المكاتب)
            </span>
          </div>

          <div className="space-y-3">
            {leftLocations.length > 0 ? (
              leftLocations.map(renderLocationCard)
            ) : (
              <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-400">
                لا توجد مواقع مطابقة للبحث في الجناح الأيسر
              </div>
            )}
          </div>
        </div>

        {/* Central Corridor (الممر الرئيسي والأوسط والخدمات المركزية) */}
        <div className="lg:col-span-2 flex flex-col items-center justify-between gap-3 bg-slate-200/70 border-2 border-dashed border-slate-300 rounded-2xl p-3 min-h-[460px]">
          <span className="text-[11px] font-black text-slate-500 tracking-wider">
            الممر الأوسط
          </span>

          {/* Node 1: الدرج */}
          <div
            onClick={() => {
              const stairs = centerLocations.find((l) => l.id === 'loc-stairs');
              if (stairs) onSelectLocation(stairs);
            }}
            className={`w-full py-2.5 px-2 rounded-xl text-center cursor-pointer transition flex flex-col items-center gap-1 font-bold text-xs ${
              isCorridorNodeActive('nodeStairs')
                ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-emerald-300 scale-102 font-extrabold'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span>الدرج الرئيسي</span>
            <span className="text-[9px] opacity-75">للدور الأول</span>
          </div>

          {/* Node 2: المصاعد */}
          <div
            onClick={() => {
              const elev = centerLocations.find((l) => l.id === 'loc-elevator');
              if (elev) onSelectLocation(elev);
            }}
            className={`w-full py-2.5 px-2 rounded-xl text-center cursor-pointer transition flex flex-col items-center gap-1 font-bold text-xs ${
              isCorridorNodeActive('nodeElevator')
                ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-emerald-300 scale-102 font-extrabold'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>المصاعد المركزية</span>
            <span className="text-[9px] opacity-75">كافة الأدوار</span>
          </div>

          {/* Animated Connecting Corridor Line */}
          <div className="flex-1 w-1.5 bg-gradient-to-b from-slate-300 via-emerald-400 to-slate-300 rounded-full relative my-1">
            {selectedLocation && (
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse"></div>
            )}
          </div>

          {/* Node 3: الممر الأوسط */}
          <div
            onClick={() => {
              const corr = centerLocations.find((l) => l.id === 'loc-corridor');
              if (corr) onSelectLocation(corr);
            }}
            className={`w-full py-2.5 px-2 rounded-xl text-center cursor-pointer transition flex flex-col items-center gap-1 font-bold text-xs ${
              isCorridorNodeActive('nodeCorridor')
                ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-300 font-extrabold'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
            }`}
          >
            <ArrowUpDown className="w-4 h-4 text-emerald-600" />
            <span>الممر الأوسط</span>
            <span className="text-[9px] opacity-75">محور الحركة</span>
          </div>

          {/* Node 4: المدخل الرئيسي */}
          <div
            onClick={() => {
              const ent = centerLocations.find((l) => l.id === 'loc-entrance');
              if (ent) onSelectLocation(ent);
            }}
            className={`w-full py-3 px-2 rounded-xl text-center cursor-pointer transition flex flex-col items-center gap-1 font-extrabold text-xs ${
              isCorridorNodeActive('nodeEntrance')
                ? 'bg-emerald-800 text-amber-300 shadow-xl ring-2 ring-amber-400 font-black'
                : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-900'
            }`}
          >
            <DoorOpen className="w-5 h-5 text-amber-400" />
            <span>المدخل الرئيسي</span>
            <span className="text-[10px] text-slate-300">نقطة الانطلاق (البوابة)</span>
          </div>
        </div>

        {/* Right Wing (الجانب الأيمن - خدمة المستفيدين والنشاط) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-gradient-to-l from-slate-200 to-slate-100 border border-slate-300/80 rounded-xl px-4 py-2 text-center shadow-xs">
            <span className="text-xs font-black text-slate-700 flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              الجانب الأيمن (كاونتر الاستقبال الرئيسي، النشاط، الانتظار)
            </span>
          </div>

          <div className="space-y-3">
            {rightLocations.length > 0 ? (
              rightLocations.map(renderLocationCard)
            ) : (
              <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-400">
                لا توجد مواقع مطابقة للبحث في الجناح الأيمن
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
