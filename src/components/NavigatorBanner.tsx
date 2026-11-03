import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Volume2,
  VolumeX,
  Footprints,
  Clock,
  MapPin,
  X,
  ListOrdered,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles
} from 'lucide-react';
import { LocationItem } from '../types/navigation';

interface NavigatorBannerProps {
  selectedLocation: LocationItem | null;
  onClearSelection: () => void;
  onOpenLocationDevices: (location: LocationItem) => void;
}

export const NavigatorBanner: React.FC<NavigatorBannerProps> = ({
  selectedLocation,
  onClearSelection,
  onOpenLocationDevices,
}) => {
  const [showDetailedSteps, setShowDetailedSteps] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeakGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('ميزة التوجيه الصوتي غير مدعومة في متصفحك الحالي');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!selectedLocation) return;

    window.speechSynthesis.cancel();
    const textToSpeak = `${selectedLocation.name}. ${selectedLocation.directionText}. المسافة حوالي ${selectedLocation.distanceMeters} متراً.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;

    // Pick Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const renderArrowIcon = () => {
    if (!selectedLocation) return null;
    switch (selectedLocation.direction) {
      case 'right':
        return <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse-arrow" />;
      case 'left':
        return <ArrowLeft className="w-6 h-6 text-emerald-400 animate-pulse-arrow" />;
      case 'straight':
        return <ArrowUp className="w-6 h-6 text-emerald-400 animate-bounce" />;
      case 'stairs':
      case 'elevator':
        return <Footprints className="w-6 h-6 text-amber-300 animate-pulse" />;
      default:
        return <ArrowRight className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-xl border-b-4 border-amber-400 transition-all overflow-hidden">
      <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Destination Information */}
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-amber-400 shadow-inner">
            <Compass className={`w-7 h-7 ${selectedLocation ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white">
                {selectedLocation ? selectedLocation.name : 'اختر جهة من الخريطة أدناه'}
              </h3>
              {selectedLocation?.roomNumber && (
                <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  {selectedLocation.roomNumber}
                </span>
              )}
              {selectedLocation && (
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                  {selectedLocation.floor === 0 ? 'الدور الأرضي' : 'الدور الأول'}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {selectedLocation
                ? selectedLocation.description
                : 'انقر على أي مكتب أو قاعة ليظهر لك سهم التوجيه والمسار التفصيلي، ويمكنك فحص جرد الأجهزة'}
            </p>
          </div>
        </div>

        {/* Direction Indicator or Quick Help */}
        {selectedLocation ? (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center sm:justify-end w-full md:w-auto">
            {/* The Animated Direction Badge */}
            <div className="flex items-center gap-2.5 bg-slate-800/90 hover:bg-slate-800 border border-emerald-500/30 px-3 sm:px-4 py-2 rounded-xl shadow-lg">
              {renderArrowIcon()}
              <div className="text-right">
                <span className="text-xs sm:text-sm font-bold text-emerald-300 block leading-tight">
                  {selectedLocation.directionText}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {selectedLocation.distanceMeters} م
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {selectedLocation.walkTimeSeconds} ثانية
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Voice Guide */}
            <button
              onClick={handleSpeakGuidance}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition border ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="نطق التوجيه صوتياً"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              <span className="hidden sm:inline">{isSpeaking ? 'إيقاف الصوت' : 'توجيه صوتي'}</span>
            </button>

            {/* Toggle Detailed Steps */}
            <button
              onClick={() => setShowDetailedSteps(!showDetailedSteps)}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="عرض خطوات السير"
            >
              <ListOrdered className="w-4 h-4 text-slate-400" />
              <span>الخطوات</span>
              {showDetailedSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Clear Selection */}
            <button
              onClick={onClearSelection}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 border border-slate-700 transition"
              title="إلغاء التحديد والعودة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-400/90 bg-amber-400/10 border border-amber-400/20 px-3.5 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>نظام الإرشاد الذاتي لمبنى الإدارة العامة للتعليم</span>
          </div>
        )}
      </div>

      {/* Accordion: Step by Step Navigation Path */}
      {selectedLocation && showDetailedSteps && (
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 px-5 text-sm transition-all animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4" /> مسار الوصول خطوة بخطوة من البوابة:
            </span>
            {selectedLocation.devices.length > 0 && (
              <button
                onClick={() => onOpenLocationDevices(selectedLocation)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline"
              >
                عرض أجهزة ومعدات هذا القسم ({selectedLocation.devices.length})
              </button>
            )}
          </div>
          <ol className="grid sm:grid-cols-3 gap-2.5 mt-2">
            {selectedLocation.detailedPath.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
