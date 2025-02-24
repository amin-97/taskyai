/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Project delete button component for the app
 */

/**
 * Node modules
 */
import { useFetcher, useLocation, useNavigate } from 'react-router';
import { useCallback } from 'react';

/**
 * Custom modules
 */
import { truncateString } from '@/lib/utils';

/**
 * Components
 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

/**
 * Hooks
 */
import { toast } from 'sonner';

/**
 * Assets
 */
import { Trash2 } from 'lucide-react';

/**
 * Types
 */
import type { Project } from '@/types';

type ProjectDeleteButtonProps = {
  defaultFormData: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const handleProjectDelete = useCallback(async () => {
    if (location.pathname === `/app/projects/${defaultFormData.id}`) {
      navigate('/app/inbox');
    }

    const toastId = toast('Deleting project...', { duration: Infinity });

    try {
      await fetcher.submit(defaultFormData, {
        action: '/app/projects',
        method: 'DELETE',
        encType: 'application/json',
      });

      toast.success('Project deleted', {
        id: toastId, // Use the toastId from the initial toast
        description: `The project ${truncateString(defaultFormData.name, 32)} has been successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log('Error deleting project', err);
      toast.error('Failed to delete project', {
        id: toastId,
        description: 'Something went wrong. Please try again.',
        duration: 5000,
      });
    }
  }, [defaultFormData, fetcher, location.pathname, navigate]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start px-2 !text-destructive'
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>

          <AlertDialogDescription>
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{' '}
            project and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
