import React from 'react';
import { X, Download, Smartphone, Apple, Laptop, CheckCircle2 } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNativeInstall?: () => void;
  hasNativePrompt: boolean;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  onNativeInstall,
  hasNativePrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pearl-card max-w-md w-full bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Download size={16} />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                Install Ceron Academic App
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Download to your phone or PC for full-screen offline learning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* 1-Click Install Button if supported */}
        {hasNativePrompt && onNativeInstall && (
          <button
            onClick={() => {
              onNativeInstall();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Download size={16} />
            <span>Install Now (1-Tap Install)</span>
          </button>
        )}

        {/* Step-by-Step Device Instructions */}
        <div className="space-y-3 text-xs">
          {/* Android / Chrome */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <Smartphone size={15} className="text-emerald-600" />
              <span>Android (Google Chrome / Brave / Edge)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Tap the <strong>three dots menu (⋮)</strong> in the top-right corner.</li>
              <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
              <li>The app icon will appear on your phone home screen!</li>
            </ol>
          </div>

          {/* iPhone / iPad */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <Apple size={15} className="text-slate-800" />
              <span>iPhone & iPad (Safari)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Tap the <strong>Share button</strong> (square with arrow pointing up).</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>Add</strong> in the top-right corner.</li>
            </ol>
          </div>

          {/* Laptop / PC */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <Laptop size={15} className="text-blue-600" />
              <span>Laptop / Computer (Chrome / Edge)</span>
            </div>
            <p className="text-slate-600 pl-1">
              Click the <strong>Install icon (🖥️)</strong> located in the right side of the browser address bar to install as a desktop window app.
            </p>
          </div>
        </div>

        {/* Benefits Pill */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>Runs full-screen with zero browser address bars and fast offline loading!</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
