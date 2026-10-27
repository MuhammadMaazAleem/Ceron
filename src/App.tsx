import React, { useState, useEffect } from 'react';
import { LearnerProfile, Unit, Lesson, Quiz } from './types';
import { StorageService } from './services/storage';
import { ALL_CLASSES, SUBJECTS, QUIZZES } from './data/curriculumData';
import { Header } from './components/navigation/Header';
import { BottomBar } from './components/navigation/BottomBar';
import { PlaygroundDashboard } from './components/dashboard/PlaygroundDashboard';
import { QuestDashboard } from './components/dashboard/QuestDashboard';
import { AcademyDashboard } from './components/dashboard/AcademyDashboard';
import { BadgesView } from './components/dashboard/BadgesView';
import { LessonPlayer } from './components/lesson/LessonPlayer';
import { QuizRunner } from './components/quiz/QuizRunner';
import { ChapterDetailView } from './components/chapter/ChapterDetailView';
import { DedicationSplashModal } from './components/common/DedicationSplashModal';
import { generate50McqQuizForUnit } from './services/aiQuizGenerator';
import { SubjectAIPanel } from './components/tutor/SubjectAIPanel';
import { CeronAIClaudeView } from './components/tutor/CeronAIClaudeView';
import { AIPaperCheckerView } from './components/checker/AIPaperCheckerView';
import { AppTourVideoModal } from './components/common/AppTourVideoModal';
import { ClassSelectionPortal } from './components/common/ClassSelectionPortal';
import { NavigationRouter, AppRoute } from './services/navigationRouter';

