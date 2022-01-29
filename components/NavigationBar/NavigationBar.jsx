import Home from 'assets/icons/MobileBar/Home.svg';
import School from 'assets/icons/MobileBar/School.svg';
import Person from 'assets/icons/MobileBar/Person.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

const svgConfig = {
  height: '28px',
  width: '28px',
  fill: '#fff',
  stroke: '#000'
};

const options = [
  {
    logo: <Home {...svgConfig} />,
    activeLogo: <Home {...svgConfig} className='stroke-primary-600 fill-primary-600' />,
    text: 'Home',
    link: '/home'
  },
  {
    logo: <School {...svgConfig} />,
    activeLogo: <School {...svgConfig} className='fill-primary-600 stroke-primary-600' />,
    text: 'Coursework',
    link: '/coursework'
  },
  {
    logo: (
      <img
        src={localStorage.getItem('avatarUrl')}
        alt='avatar'
        width={28}
        height={28}
        className='bg-primary-100 rounded-full shadow-md'
      />
    ),
    activeLogo: (
      <img
        src={localStorage.getItem('avatarUrl')}
        alt='avatar'
        width={28}
        height={28}
        className='bg-primary-100 rounded-full shadow-md'
      />
    ),
    // logo: <Person {...svgConfig} />,
    // activeLogo: <Person {...svgConfig} className='fill-primary-600 stroke-primary-600' />,
    text: 'Account',
    link: '/account'
  }
];

const NavigationBar = () => {
  const router = useRouter();
  return (
    <div className='sticky bottom-0 w-full max-w-screen-sm py-1 bg-white shadow-above'>
      <div className='flex items-center justify-around gap-2'>
        {options.map((item, idx) => {
          return (
            <Link href={item.link} key={idx} passHref>
              <div className='flex flex-col items-center flex-1 pt-1 pb-1 border-r-2 cursor-pointer border-gray-300-500'>
                {router.pathname.includes(item.link) ? (
                  <>
                    <p> {item.activeLogo} </p>
                    <p className='text-sm font-semibold text-primary-600 '> {item.text} </p>
                  </>
                ) : (
                  <>
                    <p> {item.logo} </p>
                    <p className='text-sm font-normal'> {item.text} </p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
