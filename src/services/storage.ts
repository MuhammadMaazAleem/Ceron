import { LearnerProfile, QuizAttempt, Unit } from '../types';
import { INITIAL_PROFILES, UNITS } from '../data/curriculumData';

const PROFILES_KEY = 'ceron_profiles_v3';
const ACTIVE_PROFILE_KEY = 'ceron_active_profile_id_v3';
const CUSTOM_UNITS_KEY = 'ceron_custom_units_v3';
const ATTEMPTS_KEY = 'ceron_attempts_v3';

const ALLOWED_CLASSES = new Set(['class_9', 'class_10', 'class_11', 'class_12']);

export class StorageService {
  // Profiles
  public static getProfiles(): LearnerProfile[] {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(INITIAL_PROFILES));
      return INITIAL_PROFILES;
    }
    try {
      const parsed: LearnerProfile[] = JSON.parse(raw);
      const filtered = parsed.filter((p) => ALLOWED_CLASSES.has(p.classId));
      if (filtered.length === 0) {
        localStorage.setItem(PROFILES_KEY, JSON.stringify(INITIAL_PROFILES));
        return INITIAL_PROFILES;
      }
      return filtered;
    } catch {
      return INITIAL_PROFILES;
    }
  }

  public static saveProfiles(profiles: LearnerProfile[]) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }

  public static getActiveProfile(): LearnerProfile {
    const profiles = this.getProfiles();
    const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
    const found = profiles.find((p) => p.id === activeId && ALLOWED_CLASSES.has(p.classId));
    return found || profiles[0] || INITIAL_PROFILES[0];
  }

  public static setActiveProfile(id: string) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  }

  public static setProfileClass(childId: string, classId: string, className: string, ageBand: LearnerProfile['ageBand']) {
    const profiles = this.getProfiles();
    const target = profiles.find((p) => p.id === childId);
    if (target) {
      target.classId = classId;
      target.className = className;
      target.ageBand = ageBand;
      this.saveProfiles(profiles);
    }
  }

  public static addProfile(profile: Omit<LearnerProfile, 'id' | 'streakDays' | 'xp' | 'completedLessons' | 'badges'>): LearnerProfile {
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

  // Update learner progress
  public static completeLesson(childId: string, lessonId: string, xpEarned: number = 25) {
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

  // Custom Units / CMS added data
  public static getUnits(): Unit[] {
    const raw = localStorage.getItem(CUSTOM_UNITS_KEY);
    if (!raw) {
      return UNITS;
    }
    try {
      const custom: Unit[] = JSON.parse(raw);
      return [...UNITS, ...custom];
    } catch {
      return UNITS;
    }
  }

  public static addCustomUnit(unit: Unit) {
    const raw = localStorage.getItem(CUSTOM_UNITS_KEY);
    const customList: Unit[] = raw ? JSON.parse(raw) : [];
    customList.push(unit);
    localStorage.setItem(CUSTOM_UNITS_KEY, JSON.stringify(customList));
  }

  // Quiz Attempts & Pass/Fail evaluation (Strict 33% standard)
  public static recordAttempt(attempt: Omit<QuizAttempt, 'id' | 'percentage' | 'passed' | 'grade' | 'date'>): QuizAttempt {
    const percentage = Math.round((attempt.score / attempt.total) * 100);
    const passed = percentage >= 33; // 33% Pass mark

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

    const raw = localStorage.getItem(ATTEMPTS_KEY);
    const list: QuizAttempt[] = raw ? JSON.parse(raw) : [];
    list.unshift(fullAttempt);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(list));

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
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    const list: QuizAttempt[] = raw ? JSON.parse(raw) : [];
    if (childId) {
      return list.filter((a) => a.childId === childId);
    }
    return list;
  }
}