export const App: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<LearnerProfile>(StorageService.getActiveProfile());
  const [units, setUnits] = useState<Unit[]>(StorageService.getUnits());
  const [languagePref, setLanguagePref] = useState<'en' | 'ur'>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Navigation and view states
  const [activeView, setActiveView] = useState<'dashboard' | 'chapter' | 'lesson' | 'quiz'>('dashboard');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Class Selection Screen (Shown on first visit or when user clicks Change Class)
  const [isSelectingClass, setIsSelectingClass] = useState<boolean>(
    () => !localStorage.getItem('ceron_has_chosen_class')
  );

  // Dedication to Baba Jan & Mor Jan (Opened on-demand via Nav Bar)
  const [isDedicationOpen, setIsDedicationOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Apply dark mode & age band tokens to document body
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-age-band', activeProfile.ageBand);
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [activeProfile.ageBand, isDarkMode]);

  // Synchronize URL Hash routing with application state & support browser back button
  useEffect(() => {
    const handleHashSync = () => {
      const route = NavigationRouter.parseHash(window.location.hash);

      if (route.type === 'portal') {
        setIsSelectingClass(true);
        return;
      }

      setIsSelectingClass(false);

      if (route.type === 'tutor') {
        setActiveTab('tutor');
        return;
      }

      if (route.type === 'checker') {
        setActiveTab('checker');
        if (route.unitId) {
          const found = units.find((u) => u.id === route.unitId);
          if (found) setActiveUnit(found);
        }
        return;
      }

      if (route.type === 'badges') {
        setActiveTab('badges');
        setActiveView('dashboard');
        return;
      }

      if (route.type === 'mock') {
        setActiveTab('mock');
        setActiveView('dashboard');
        setActiveUnit(null);
        setActiveLesson(null);
        setActiveQuiz(null);
        return;
      }

      if (route.type === 'chapter' && route.unitId) {
        const foundUnit = units.find((u) => u.id === route.unitId);
        if (foundUnit) {
          setActiveUnit(foundUnit);
          setActiveView('chapter');
          setActiveTab('home');
          return;
        }
      }

      if (route.type === 'lesson' && route.unitId && route.lessonId) {
        const foundUnit = units.find((u) => u.id === route.unitId);
        if (foundUnit) {
          const foundLesson = foundUnit.lessons?.find((l) => l.id === route.lessonId);
          if (foundLesson) {
            setActiveUnit(foundUnit);
            setActiveLesson(foundLesson);
            setActiveView('lesson');
            return;
          }
        }
      }

      if (route.type === 'quiz' && route.quizId) {
        const foundUnit = route.unitId ? units.find((u) => u.id === route.unitId) : undefined;
        handleLaunchMock(foundUnit || route.quizId, false);
        return;
      }

      if (route.type === 'dashboard') {
        if (route.classId && route.classId !== activeProfile.classId) {
          handleSelectClass(route.classId, false);
        }
        setActiveView('dashboard');
        setActiveTab('home');
        setActiveUnit(null);
        setActiveLesson(null);
        setActiveQuiz(null);
      }
    };

    // Initial sync
    if (window.location.hash) {
      handleHashSync();
    } else {
      if (isSelectingClass) {
        NavigationRouter.replace({ type: 'portal' });
      } else {
        NavigationRouter.replace({ type: 'dashboard', classId: activeProfile.classId });
      }
    }

    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [units, activeProfile.classId]);

  // Handle switching class directly (9th to 12th)
  const handleSelectClass = (classId: string, updateHash: boolean = true) => {
    const matched = ALL_CLASSES.find((c) => c.id === classId);
    if (!matched) return;

    StorageService.setProfileClass(
      activeProfile.id,
      matched.id,
      `${matched.nameEn} (${matched.stage})`,
      matched.ageBand
    );

    setActiveProfile((prev) => ({
      ...prev,
      classId: matched.id,
      className: `${matched.nameEn} (${matched.stage})`,
      ageBand: matched.ageBand,
    }));

    setActiveView('dashboard');
    setActiveTab('home');
    setActiveUnit(null);
    setActiveLesson(null);
    setActiveQuiz(null);

    if (updateHash) {
      NavigationRouter.push({ type: 'dashboard', classId: matched.id });
    }
  };

  // Launch a Chapter (shows all sequential topics, formulas, past papers, quiz)
  const handleSelectUnit = (unit: Unit) => {
    setActiveUnit(unit);
    setActiveView('chapter');
    setActiveTab('home');
    NavigationRouter.push({ type: 'chapter', unitId: unit.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch AI 50-MCQ Mock Test for any Unit / Chapter
  const handleLaunchMock = (quizIdOrUnit?: string | Unit, updateHash: boolean = true) => {
    let targetUnit: Unit | undefined = activeUnit || undefined;

    if (typeof quizIdOrUnit === 'object' && quizIdOrUnit) {
      targetUnit = quizIdOrUnit;
    } else if (typeof quizIdOrUnit === 'string') {
      const found = units.find((u) => u.quizId === quizIdOrUnit || u.id === quizIdOrUnit);
      if (found) {
        targetUnit = found;
      }
    }

    if (!targetUnit) {
      targetUnit = displayedUnits[0] || units[0];
    }

    if (targetUnit) {
      const baseQuiz = targetUnit.quizId ? QUIZZES[targetUnit.quizId] : null;
      const ai50Quiz = generate50McqQuizForUnit(targetUnit, baseQuiz);
      setActiveQuiz(ai50Quiz);
      setActiveUnit(targetUnit);
      setActiveView('quiz');
      if (updateHash) {
        NavigationRouter.push({
          type: 'quiz',
          quizId: targetUnit.quizId || targetUnit.id,
          unitId: targetUnit.id,
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Re-rolls a brand new set of 50 AI questions for current chapter
  const handleRegenerateCurrentQuiz = () => {
    if (activeUnit) {
      const baseQuiz = activeUnit.quizId ? QUIZZES[activeUnit.quizId] : null;
      const freshAiQuiz = generate50McqQuizForUnit(activeUnit, baseQuiz);
      setActiveQuiz(freshAiQuiz);
    }
  };

  // Filter units for active class (or fallback to closest stage units)
  const classUnits = units.filter((u) => u.classId === activeProfile.classId);
  const displayedUnits = classUnits.length > 0 ? classUnits : units;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-purple-200">
      {/* Top Header with simple Class badge - Hidden when in AI Tutor or Paper Checker or Class Picker */}
      {activeTab !== 'tutor' && activeTab !== 'checker' && !isSelectingClass && (
        <Header
          activeProfile={activeProfile}
          languagePref={languagePref}
          isDarkMode={isDarkMode}
          onToggleLanguage={() => setLanguagePref((p) => (p === 'en' ? 'ur' : 'en'))}
          onToggleTheme={() => setIsDarkMode((d) => !d)}
          onOpenDedication={() => setIsDedicationOpen(true)}
          onOpenClassPicker={() => NavigationRouter.push({ type: 'portal' })}
        />
      )}

      {/* Main Content Area */}
      <main className={activeTab === 'tutor' || activeTab === 'checker' || isSelectingClass ? 'flex-1 w-full p-0 m-0' : 'flex-1 max-w-4xl w-full mx-auto px-4 py-6'}>
        {isSelectingClass ? (
          <ClassSelectionPortal
            currentClassId={activeProfile.classId}
            canCancel={!!localStorage.getItem('ceron_has_chosen_class')}
            onCancel={() => NavigationRouter.back()}
            onSelectClass={(classId) => {
              handleSelectClass(classId);
              localStorage.setItem('ceron_has_chosen_class', 'true');
              setIsSelectingClass(false);
            }}
          />
        ) : activeTab === 'tutor' ? (
          <CeronAIClaudeView
            profile={activeProfile}
            onExit={() => NavigationRouter.back()}
          />
        ) : activeTab === 'checker' ? (
          <AIPaperCheckerView
            profile={activeProfile}
            units={units}
            subjects={SUBJECTS}
            initialUnitId={activeUnit?.id}
            onExit={() => NavigationRouter.back()}
          />
        ) : activeView === 'chapter' && activeUnit ? (
          <ChapterDetailView
            unit={activeUnit}
            subject={SUBJECTS.find((s) => s.id === activeUnit.subjectId)}
            languagePref={languagePref}
            completedLessonIds={activeProfile.completedLessons || []}
            onBack={() => {
              NavigationRouter.back();
            }}
            onSelectLesson={(lesson) => {
              setActiveLesson(lesson);
              setActiveView('lesson');
              NavigationRouter.push({
                type: 'lesson',
                unitId: activeUnit.id,
                lessonId: lesson.id,
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLaunchQuiz={(quizId) => handleLaunchMock(quizId)}
            onCompleteTopic={(lessonId) => {
              StorageService.completeLesson(activeProfile.id, lessonId, 25);
              setActiveProfile(StorageService.getActiveProfile());
            }}
          />
        ) : activeView === 'lesson' && activeLesson ? (
          <LessonPlayer
            lesson={activeLesson}
            allLessonsInUnit={activeUnit?.lessons || []}
            childId={activeProfile.id}
            languagePref={languagePref}
            onBack={() => {
              NavigationRouter.back();
            }}
            onSelectLesson={(lesson) => {
              setActiveLesson(lesson);
              if (activeUnit) {
                NavigationRouter.push({
                  type: 'lesson',
                  unitId: activeUnit.id,
                  lessonId: lesson.id,
                });
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTakeQuiz={() => {
              handleLaunchMock(activeUnit || undefined);
            }}
          />
        ) : activeView === 'quiz' && activeQuiz ? (
          <QuizRunner
            quiz={activeQuiz}
            childId={activeProfile.id}
            onRegenerateAiQuiz={handleRegenerateCurrentQuiz}
            onExit={() => {
              NavigationRouter.back();
              setActiveQuiz(null);
            }}
          />
        ) : activeTab === 'badges' ? (
          <BadgesView profile={activeProfile} />
        ) : activeTab === 'mock' ? (
          <div className="max-w-3xl mx-auto py-4 sm:py-6 px-1 sm:px-4">
            <div className="pearl-card p-4 sm:p-6 text-center bg-white border border-slate-200 shadow-md rounded-2xl mb-6 overflow-hidden">
              <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 inline-block mb-2">
                ✨ Official BISE Swat 20 MCQs Examination (Simple to Hard)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                AI Chapter Exam Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium max-w-xl mx-auto leading-relaxed">
                Choose any chapter below to launch an instant AI-generated 20-MCQ board examination calibrated progressively from Simple (Recall &amp; Definitions) to Medium (Formulas) to Hard (Calculations).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left">
                {displayedUnits.map((u) => {
                  const sub = SUBJECTS.find((s) => s.id === u.subjectId);
                  return (
                    <button
                      key={u.id}
                      onClick={() => handleLaunchMock(u)}
                      className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition cursor-pointer flex items-center justify-between group shadow-xs hover:shadow-sm overflow-hidden box-border"
                    >
                      <div className="flex-1 min-w-0 pr-2 overflow-hidden text-left">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                            {sub?.nameEn || 'STEM'}
                          </span>
                          <span className="text-xs font-semibold text-purple-700">
                            Unit {u.unitNumber}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate block group-hover:text-purple-900">
                          {u.titleEn}
                        </h4>
                        <p className="text-xs font-nastaliq text-slate-600 truncate block mt-0.5" dir="rtl">
                          {u.titleUr}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-purple-700 shrink-0 bg-purple-100 group-hover:bg-purple-200 px-2.5 py-1 rounded-lg border border-purple-200 whitespace-nowrap ml-1">
                        20 MCQs
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Academic Dashboard for Classes 9 to 12 */
          <AcademyDashboard
            profile={activeProfile}
            subjects={SUBJECTS.filter((s) => s.classes.includes(activeProfile.classId))}
            units={displayedUnits}
            languagePref={languagePref}
            onSelectUnit={handleSelectUnit}
            onLaunchMockTest={() => handleLaunchMock(displayedUnits[0])}
            onOpenTour={() => setIsTourOpen(true)}
          />
        )}
      </main>

      {/* Adaptive Bottom Navigation Bar - Visible across Dashboard and Quizzes */}
      {(activeView === 'dashboard' || activeView === 'quiz') && activeTab !== 'tutor' && activeTab !== 'checker' && !isSelectingClass && (
        <BottomBar
          ageBand={activeProfile.ageBand}
          activeTab={activeTab === 'mock' || activeView === 'quiz' ? 'mock' : activeTab}
          onTabChange={(tab) => {
            if (tab === 'mock') {
              setActiveTab('mock');
              setActiveView('dashboard');
              setActiveQuiz(null);
              NavigationRouter.push({ type: 'mock' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (tab === 'tutor') {
              NavigationRouter.push({ type: 'tutor' });
            } else if (tab === 'checker') {
              NavigationRouter.push({ type: 'checker', unitId: activeUnit?.id });
            } else if (tab === 'home') {
              setActiveTab('home');
              setActiveView('dashboard');
              setActiveUnit(null);
              setActiveLesson(null);
              setActiveQuiz(null);
              NavigationRouter.push({ type: 'dashboard', classId: activeProfile.classId });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setActiveTab(tab);
            }
          }}
        />
      )}

      {/* ── Dedication to Baba Jan & Mor Jan Modal (Opened via Nav Bar) ── */}
      {isDedicationOpen && (
        <DedicationSplashModal
          isOpen={isDedicationOpen}
          onClose={() => setIsDedicationOpen(false)}
        />
      )}

      {/* ── App Tour & Video Walkthrough Modal ── */}
      {isTourOpen && (
        <AppTourVideoModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onStartExam={() => {
            setIsTourOpen(false);
            setActiveTab('mock');
          }}
          onOpenAITutor={() => {
            setIsTourOpen(false);
            setActiveTab('tutor');
          }}
        />
      )}
    </div>
  );
};

export default App;
