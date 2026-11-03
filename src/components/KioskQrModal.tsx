import React from 'react';
import { X, QrCode, Smartphone, Sparkles, Copy, Check } from 'lucide-react';

interface KioskQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KioskQrModal: React.FC<KioskQrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-center">
        {/* Header */}
        <div className="bg-gradient-to-l from-emerald-900 to-emerald-800 text-white p-5 relative border-b-2 border-amber-400">
          <button
            onClick={onClose}
            className="absolute left-3 top-3 p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-md mb-2">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black">الدليل الإرشادي على هاتفك</h3>
          <p className="text-xs text-emerald-200 mt-0.5">امسح الباركود للتنقل الذكي أثناء المشي</p>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-emerald-500 shadow-inner flex items-center justify-center">
            {/* High visual fidelity QR representation */}
            <div className="relative w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-white">
              <QrCode className="w-36 h-36 text-amber-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-amber-400 flex items-center justify-center text-[10px] font-black text-amber-300 shadow-md">
                  تعليم
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4 leading-relaxed font-medium">
            وجه كاميرا جوالك نحو الرمز أعلاه لفتح الدليل المكاني لمبنى الملك فهد مباشرة بدون الحاجة لتحميل أي تطبيق.
          </p>

          <button
            onClick={handleCopy}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition border border-slate-300"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'تم نسخ الرابط بنجاح!' : 'نسخ رابط الدليل'}</span>
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 text-xs rounded-xl transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
