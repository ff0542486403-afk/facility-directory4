import React, { useState } from 'react';
import { X, Plus, Laptop, Tag, ShieldCheck } from 'lucide-react';
import { LocationItem, DeviceItem, DeviceType, DeviceStatus } from '../types/navigation';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  locations: LocationItem[];
  preselectedLocationId?: string;
  onAddDevice: (locationId: string, newDevice: DeviceItem) => void;
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  isOpen,
  onClose,
  locations,
  preselectedLocationId,
  onAddDevice,
}) => {
  const [targetLocationId, setTargetLocationId] = useState<string>(
    preselectedLocationId || (locations[0]?.id || '')
  );
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('HP');
  const [model, setModel] = useState('');
  const [type, setType] = useState<DeviceType>('computer');
  const [serialNumber, setSerialNumber] = useState('');
  const [assetTag, setAssetTag] = useState(`MOE-MED-${Math.floor(100 + Math.random() * 900)}`);
  const [status, setStatus] = useState<DeviceStatus>('working');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newDevice: DeviceItem = {
      id: `dev-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      model: model.trim() || 'Standard Model',
      type,
      serialNumber: serialNumber.trim() || undefined,
      assetTag: assetTag.trim() || undefined,
      status,
      notes: notes.trim() || undefined,
    };

    onAddDevice(targetLocationId, newDevice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-l from-emerald-900 to-emerald-800 text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl text-amber-300">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">إضافة جهاز أو عهدة جديدة</h3>
              <p className="text-xs text-emerald-200">تسجيل بيانات المعدة وربطها بالمكتب المعني</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-medium text-slate-700">
          {/* Room Selector */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">المكتب / القاعة التابعة:</label>
            <select
              value={targetLocationId}
              onChange={(e) => setTargetLocationId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.floor === 0 ? 'الأرضي' : 'الأول'}) {loc.roomNumber ? `- [${loc.roomNumber}]` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">اسم الجهاز أو العهدة *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: كمبيوتر HP ProDesk"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">نوع الجهاز</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DeviceType)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600"
              >
                <option value="computer">كمبيوتر مكتبي / لابتوب</option>
                <option value="printer">طابعة ليزرية / حرارية</option>
                <option value="scanner">ماسح ضوئي Scanner</option>
                <option value="screen">شاشة عرض ذكية</option>
                <option value="kiosk">جهاز كشك / تقييم</option>
                <option value="network">تليفون شبكي / راوتر</option>
                <option value="other">تجهيزات أخرى</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">الشركة المصنعة</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="مثلاً: HP, Epson, Cisco"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">الموديل / المواصفة</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="مثلاً: LaserJet Pro M428"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">رقم بطاقة الأصل (Asset Tag)</label>
              <input
                type="text"
                value={assetTag}
                onChange={(e) => setAssetTag(e.target.value)}
                placeholder="MOE-MED-..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">الحالة التشغيلية</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DeviceStatus)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600"
              >
                <option value="working">يعمل بكفاءة تامة</option>
                <option value="maintenance">يحتاج صيانة / قطع غيار</option>
                <option value="idle">خامل / في المستودع</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">الرقم التسلسلي (Serial Number)</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="S/N (اختياري)"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">ملاحظات إضافية</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي تفاصيل خاصة بتوزيع الجهاز أو الموظف المسؤول..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>حفظ في الجرد</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
