/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Main entry point for the app
 */

/**
 * Node modules
 */
import { Outlet } from 'react-router';

/**
 * Node modules
 */
import Header from '@/components/Header';

const RootLayout = () => {
  return (
    <>
      <div className=''>
        <Header />
      </div>
    </>
  );
};

export default RootLayout;
