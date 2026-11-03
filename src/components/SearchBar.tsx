import React from 'react';
import { Search, X, Filter, Laptop, Printer, Monitor, Headphones, Sparkles } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  resultsCount: number;
  totalLocations: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onSelectFilter,
  resultsCount,
  totalLocations,
}) => {
  const quickFilters = [
    { id: 'all', label: 'كافة الأقسام والمكاتب', icon: Filter },
    { id: 'hp', label: 'أجهزة HP ومعداتها', icon: Laptop },
    { id: 'printers', label: 'الطابعات والماسحات', icon: Printer },
    { id: 'screens', label: 'شاشات العرض الذكية', icon: Monitor },
    { id: 'beneficiary', label: 'خدمات المستفيدين', icon: Headphones },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 transition-all">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن اسم القسم، الموظف، أو الأجهزة الملحقة (مثل HP، طابعة ليزر، ماسح، كود الغرفة)..."
            className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Counter Tag */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-semibold text-slate-500">
          <span className="bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>النتائج:</span>
            <strong className="text-emerald-700 font-black">{resultsCount}</strong>
            <span>من {totalLocations}</span>
          </span>
        </div>
      </div>

      {/* Quick Filter Badges */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Filter className="w-3 h-3 text-emerald-600" /> تصنيف سريع:
        </span>
        {quickFilters.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectFilter(tab.id)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition active:scale-95 ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
