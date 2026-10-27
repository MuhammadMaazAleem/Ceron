import { LearnerProfile, QuizAttempt, Unit } from '../types';
import { INITIAL_PROFILES, UNITS } from '../data/curriculumData';
import { LearnerProfileSchema, QuizAttemptSchema } from '../types/schemas';
import { z } from 'zod';

const PROFILES_KEY = 'ceron_profiles_v3';
const ACTIVE_PROFILE_KEY = 'ceron_active_profile_id_v3';
const CUSTOM_UNITS_KEY = 'ceron_custom_units_v3';
const ATTEMPTS_KEY = 'ceron_attempts_v3';

const ALLOWED_CLASSES = new Set(['class_9', 'class_10', 'class_11', 'class_12']);

/**
 * Resilient, schema-validated LocalStorage persistence service.
 * Protects against corrupted storage, schema drifts, and quota exhaustion.
 */
export class StorageService {
  /**
   * Safe localStorage item setter with quota guard
   */
  private static safeSetItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.warn(`[StorageService] Failed to persist key "${key}" to localStorage:`, err);
      return false;
    }
  }

  /**
   * Safe localStorage item getter
   */
  private static safeGetItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.warn(`[StorageService] Failed to read key "${key}" from localStorage:`, err);
      return null;
    }
  }

  // -------------------------------------------------------------
  // Learner Profiles
  // -------------------------------------------------------------
  public static getProfiles(): LearnerProfile[] {
    const raw = this.safeGetItem(PROFILES_KEY);
    if (!raw) {
      this.safeSetItem(PROFILES_KEY, JSON.stringify(INITIAL_PROFILES));
      return INITIAL_PROFILES;
    }

    try {
      const parsed = JSON.parse(raw);
      const validation = z.array(LearnerProfileSchema).safeParse(parsed);

      if (!validation.success) {
        console.warn('[StorageService] Stored profiles failed schema validation; falling back to default:', validation.error);
        return INITIAL_PROFILES;
      }

      const filtered = validation.data.filter((p) => ALLOWED_CLASSES.has(p.classId)) as LearnerProfile[];
      if (filtered.length === 0) {
        this.safeSetItem(PROFILES_KEY, JSON.stringify(INITIAL_PROFILES));
        return INITIAL_PROFILES;
      }
      return filtered;
    } catch {
      return INITIAL_PROFILES;
    }
  }

  public static saveProfiles(profiles: LearnerProfile[]): void {
    this.safeSetItem(PROFILES_KEY, JSON.stringify(profiles));
  }

  public static getActiveProfile(): LearnerProfile {
    const profiles = this.getProfiles();
    const activeId = this.safeGetItem(ACTIVE_PROFILE_KEY);
    const found = profiles.find((p) => p.id === activeId && ALLOWED_CLASSES.has(p.classId));
    return found || profiles[0] || INITIAL_PROFILES[0];
  }

  public static setActiveProfile(id: string): void {
    this.safeSetItem(ACTIVE_PROFILE_KEY, id);
  }

  public static setProfileClass(
    childId: string,
    classId: string,
    className: string,
    ageBand: LearnerProfile['ageBand']
  ): void {
    const profiles = this.getProfiles();
    const target = profiles.find((p) => p.id === childId);
    if (target) {
      target.classId = classId;
      target.className = className;
      target.ageBand = ageBand;
      this.saveProfiles(profiles);
    }
  }

  public static addProfile(
    profile: Omit<LearnerProfile, 'id' | 'streakDays' | 'xp' | 'completedLessons' | 'badges'>
  ): LearnerProfile {
    const profiles = this.getProfiles();
    const newProfile: LearnerProfile = {
      ...profile,
      id: `child_${Date.now()}`,
      streakDays: 1,
      xp: 50,
      completedLessons: [],
      badges: ['Seed Pearl'],
    };
    profiles.push(newProfile);
    this.saveProfiles(profiles);
    this.setActiveProfile(newProfile.id);
    return newProfile;
  }

  public static completeLesson(childId: string, lessonId: string, xpEarned: number = 25): void {
    const profiles = this.getProfiles();
    const profile = profiles.find((p) => p.id === childId);
    if (profile) {
      if (!profile.completedLessons.includes(lessonId)) {
        profile.completedLessons.push(lessonId);
        profile.xp += xpEarned;
        this.saveProfiles(profiles);
      }
    }
  }

  // -------------------------------------------------------------
  // Custom Units / Curriculum Storage
  // -------------------------------------------------------------
  public static getUnits(): Unit[] {
    const raw = this.safeGetItem(CUSTOM_UNITS_KEY);
    if (!raw) {
      return UNITS;
    }
    try {
      const custom: Unit[] = JSON.parse(raw);
      if (Array.isArray(custom)) {
        return [...UNITS, ...custom];
      }
      return UNITS;
    } catch {
      return UNITS;
    }
  }

  public static addCustomUnit(unit: Unit): void {
    const raw = this.safeGetItem(CUSTOM_UNITS_KEY);
    let customList: Unit[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) customList = parsed;
      } catch {
        customList = [];
      }
    }
    customList.push(unit);
    this.safeSetItem(CUSTOM_UNITS_KEY, JSON.stringify(customList));
  }

  // -------------------------------------------------------------
  // Quiz Attempts & Evaluation
  // -------------------------------------------------------------
  public static recordAttempt(
    attempt: Omit<QuizAttempt, 'id' | 'percentage' | 'passed' | 'grade' | 'date'>
  ): QuizAttempt {
    const percentage = Math.round((attempt.score / attempt.total) * 100);
    const passed = percentage >= 33; // 33% Standard Pass mark

    let grade: QuizAttempt['grade'] = 'F';
    if (percentage >= 80) grade = 'A-1';
    else if (percentage >= 70) grade = 'A';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage >= 40) grade = 'D';
    else if (percentage >= 33) grade = 'E';

    const fullAttempt: QuizAttempt = {
      ...attempt,
      id: `att_${Date.now()}`,
      percentage,
      passed,
      grade,
      date: new Date().toISOString(),
    };

    const list = this.getAttempts();
    list.unshift(fullAttempt);
    this.safeSetItem(ATTEMPTS_KEY, JSON.stringify(list));

    if (passed) {
      const profiles = this.getProfiles();
      const p = profiles.find((x) => x.id === attempt.childId);
      if (p) {
        p.xp += 100;
        this.saveProfiles(profiles);
      }
    }

    return fullAttempt;
  }

  public static getAttempts(childId?: string): QuizAttempt[] {
    const raw = this.safeGetItem(ATTEMPTS_KEY);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      const validation = z.array(QuizAttemptSchema).safeParse(parsed);
      const list = validation.success ? (validation.data as QuizAttempt[]) : [];
      if (childId) {
        return list.filter((a) => a.childId === childId);
      }
      return list;
    } catch {
      return [];
    }
  }
}
