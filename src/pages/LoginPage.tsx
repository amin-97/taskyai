/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Login page for the app
 */

/**
 * Node modules
 */
import { SignIn } from '@clerk/clerk-react';
/**
 * Components
 */
import Head from '@/components/Head';

const LoginPage = () => {
  return (
    <>
      <Head title='Create an Account - Tasky AI To-Do List & Project Management App' />

      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
