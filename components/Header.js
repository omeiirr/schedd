import { useRouter } from 'next/router';
import BackArrow from '../assets/icons/BackArrow.svg';
const Header = ({ title = 'Go back' }) => {
  const router = useRouter();
  return (
    <header className='sticky top-0 left-0 right-0 w-full bg-white h-18 shadow-below'>
      <div className='flex items-center gap-4 p-4 w-fit' onClick={() => router.back()}>
        <BackArrow width='28px' height='28px' fill='#000' className='cursor-pointer' />
        <p className='text-lg font-medium cursor-pointer'>{title} </p>
      </div>
    </header>
  );
};

export default Header;
