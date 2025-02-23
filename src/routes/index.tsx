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

/**
 * Layouts
 */
import RootLayout from '@/layouts/RootLayout';

/**
 * Error boundaries
 */
import RootErrorBoundary from '@/pages/RootErrorBoundary';

/**
 * Types
 */

import type { RouteObject } from 'react-router';

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
]);

export default router;
