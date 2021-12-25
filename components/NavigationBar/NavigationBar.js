import BulletList from '../../assets/icons/BulletList.svg';
import Home from '../../assets/icons/MobileBar/Home.svg';
import School from '../../assets/icons/MobileBar/School.svg';
import Person from '../../assets/icons/MobileBar/Person.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

const svgConfig = {
  height: '30px',
  width: '30px'
};

const options = [
  {
    logo: <Home {...svgConfig} />,
    activeLogo: <Home />,
    text: 'Home',
    link: '/'
  },
  {
    logo: <School {...svgConfig} />,
    activeLogo: <BulletList />,
    text: 'Toolbar',
    link: '/toolbar'
  },
  {
    logo: <Person {...svgConfig} />,
    activeLogo: '😉',
    text: 'Account',
    link: '/account'
  }
];
const NavigationBar = () => {
  return (
    <div className='sticky bottom-0 left-0 right-0 w-full max-w-screen-sm py-2 bg-white shadow-above'>
      <div className='flex items-center justify-around gap-2'>
        {options.map((item, idx) => {
          return (
            <Link href={item.link} key={idx}>
              <div className='flex flex-col items-center flex-1 pt-1 pb-1 border-r-2 cursor-pointer border-gray-300-500'>
                <p> {item.logo} </p>
                <p> {item.text} </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
