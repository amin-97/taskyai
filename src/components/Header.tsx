/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Main entry point for the app
 */

/**
 * Node modules
 */
import { Link } from 'react-router';

/**
 * Components
 */
import Logo from '@/components/Logo';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full p-4'>
      <div className='container h-16 border backdrop-blur-3xl rounded-xl flex justify-between items-center'>
        <Link to='/'>
          <Logo />
        </Link>

        <div className='flex items-center gap-2'>
          <Button
            asChild
            variant='ghost'
          >
            <Link to='/login'>Sign In</Link>
          </Button>
          <Button asChild>
            <Link to='/register'>Start for Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
