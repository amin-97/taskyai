/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Task Card component for the app
 */

/**
 * Node modules
 */
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * Custom modules
 */
import { formatCustomDate, getTaskDueDateColorClass } from '@/lib/utils';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import TaskForm from '@/components/TaskForm';

/**
 * Assets
 */
import { Check, CalendarDays, Hash, Inbox, Edit, Trash } from 'lucide-react';

/**
 * Types
 */
import type { Models } from 'appwrite';
import type { Task } from '@/types';

type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Document | null;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  completed,
  dueDate,
  project,
}) => {
  const fetcher = useFetcher();

  const [taskFormShow, setTaskFormShow] = useState(false);

  const fetcherTask = fetcher.json as Task;
  console.log(fetcherTask);

  const task: Task = Object.assign(
    {
      id,
      content,
      completed,
      due_data: dueDate,
      project,
    },
    fetcherTask,
  );
  return (
    <>
      {!taskFormShow && (
        <div className='group/card relative grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b'>
          <Button
            variant='outline'
            size='icon'
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              task.completed && 'bg-border',
            )}
            role='checkbox'
            aria-checked={task.completed}
            aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
            aria-describedby='task-content'
          >
            <Check
              strokeWidth={4}
              className={cn(
                '!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                task.completed ? 'opacity-100' : 'opacity-0',
              )}
            />
          </Button>

          <Card className='rounded-none py-2 space-y-1.5 border-none'>
            <CardContent className='p-0'>
              <p
                id='task-content'
                className={cn(
                  'text-sm max-md:me-16',
                  completed && 'text-muted-foreground line-through',
                )}
              >
                {task.content}
              </p>
            </CardContent>

            <CardFooter>
              {task.due_date && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getTaskDueDateColorClass(task.due_date, task.completed),
                  )}
                >
                  <CalendarDays size={14} />

                  {formatCustomDate(task.due_date)}
                </div>
              )}

              <div className='grid grid-cols-[minmax(0,180px), max-content] items-center gap-1 text-xs text-muted-foreground ms-auto'>
                <div className='truncate text-right'>
                  {project?.name || 'Inbox'}
                </div>

                {project ? (
                  <Hash size={14} />
                ) : (
                  <Inbox
                    size={14}
                    className='text-muted-foreground'
                  />
                )}
              </div>
            </CardFooter>
          </Card>

          <div className='absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100'>
            {!completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='w-6 h-6 text-muted-foreground'
                    aria-label='Edit task'
                    onClick={() => setTaskFormShow(true)}
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='w-6 h-6 text-muted-foreground'
                  aria-label='Delete task'
                >
                  <Trash />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Delete task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {taskFormShow && (
        <TaskForm
          className='my-1/'
          defaultFormData={{
            id,
            content,
            due_date: dueDate,
            projectId: project && project?.$id,
          }}
          mode='edit'
          onCancel={() => setTaskFormShow(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'PUT',
              encType: 'application/json',
            });
            setTaskFormShow(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
