import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RootLayout } from './layouts/RootLayout';

// ──────────────────────────────────────────────────────────
// Lazy-loaded pages — each loaded only when the route is visited
// ──────────────────────────────────────────────────────────
const IndexRedirect = lazy(() => import('./pages/IndexRedirect'));
const PortalPage    = lazy(() => import('./pages/PortalPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ChapterPage   = lazy(() => import('./pages/ChapterPage'));
const LessonPage    = lazy(() => import('./pages/LessonPage'));
const MockExamPage  = lazy(() => import('./pages/MockExamPage'));
const TutorPage     = lazy(() => import('./pages/TutorPage'));
const CheckerPage   = lazy(() => import('./pages/CheckerPage'));
const BadgesPage    = lazy(() => import('./pages/BadgesPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <IndexRedirect /> },
      { path: 'portal', element: <PortalPage /> },
      { path: 'class/:classId', element: <DashboardPage /> },
      { path: 'chapter/:unitId', element: <ChapterPage /> },
      { path: 'lesson/:unitId/:lessonId', element: <LessonPage /> },
      { path: 'mock', element: <MockExamPage /> },
      { path: 'tutor', element: <TutorPage /> },
      { path: 'checker', element: <CheckerPage /> },
      { path: 'checker/:unitId', element: <CheckerPage /> },
      { path: 'badges', element: <BadgesPage /> },
      // Catch-all → redirect home
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export const App: React.FC = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);

export default App;
