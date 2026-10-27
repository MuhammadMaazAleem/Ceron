import React from 'react';
import { LearnerProfile } from '../../types';
import { Moon, Sun, Heart, Download, GraduationCap } from 'lucide-react';
import { InstallAppModal } from '../common/InstallAppModal';
import { CeronLogo } from '../common/CeronLogo';

interface HeaderProps {
  activeProfile: LearnerProfile;
  languagePref: 'en' | 'ur';
  isDarkMode: boolean;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onOpenDedication?: () => void;
  onOpenClassPicker?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProfile,
  languagePref,
  isDarkMode,
  onToggleLanguage,
  onToggleTheme,
  onOpenDedication,
  onOpenClassPicker,
}) => {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice: any) => {
        if (choice.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      });
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const simpleClassName =
    activeProfile.className?.replace(/\([^)]*\)/g, '').replace(/[()]/g, '').trim() || 'Class 10';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col gap-2">
        {/* Main Bar: Brand Logo & Quick Action Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Brand Identity with Custom Logo */}
          <CeronLogo size={34} />

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Install App Button */}
            <button
              onClick={handleInstallClick}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/70 transition cursor-pointer flex items-center gap-1"
              title="Install Ceron App on mobile or desktop"
            >
              <Download size={12} className="text-indigo-600" />
              <span className="text-[11px] font-bold">App</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 cursor-pointer transition"
              title="Toggle Urdu / English script"
            >
              {languagePref === 'en' ? 'اردو' : 'EN'}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 items-center justify-center text-slate-600 cursor-pointer transition hidden sm:flex"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={13} className="text-amber-500" /> : <Moon size={13} className="text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Sub Bar: Simple Class Indicator & Dedication Ribbon */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 overflow-hidden">
          {/* Unified Accessible Class Badge with Clear Affordance */}
          <button
            onClick={onOpenClassPicker}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50/80 hover:bg-indigo-100/90 text-indigo-950 border border-indigo-200/80 text-xs font-semibold cursor-pointer transition shadow-2xs hover:shadow-xs group shrink-0"
            title="Switch your class or board"
            aria-label={`Current class: ${simpleClassName}. Click to switch class.`}
          >
            <GraduationCap size={14} className="text-indigo-600 shrink-0" />
            <span className="font-bold text-slate-900">{simpleClassName}</span>
            <span className="text-slate-400 font-normal hidden sm:inline">&bull; BISE Swat</span>
            <span className="text-[11px] font-bold text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-indigo-200 group-hover:border-indigo-300 ml-1">
              Switch
            </span>
          </button>

          {/* Dedication Button (Subtle, Non-competing Styling) */}
          {onOpenDedication && (
            <button
              id="dedication-nav-btn"
              onClick={onOpenDedication}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-amber-800 bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200/70 flex items-center gap-1.5 transition cursor-pointer shrink-0 min-w-0"
              title="Dedicated to Baba Jan & Mor Jan"
              aria-label="View dedication to Baba Jan and Mor Jan"
            >
              <Heart size={12} className="fill-amber-400 text-amber-500 shrink-0" />
              <span className="text-[11px] font-serif text-amber-900 truncate">
                <span className="hidden sm:inline">Dedicated to Baba Jan &amp; Mor Jan</span>
                <span className="sm:hidden">Baba Jan &amp; Mor Jan</span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* PWA App Installation Guide & Trigger Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        hasNativePrompt={!!deferredPrompt}
        onNativeInstall={() => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
          }
        }}
      />
    </header>
  );
};
export default Header;
