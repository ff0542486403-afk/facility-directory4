import React from 'react';
import {
  Building2,
  Layers,
  MapPin,
  ClipboardList,
  QrCode,
  Printer,
  Sparkles,
  Map,
  LayoutGrid
} from 'lucide-react';

interface HeaderProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
  viewMode: 'cards' | 'map';
  onToggleViewMode: (mode: 'cards' | 'map') => void;
  onOpenInventory: () => void;
  onOpenQr: () => void;
  totalDevicesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentFloor,
  onFloorChange,
  viewMode,
  onToggleViewMode,
  onOpenInventory,
  onOpenQr,
  totalDevicesCount,
}) => {
  return (
    <header className="relative bg-gradient-to-l from-emerald-950 via-emerald-800 to-emerald-900 text-white shadow-xl overflow-hidden border-b-4 border-amber-400">
      {/* Decorative Islamic geometric subtle background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Top bar with official branding and stats */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-emerald-700/60 pb-4">
          <div className="flex items-center gap-4 text-center md:text-right">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center text-amber-300">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  المملكة العربية السعودية • وزارة التعليم
                </span>
                <span className="text-xs text-emerald-200 hidden sm:inline">|</span>
                <span className="text-xs text-emerald-200 font-medium hidden sm:inline">
                  الإدارة العامة للتعليم بمنطقة المدينة المنورة
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2 justify-center md:justify-start">
                دليل التوجيه المكاني وجرد الأجهزة
                <span className="text-amber-400 text-sm font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  مبنى الملك فهد
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5">
                نظام إرشادي تفاعلي للمستفيدين والزوار مع حصر وتقييم أجهزة ومعدات المكاتب وقاعات الخدمة
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <button
              onClick={onOpenInventory}
              className="flex items-center gap-2 bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/40 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition shadow-sm hover:shadow active:scale-95"
              title="عرض جدول جرد الأجهزة الشامل"
            >
              <ClipboardList className="w-4 h-4 text-amber-300" />
              <span>جرد الأجهزة</span>
              <span className="bg-amber-400 text-emerald-950 text-xs font-black px-1.5 py-0.2 rounded-full">
                {totalDevicesCount}
              </span>
            </button>

            <button
              onClick={onOpenQr}
              className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/40 text-emerald-100 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition active:scale-95"
              title="مشاركة الدليل عبر باركود الجوال"
            >
              <QrCode className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">باركود الجوال</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/40 text-emerald-100 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition active:scale-95 no-print"
              title="طباعة الدليل أو المخطط"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">طباعة</span>
            </button>
          </div>
        </div>

        {/* Bottom bar: Floor Selector and View mode switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
          {/* Floor selection tabs */}
          <div className="flex items-center gap-1.5 bg-emerald-950/70 p-1 rounded-xl border border-emerald-700/50">
            <span className="text-xs font-bold text-emerald-300 px-2.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" /> الطابق:
            </span>
            <button
              onClick={() => onFloorChange(0)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                currentFloor === 0
                  ? 'bg-amber-400 text-emerald-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
              }`}
            >
              الدور الأرضي (خدمة المستفيدين والأنشطة)
            </button>
            <button
              onClick={() => onFloorChange(1)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                currentFloor === 1
                  ? 'bg-amber-400 text-emerald-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
              }`}
            >
              الدور الأول (مكتب المدير العام والأقسام)
            </button>
          </div>

          {/* View switcher: Cards Blueprint vs 2D Architectural Map */}
          <div className="flex items-center gap-1 bg-emerald-950/70 p-1 rounded-xl border border-emerald-700/50">
            <button
              onClick={() => onToggleViewMode('cards')}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                viewMode === 'cards'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>مخطط الأجنحة (أعمدة)</span>
            </button>
            <button
              onClick={() => onToggleViewMode('map')}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                viewMode === 'map'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <Map className="w-3.5 h-3.5 text-amber-300" />
              <span>المخطط المعماري 2D</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
