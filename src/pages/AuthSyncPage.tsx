/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Auth sync page for the app
 */

/**
 * Node modules
 */
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const AuthSyncPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    // Redirect to home page when user is not signed in
    if (!isSignedIn) {
      // Handled this case cause the user is signed out
      if (localStorage.getItem('clerkUserId')) {
        localStorage.removeItem('clerkUserId');
      }

      navigate('/');
      return;
    }

    // Set the userId in local storage an redirect to the Today Page when user is signed in
    if (isSignedIn) {
      localStorage.setItem('clerkUserId', userId);
      navigate('/app/today');
    }
  }, [userId, isSignedIn, isLoaded, navigate]);

  return <></>;
};

export default AuthSyncPage;
