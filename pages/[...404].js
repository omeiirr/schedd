import ComingSoonIllustration from '../assets/images/coming_soon.svg';
import Link from 'next/link';
const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center p-32'>
      <p className='text-4xl '>Page not found</p>
      <ComingSoonIllustration className='mt-16' />
      <Link href='account'>
        <button className='mt-14 bg-purple-500 shadow-lg shadow-purple-400 rounded-lg px-4 py-2 max-w-xs'>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
