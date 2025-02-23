/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Task Create Button component for the app
 */

/**
 * Components
 */
import { Button } from '@/components/ui/button';

/**
 * Assets
 */
import { CirclePlus } from 'lucide-react';

/**
 * Types
 */
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus /> Add Task
    </Button>
  );
};

export default TaskCreateButton;
