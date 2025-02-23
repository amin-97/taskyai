/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description App layout for the app
 */

/**
 * Node modules
 */
import { Outlet } from 'react-router';

/**
 * Components
 */
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppSidebar from '@/components/AppSidebar';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider
        delayDuration={500}
        disableHoverableContent
      >
        <AppSidebar />
        <main className='flex-1'>
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
