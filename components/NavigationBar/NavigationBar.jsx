import Home from 'assets/icons/MobileBar/Home.svg';
import School from 'assets/icons/MobileBar/School.svg';
import Person from 'assets/icons/MobileBar/Person.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

const svgConfig = {
  height: '30px',
  width: '30px',
  fill: 'transparent',
  stroke: '#000'
};

const options = [
  {
    logo: <Home {...svgConfig} />,
    activeLogo: <Home {...svgConfig} fill='#000' />,
    text: 'Home',
    link: '/home'
  },
  {
    logo: <School {...svgConfig} />,
    activeLogo: <School {...svgConfig} fill='#000' />,
    text: 'Coursework',
    link: '/coursework'
  },
  {
    logo: <Person {...svgConfig} />,
    activeLogo: <Person {...svgConfig} fill='#000' />,
    text: 'Account',
    link: '/account'
  }
];

const NavigationBar = () => {
  const router = useRouter();
  return (
    <div className='sticky bottom-0 w-full max-w-screen-sm py-2 bg-white shadow-above'>
      <div className='flex items-center justify-around gap-2'>
        {options.map((item, idx) => {
          return (
            <Link href={item.link} key={idx}>
              <div className='flex flex-col items-center flex-1 pt-1 pb-1 border-r-2 cursor-pointer border-gray-300-500'>
                {router.pathname.includes(item.link) ? (
                  <>
                    <p> {item.activeLogo} </p>
                    <p className='font-semibold'> {item.text} </p>
                  </>
                ) : (
                  <>
                    <p> {item.logo} </p>
                    <p className='font-normal'> {item.text} </p>
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
