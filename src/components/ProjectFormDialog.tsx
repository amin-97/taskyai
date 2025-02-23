/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Project Form dialog component for the app
 */

/**
 * Node modules
 */
import { useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * Components
 */
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ProjectForm from '@/components/ProjectForm';

/**
 * Types
 */
import type { Project } from '@/types';

type ProjectFormDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: 'POST' | 'PUT';
};

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  defaultFormData,
  children,
  method,
}) => {
  const fetcher = useFetcher();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-0 border-0 !rounded-xl'>
        <ProjectForm
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false);

            await fetcher.submit(JSON.stringify(data), {
              action: '/app/projects',
              method,
              encType: 'application/json',
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
