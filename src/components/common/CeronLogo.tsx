import React from 'react';

interface CeronLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const CeronLogo: React.FC<CeronLogoProps> = ({
  size = 32,
  className = '',
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Modern Academic Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
      >
        <defs>
          <linearGradient id="ceronGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1B4B" />
            <stop offset="0.5" stopColor="#312E81" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Squircle Background */}
        <rect width="40" height="40" rx="10" fill="url(#ceronGrad)" />

        {/* Outer Ring / Orbit Accent */}
        <path
          d="M8 20C8 13.3726 13.3726 8 20 8C24.4183 8 28.2619 10.3846 30.3431 14"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Stylized Open Book */}
        <path
          d="M12 28C14.5 26.5 17.5 26.5 20 28V15C17.5 13.5 14.5 13.5 12 15V28Z"
          fill="white"
          fillOpacity="0.95"
        />
        <path
          d="M28 28C25.5 26.5 22.5 26.5 20 28V15C22.5 13.5 25.5 13.5 28 15V28Z"
          fill="white"
          fillOpacity="0.8"
        />

        {/* Spine Divider */}
        <line x1="20" y1="15" x2="20" y2="28" stroke="#1E1B4B" strokeWidth="1" />

        {/* Academic Star of Excellence */}
        <path
          d="M20 7L21.2 10.5L24.5 11.2L22 13.2L22.8 16.5L20 14.8L17.2 16.5L18 13.2L15.5 11.2L18.8 10.5L20 7Z"
          fill="url(#goldGrad)"
        />
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-none">
              Ceron
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 leading-none">
              Academic
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium tracking-tight leading-tight mt-0.5">
            BISE Swat &bull; Classes 9&ndash;12
          </span>
        </div>
      )}
    </div>
  );
};
export default CeronLogo;
