import React from 'react';
import { AgeBand } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { BookOpen, Sparkles, FileText, ClipboardCheck } from 'lucide-react';

interface BottomBarProps {
  ageBand: AgeBand;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const handleTab = (id: string) => {
    soundEngine.playPop();
    onTabChange(id);
  };

  const navItems = [
    { id: 'home', label: 'Syllabus', icon: BookOpen },
    { id: 'tutor', label: 'AI Tutor', icon: Sparkles },
    { id: 'checker', label: 'Paper Checker', icon: ClipboardCheck },
    { id: 'mock', label: '20-MCQ Exam', icon: FileText },
  ];

  return (
    <nav
      role="tablist"
      aria-label="Main Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid #E2E8F0',
        padding: '6px 12px calc(8px + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '6px',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-label={item.label}
              onClick={() => handleTab(item.id)}
              style={{
                flex: 1,
                padding: '6px 4px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                border: isActive ? '1px solid #C7D2FE' : '1px solid transparent',
                backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                color: isActive ? '#3730A3' : '#64748B',
                fontWeight: isActive ? 700 : 500,
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#4F46E5' : '#94A3B8' }} />
              <span style={{ fontSize: '11px', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomBar;
