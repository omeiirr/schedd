import ComingSoonIllustration from '../assets/images/coming_soon.svg';
import { useRouter } from 'next/router';
const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center p-8 '>
      <p className='text-4xl text-center '>
        Oops! <br /> Page not found
      </p>
      <ComingSoonIllustration className='mt-16' />
      <button
        className='max-w-xs px-4 py-2 text-white rounded-lg shadow-lg bg-primary-500 mt-14 shadow-primary-400'
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
