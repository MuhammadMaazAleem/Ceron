import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/navigation/Header';
import { BottomBar } from '../components/navigation/BottomBar';
import { useApp } from '../context/AppContext';
import { Loader2 } from 'lucide-react';

// Lazy-loaded modals
const DedicationSplashModal = React.lazy(() =>
  import('../components/common/DedicationSplashModal').then((m) => ({
    default: m.DedicationSplashModal,
  }))
);
const AppTourVideoModal = React.lazy(() =>
  import('../components/common/AppTourVideoModal').then((m) => ({
    default: m.AppTourVideoModal,
  }))
);

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center py-20">
    <Loader2 size={28} className="animate-spin text-indigo-500" />
  </div>
);

export const RootLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeProfile,
    languagePref,
    isDarkMode,
    isDedicationOpen,
    isTourOpen,
    toggleLanguage,
    toggleDarkMode,
    openDedication,
    closeDedication,
    closeTour,
  } = useApp();

  // Determine which UI elements to show based on current route
  const isPortal = location.pathname === '/portal' || location.pathname === '/';
  const isTutor = location.pathname === '/tutor';
  const isChecker = location.pathname.startsWith('/checker');
  const isExamActive = location.pathname === '/mock' && location.search.includes('unitId=');
  const isFullscreen = isPortal || isTutor || isChecker || isExamActive;

  // Smooth scroll to top on every route transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  // Which tab is "active" in the BottomBar
  const getActiveTab = () => {
    if (location.pathname === '/mock') return 'mock';
    if (location.pathname.startsWith('/tutor')) return 'tutor';
    if (location.pathname.startsWith('/checker')) return 'checker';
    if (location.pathname.startsWith('/badges')) return 'badges';
    return 'home';
  };

  const showHeader = !isTutor && !isChecker && !isPortal && !isExamActive;
  const showBottomBar = !isTutor && !isChecker && !isPortal && !isExamActive;

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      navigate(`/class/${activeProfile.classId}`);
    } else if (tab === 'tutor') {
      navigate('/tutor');
    } else if (tab === 'checker') {
      navigate('/checker');
    } else if (tab === 'mock') {
      navigate('/mock');
    } else if (tab === 'badges') {
      navigate('/badges');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-purple-200">
      {showHeader && (
        <Header
          activeProfile={activeProfile}
          languagePref={languagePref}
          isDarkMode={isDarkMode}
          onToggleLanguage={toggleLanguage}
          onToggleTheme={toggleDarkMode}
          onOpenDedication={openDedication}
          onOpenClassPicker={() => navigate('/portal')}
        />
      )}

      <main
        className={
          isFullscreen
            ? 'flex-1 w-full p-0 m-0'
            : 'flex-1 max-w-4xl w-full mx-auto px-4 py-6'
        }
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      {showBottomBar && (
        <BottomBar
          ageBand={activeProfile.ageBand}
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
        />
      )}

      {/* Lazily-mounted modals */}
      <Suspense fallback={null}>
        {isDedicationOpen && (
          <DedicationSplashModal
            isOpen={isDedicationOpen}
            onClose={closeDedication}
          />
        )}
        {isTourOpen && (
          <AppTourVideoModal
            isOpen={isTourOpen}
            onClose={closeTour}
            onStartExam={() => {
              closeTour();
              navigate('/mock');
            }}
            onOpenAITutor={() => {
              closeTour();
              navigate('/tutor');
            }}
          />
        )}
      </Suspense>
    </div>
  );
};

