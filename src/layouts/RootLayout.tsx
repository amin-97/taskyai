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
import Footer from '@/components/Footer';

const RootLayout = () => {
  return (
    <>
      <div className='min-h-[100dvh] flex flex-col overflow-hidden'>
        <Header />

        <main className='grow grid grid-cols-1 items-center pt-36 pb-16'>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
