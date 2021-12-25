import ComingSoonIllustration from '../assets/images/coming_soon.svg';
import Link from 'next/link';
const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center p-32'>
      <p className='text-4xl '>Page not found</p>
      <ComingSoonIllustration className='mt-16' />
      <Link href='account'>
        <button className='max-w-xs px-4 py-2 bg-purple-500 rounded-lg shadow-lg mt-14 shadow-purple-400'>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
