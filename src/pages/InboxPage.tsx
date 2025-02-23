/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Inbox page for the app
 */

/**
 * Components
 */
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';

const InboxPage = () => {
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

        <PageList>Page List</PageList>
      </Page>
    </>
  );
};

export default InboxPage;
