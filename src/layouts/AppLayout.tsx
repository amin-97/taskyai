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
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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
        <SidebarTrigger />
        <div>App Layout</div>
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
