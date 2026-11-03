import React, { useState, useMemo } from 'react';
import {
  X,
  Printer,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Laptop,
  Tv,
  Scan,
  Smartphone,
  Network,
  Trash2,
  Plus
} from 'lucide-react';
import { LocationItem, DeviceItem } from '../types/navigation';

interface InventoryTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  locations: LocationItem[];
  onDeleteDevice: (locationId: string, deviceId: string) => void;
  onOpenAddDeviceForAny: () => void;
}

export const InventoryTableModal: React.FC<InventoryTableModalProps> = ({
  isOpen,
  onClose,
  locations,
  onDeleteDevice,
  onOpenAddDeviceForAny,
}) => {
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Flatten all devices with their room info
  const allDevices = useMemo(() => {
    const list: (DeviceItem & { locationId: string; locationName: string; roomNumber?: string; floor: number })[] = [];
    locations.forEach((loc) => {
      loc.devices.forEach((dev) => {
        list.push({
          ...dev,
          locationId: loc.id,
          locationName: loc.name,
          roomNumber: loc.roomNumber,
          floor: loc.floor,
        });
      });
    });
    return list;
  }, [locations]);

  // Unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    allDevices.forEach((d) => {
      if (d.brand) set.add(d.brand.split(' ')[0]);
    });
    return Array.from(set);
  }, [allDevices]);

  // Filtered devices
  const filteredDevices = useMemo(() => {
    return allDevices.filter((item) => {
      if (filterBrand !== 'all' && !item.brand.toLowerCase().includes(filterBrand.toLowerCase())) {
        return false;
      }
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }
      if (filterStatus !== 'all' && item.status !== filterStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesModel = item.model.toLowerCase().includes(q);
        const matchesRoom = item.locationName.toLowerCase().includes(q);
        const matchesTag = (item.assetTag || '').toLowerCase().includes(q);
        const matchesSerial = (item.serialNumber || '').toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesRoom && !matchesTag && !matchesSerial) {
          return false;
        }
      }
      return true;
    });
  }, [allDevices, filterBrand, filterType, filterStatus, searchQuery]);

  if (!isOpen) return null;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['رقم الأصل', 'اسم الجهاز', 'النوع', 'الشركة', 'الموديل', 'الرقم التسلسلي', 'الموقع/المكتب', 'الدور', 'الحالة', 'ملاحظات'];
    const rows = filteredDevices.map((d) => [
      d.assetTag || '',
      `"${d.name}"`,
      d.type,
      `"${d.brand}"`,
      `"${d.model}"`,
      d.serialNumber || '',
      `"${d.locationName}"`,
      d.floor === 0 ? 'الأرضي' : 'الأول',
      d.status === 'working' ? 'يعمل' : 'صيانة',
      `"${d.notes || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `جرد_أجهزة_مبنى_الملك_فهد_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'computer': return 'حاسب آلي';
      case 'printer': return 'طابعة';
      case 'screen': return 'شاشة عرض';
      case 'scanner': return 'ماسح ضوئي';
      case 'kiosk': return 'جهاز خدمة';
      case 'network': return 'شبكات وهواتف';
      default: return 'تجهيزات أخرى';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-l from-emerald-900 to-emerald-800 text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded">
                إدارة التعليم بالمدينة المنورة
              </span>
              <span className="text-xs text-emerald-200">• مبنى الملك فهد</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              سجل جرد أجهزة ومعدات المكاتب والقاعات
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
              title="تصدير ملف Excel / CSV"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">تصدير CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
              title="طباعة التقرير"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">طباعة</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-xl transition"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="بحث في الأجهزة أو الأصول أو الغرف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {/* Filter by Brand */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">كافة الشركات</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Filter by Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">كافة الأنواع</option>
              <option value="computer">أجهزة كمبيوتر</option>
              <option value="printer">طابعات</option>
              <option value="scanner">ماسحات ضوئية</option>
              <option value="screen">شاشات عرض</option>
              <option value="kiosk">أجهزة تقييم وخدمة</option>
              <option value="network">شبكات وتليفونات</option>
            </select>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">كافة الحالات</option>
              <option value="working">يعمل بكفاءة</option>
              <option value="maintenance">يحتاج صيانة</option>
            </select>

            <button
              onClick={onOpenAddDeviceForAny}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة جهاز</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-4">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-extrabold border-b border-slate-200">
                <th className="p-3">#</th>
                <th className="p-3">رقم الأصل Tag</th>
                <th className="p-3">اسم الجهاز</th>
                <th className="p-3">النوع والموديل</th>
                <th className="p-3">الشركة</th>
                <th className="p-3">الموقع / الغرفة</th>
                <th className="p-3">الطابق</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    لا توجد أجهزة مطابقة لشروط التصفية والبحث
                  </td>
                </tr>
              ) : (
                filteredDevices.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono text-slate-400">{index + 1}</td>
                    <td className="p-3 font-mono font-bold text-emerald-800">
                      {item.assetTag || '---'}
                    </td>
                    <td className="p-3 font-bold text-slate-900">{item.name}</td>
                    <td className="p-3">
                      <div>
                        <span className="font-semibold block">{item.model}</span>
                        <span className="text-[10px] text-slate-400">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-slate-800">{item.brand}</td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                        {item.locationName}
                      </span>
                    </td>
                    <td className="p-3">
                      {item.floor === 0 ? 'الأرضي' : 'الأول'}
                    </td>
                    <td className="p-3">
                      {item.status === 'working' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          يعمل بكفاءة
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold text-[11px]">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          يحتاج صيانة
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => onDeleteDevice(item.locationId, item.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                        title="حذف الجهاز من الجرد"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            إجمالي الأجهزة المعروضة: <strong className="text-slate-800 font-bold">{filteredDevices.length}</strong> من أصل {allDevices.length}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 rounded-xl transition"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
