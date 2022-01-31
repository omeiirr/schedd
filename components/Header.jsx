import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BackArrow from 'assets/icons/BackArrow.svg';
const Header = ({ title = 'Go back', goBackTo }) => {
  const router = useRouter();

  const [headerShadow, setHeaderShadow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setHeaderShadow(true);
      else setHeaderShadow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 w-full transition  duration-300 bg-white h-18 
    ${headerShadow ? 'shadow-below' : ''} `}
    >
      <div
        className='flex items-center gap-4 p-4 w-fit'
        onClick={() => {
          if (goBackTo) router.push(goBackTo);
          else router.back();
        }}
      >
        <BackArrow width='28px' height='28px' fill='#000' className='cursor-pointer' />
        <p className='text-lg font-medium cursor-pointer font-heading'>{title} </p>
      </div>
    </header>
  );
};

export default Header;
