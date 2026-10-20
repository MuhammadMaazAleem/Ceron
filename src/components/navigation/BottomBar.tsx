import React from 'react';
import { AgeBand } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { BookOpen, Sparkles, FileText } from 'lucide-react';

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

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #E2E8F0',
        padding: '6px 12px 10px',
        boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '8px',
        }}
      >
        {/* Tab 1: Syllabus */}
        <button
          onClick={() => handleTab('home')}
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
            backgroundColor: activeTab === 'home' ? '#F1F5F9' : 'transparent',
            color: activeTab === 'home' ? '#0F172A' : '#64748B',
            fontWeight: activeTab === 'home' ? 800 : 500,
          }}
        >
          <BookOpen size={18} style={{ color: activeTab === 'home' ? '#0F172A' : '#94A3B8' }} />
          <span style={{ fontSize: '11px', lineHeight: 1.2 }}>Syllabus</span>
        </button>

        {/* Tab 2: Ask AI Tutor (Center Highlight) */}
        <button
          onClick={() => handleTab('tutor')}
          style={{
            flex: 1.15,
            padding: '6px 8px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            border: activeTab === 'tutor' ? 'none' : '1px solid #E9D5FF',
            backgroundColor: activeTab === 'tutor' ? '#7C3AED' : '#F5F3FF',
            color: activeTab === 'tutor' ? '#FFFFFF' : '#6D28D9',
            fontWeight: 700,
            boxShadow: activeTab === 'tutor' ? '0 2px 8px rgba(124, 58, 237, 0.3)' : 'none',
          }}
        >
          <Sparkles size={18} style={{ color: activeTab === 'tutor' ? '#FFFFFF' : '#7C3AED' }} />
          <span style={{ fontSize: '11px', lineHeight: 1.2 }}>Ask AI Tutor</span>
        </button>

        {/* Tab 3: Mock Exams */}
        <button
          onClick={() => handleTab('mock')}
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
            border: 'none',
            backgroundColor: activeTab === 'mock' ? '#ECFDF5' : 'transparent',
            color: activeTab === 'mock' ? '#047857' : '#64748B',
            fontWeight: activeTab === 'mock' ? 700 : 500,
          }}
        >
          <FileText size={18} style={{ color: activeTab === 'mock' ? '#059669' : '#94A3B8' }} />
          <span style={{ fontSize: '11px', lineHeight: 1.2 }}>20-MCQ Exam</span>
        </button>
      </div>
    </nav>
  );
};
export default BottomBar;
