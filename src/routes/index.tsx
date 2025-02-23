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
 * Types
 */

import type { RouteObject } from 'react-router';

const rootRouteChildren = [
  {
    index: true,
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: rootRouteChildren,
  },
]);

export default router;
