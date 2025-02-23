/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Main entry point for the app
 */

/**
 * Node modules
 */
import { createBrowserRouter } from 'react-router';
/**
 * Pages
 */
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import AuthSyncPage from '@/pages/AuthSyncPage';
import InboxPage from '@/pages/InboxPage';
import TodayTaskPage from '@/pages/TodayTaskPage';
/**
 * Layouts
 */
import RootLayout from '@/layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';

/**
 * Error boundaries
 */
import RootErrorBoundary from '@/pages/RootErrorBoundary';

/**
 * Actions
 */
import appAction from '@/routes/actions/appAction';

/**
 * Loaders
 */
import inboxTaskLoader from '@/routes/loaders/inboxLoader';
import todayTaskLoader from '@/routes/loaders/todayTaskLoader';

/**
 * Types
 */
import type { RouteObject } from 'react-router';
const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'auth-sync',
    element: <AuthSyncPage />,
  },
];

const appRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
    loader: inboxTaskLoader,
  },
  {
    path: 'today',
    element: <TodayTaskPage />,
    loader: todayTaskLoader,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
  },
]);

export default router;
