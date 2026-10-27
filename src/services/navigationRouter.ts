/**
 * Ceron Academic URL Hash Navigation Router
 * Provides browser history, deep-linking, and mobile back button support.
 */

export type RouteType =
  | 'portal'
  | 'dashboard'
  | 'chapter'
  | 'lesson'
  | 'quiz'
  | 'tutor'
  | 'checker'
  | 'badges'
  | 'mock';

export interface AppRoute {
  type: RouteType;
  classId?: string;
  unitId?: string;
  lessonId?: string;
  quizId?: string;
}

export class NavigationRouter {
  public static parseHash(hash: string): AppRoute {
    const cleanHash = hash.replace(/^#\/?/, '').trim();
    if (!cleanHash) {
      // Default to portal or dashboard check
      return { type: 'portal' };
    }

    const segments = cleanHash.split('/').map((s) => decodeURIComponent(s));
    const [section, p1, p2, p3] = segments;

    switch (section) {
      case 'class':
        return { type: 'dashboard', classId: p1 };
      case 'dashboard':
        return { type: 'dashboard', classId: p1 };
      case 'chapter':
        return { type: 'chapter', unitId: p1 };
      case 'lesson':
        return { type: 'lesson', unitId: p1, lessonId: p2 };
      case 'quiz':
        return { type: 'quiz', quizId: p1, unitId: p2 };
      case 'tutor':
        return { type: 'tutor' };
      case 'checker':
        return { type: 'checker', unitId: p1 };
      case 'badges':
        return { type: 'badges' };
      case 'mock':
        return { type: 'mock' };
      case 'portal':
        return { type: 'portal' };
      default:
        return { type: 'dashboard' };
    }
  }

  public static routeToHash(route: AppRoute): string {
    switch (route.type) {
      case 'portal':
        return '#/portal';
      case 'dashboard':
        return route.classId ? `#/class/${route.classId}` : '#/dashboard';
      case 'chapter':
        return `#/chapter/${route.unitId || ''}`;
      case 'lesson':
        return `#/lesson/${route.unitId || ''}/${route.lessonId || ''}`;
      case 'quiz':
        return route.unitId ? `#/quiz/${route.quizId || ''}/${route.unitId}` : `#/quiz/${route.quizId || ''}`;
      case 'tutor':
        return '#/tutor';
      case 'checker':
        return route.unitId ? `#/checker/${route.unitId}` : '#/checker';
      case 'badges':
        return '#/badges';
      case 'mock':
        return '#/mock';
      default:
        return '#/dashboard';
    }
  }

  public static push(route: AppRoute) {
    const newHash = this.routeToHash(route);
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }

  public static replace(route: AppRoute) {
    const newHash = this.routeToHash(route);
    const url = new URL(window.location.href);
    url.hash = newHash;
    window.history.replaceState(null, '', url.toString());
  }

  public static back() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.push({ type: 'dashboard' });
    }
  }
}
