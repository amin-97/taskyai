/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Inbox page for the app
 */

/**
 * Node modules
 */
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

/**
 * Components
 */
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmptyState from '@/components/TaskEmptyState';
import TaskForm from '@/components/TaskForm';

/**
 * Types
 */
import type { Models } from 'appwrite';

const InboxPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  const [taskFormShow, setTaskFormShow] = useState(false);

  return (
    <>
      <Head title='Inbox - Tasky AI' />
      <TopAppBar
        title='Inbox'
        taskCount={20}
      />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, projectId }) => (
              <div>Task card</div>
            ),
          )}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!taskFormShow && <TaskEmptyState type='inbox' />}

          {taskFormShow && (
            <TaskForm
              className='mt-1'
              mode='create'
              onCancel={() => setTaskFormShow(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: '/app',
                  method: 'POST',
                  encType: 'application/json',
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default InboxPage;
