/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Resgister page for the app
 */

/**
 * Node modules
 */
import { SignUp } from '@clerk/clerk-react';

/**
 * Components
 */
import Head from '@/components/Head';

const RegisterPage = () => {
  return (
    <>
      <Head title='Create an Account - Tasky AI To-Do List & Project Management App' />

      <section>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/login' />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
