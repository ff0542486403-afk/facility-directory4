/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_LOCATIONS, CORRIDOR_NODES } from './data/initialData';
import { LocationItem, DeviceItem } from './types/navigation';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { NavigatorBanner } from './components/NavigatorBanner';
import { FloorPlanView } from './components/FloorPlanView';
import { InteractiveMapSvg } from './components/InteractiveMapSvg';
import { InventoryTableModal } from './components/InventoryTableModal';
import { AddDeviceModal } from './components/AddDeviceModal';
import { KioskQrModal } from './components/KioskQrModal';
import {
  RotateCcw,
  Sparkles,
  Info,
  ShieldAlert,
  Building,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

const STORAGE_KEY = 'king_fahd_building_locations_v1';

export default function App() {
  // Load saved state or default data
  const [locations, setLocations] = useState<LocationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load local storage', e);
    }
    return INITIAL_LOCATIONS;
  });

  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');

  // Modals state
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [preselectedLocationId, setPreselectedLocationId] = useState<string | undefined>(undefined);
  const [isQrOpen, setIsQrOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [locations]);

  // Total devices calculation
  const totalDevicesCount = useMemo(() => {
    return locations.reduce((sum, loc) => sum + loc.devices.length, 0);
  }, [locations]);

  // Selected Location object
  const selectedLocation = useMemo(() => {
    if (!selectedLocationId) return null;
    return locations.find((l) => l.id === selectedLocationId) || null;
  }, [locations, selectedLocationId]);

  // When floor changes, if selected location is on another floor, reset or keep accordingly
  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
    if (selectedLocation && selectedLocation.floor !== floor) {
      // Find a matching one or clear
      setSelectedLocationId(null);
    }
  };

  // Filter locations by current floor AND search AND active quick filter
  const currentFloorLocations = useMemo(() => {
    return locations.filter((loc) => {
      // Match Floor
      if (loc.floor !== currentFloor && loc.wing !== 'center') {
        return false;
      }

      // Quick filter
      if (activeFilter === 'hp') {
        const hasHp = loc.devices.some(
          (d) =>
            d.brand.toLowerCase().includes('hp') ||
            d.name.toLowerCase().includes('hp') ||
            d.model.toLowerCase().includes('hp')
        );
        if (!hasHp) return false;
      } else if (activeFilter === 'printers') {
        const hasPrinter = loc.devices.some(
          (d) => d.type === 'printer' || d.type === 'scanner'
        );
        if (!hasPrinter) return false;
      } else if (activeFilter === 'screens') {
        const hasScreen = loc.devices.some((d) => d.type === 'screen');
        if (!hasScreen) return false;
      } else if (activeFilter === 'beneficiary') {
        if (!loc.name.includes('خدمة') && !loc.name.includes('كاونتر') && !loc.name.includes('انتظار')) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = loc.name.toLowerCase().includes(q);
        const matchesDesc = loc.description.toLowerCase().includes(q);
        const matchesRoom = (loc.roomNumber || '').toLowerCase().includes(q);
        const matchesDevices = loc.devices.some(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.brand.toLowerCase().includes(q) ||
            d.model.toLowerCase().includes(q) ||
            (d.assetTag || '').toLowerCase().includes(q)
        );
        if (!matchesName && !matchesDesc && !matchesRoom && !matchesDevices) {
          return false;
        }
      }

      return true;
    });
  }, [locations, currentFloor, searchQuery, activeFilter]);

  // Handle selection
  const handleSelectLocation = (loc: LocationItem) => {
    if (loc.floor !== currentFloor) {
      setCurrentFloor(loc.floor);
    }
    setSelectedLocationId(loc.id);
  };

  // Device management handlers
  const handleAddDevice = (locationId: string, newDevice: DeviceItem) => {
    setLocations((prev) =>
      prev.map((loc) => {
        if (loc.id === locationId) {
          return {
            ...loc,
            devices: [...loc.devices, newDevice],
          };
        }
        return loc;
      })
    );
  };

  const handleDeleteDevice = (locationId: string, deviceId: string) => {
    setLocations((prev) =>
      prev.map((loc) => {
        if (loc.id === locationId) {
          return {
            ...loc,
            devices: loc.devices.filter((d) => d.id !== deviceId),
          };
        }
        return loc;
      })
    );
  };

  const handleOpenAddDeviceForRoom = (loc: LocationItem) => {
    setPreselectedLocationId(loc.id);
    setIsAddDeviceOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('هل تود استعادة البيانات الأصلية لدليل وتوجيه مبنى الملك فهد؟')) {
      setLocations(INITIAL_LOCATIONS);
      localStorage.removeItem(STORAGE_KEY);
      setSelectedLocationId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Tajawal',sans-serif]">
      {/* Official Header */}
      <Header
        currentFloor={currentFloor}
        onFloorChange={handleFloorChange}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
        totalDevicesCount={totalDevicesCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 space-y-4">
        {/* Search & Filter Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          resultsCount={currentFloorLocations.length}
          totalLocations={locations.filter((l) => l.floor === currentFloor).length}
        />

        {/* Dynamic Navigator Banner with Directional Indicator */}
        <NavigatorBanner
          selectedLocation={selectedLocation}
          onClearSelection={() => setSelectedLocationId(null)}
          onOpenLocationDevices={(loc) => {
            setPreselectedLocationId(loc.id);
            setIsInventoryOpen(true);
          }}
        />

        {/* Floor Plan Display (Toggle between 3-Column Cards and 2D Interactive Blueprint) */}
        {viewMode === 'cards' ? (
          <FloorPlanView
            locations={currentFloorLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            corridorNodes={CORRIDOR_NODES}
            onOpenAddDevice={handleOpenAddDeviceForRoom}
            onViewLocationDetails={handleSelectLocation}
          />
        ) : (
          <InteractiveMapSvg
            locations={currentFloorLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            corridorNodes={CORRIDOR_NODES}
            currentFloor={currentFloor}
          />
        )}

        {/* Statistics & Quick Office Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 no-print">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">جاهزية الخدمات والأجهزة</span>
              <span className="text-sm font-black text-slate-900">
                100% متاحة ومفعلة للزوار
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">المبنى والقاعات المغطاة</span>
              <span className="text-sm font-black text-slate-900">
                مبنى الملك فهد (طابقان رئيسيان)
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-semibold">الأجهزة المسجلة بالجرد</span>
                <span className="text-sm font-black text-slate-900">
                  {totalDevicesCount} جهاز ومعدة مكتبية
                </span>
              </div>
            </div>

            <button
              onClick={handleResetData}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition flex items-center gap-1"
              title="استعادة البيانات الافتراضية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">استعادة</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-4 border-t border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>الإدارة العامة للتعليم بمنطقة المدينة المنورة • دليل التوجيه المكاني وجرد أجهزة مبنى الملك فهد</span>
          </div>
          <p className="text-[11px] text-slate-500">
            تم التطوير لتسهيل خدمة المستفيدين وسرعة الاستدلال على المكاتب ومعدات العمل
          </p>
        </div>
      </footer>

      {/* Modals */}
      <InventoryTableModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        locations={locations}
        onDeleteDevice={handleDeleteDevice}
        onOpenAddDeviceForAny={() => {
          setIsInventoryOpen(false);
          setIsAddDeviceOpen(true);
        }}
      />

      <AddDeviceModal
        isOpen={isAddDeviceOpen}
        onClose={() => setIsAddDeviceOpen(false)}
        locations={locations}
        preselectedLocationId={preselectedLocationId}
        onAddDevice={handleAddDevice}
      />

      <KioskQrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </div>
  );
}
