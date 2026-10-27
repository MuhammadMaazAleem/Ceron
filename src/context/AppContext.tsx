import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LearnerProfile, Unit } from '../types';
import { StorageService } from '../services/storage';
import { ALL_CLASSES } from '../data/curriculumData';

interface AppContextValue {
  activeProfile: LearnerProfile;
  units: Unit[];
  languagePref: 'en' | 'ur';
  isDarkMode: boolean;
  isDedicationOpen: boolean;
  isTourOpen: boolean;

  setActiveProfile: React.Dispatch<React.SetStateAction<LearnerProfile>>;
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  openDedication: () => void;
  closeDedication: () => void;
  openTour: () => void;
  closeTour: () => void;
  handleSelectClass: (classId: string) => void;
  refreshProfile: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState<LearnerProfile>(StorageService.getActiveProfile());
  const [units, setUnits] = useState<Unit[]>(StorageService.getUnits());
  const [languagePref, setLanguagePref] = useState<'en' | 'ur'>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDedicationOpen, setIsDedicationOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Apply dark mode & age band tokens to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-age-band', activeProfile.ageBand);
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [activeProfile.ageBand, isDarkMode]);

  const refreshProfile = useCallback(() => {
    setActiveProfile(StorageService.getActiveProfile());
  }, []);

  const handleSelectClass = useCallback((classId: string) => {
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

    localStorage.setItem('ceron_has_chosen_class', 'true');
  }, [activeProfile.id]);

  const toggleLanguage = useCallback(() => {
    setLanguagePref((p) => (p === 'en' ? 'ur' : 'en'));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((d) => !d);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeProfile,
        units,
        languagePref,
        isDarkMode,
        isDedicationOpen,
        isTourOpen,
        setActiveProfile,
        setUnits,
        toggleLanguage,
        toggleDarkMode,
        openDedication: () => setIsDedicationOpen(true),
        closeDedication: () => setIsDedicationOpen(false),
        openTour: () => setIsTourOpen(true),
        closeTour: () => setIsTourOpen(false),
        handleSelectClass,
        refreshProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};

