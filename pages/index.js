import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

// Icons
import LogoWithText from 'public/LogoWithText.svg';
import Twitter from 'assets/icons/LandingPage/Twitter.svg';
import GitHub from 'assets/icons/LandingPage/GitHub.svg';
import Speed from 'assets/icons/LandingPage/Speed.svg';
import Sync from 'assets/icons/LandingPage/Sync.svg';
import Privacy from 'assets/icons/LandingPage/Privacy.svg';
import Notification from 'assets/icons/LandingPage/Notification.svg';
import Offline from 'assets/icons/LandingPage/Offline.svg';
import Tool from 'assets/icons/LandingPage/Tool.svg';
import LinkedIn from 'assets/icons/LandingPage/LinkedIn.svg';
import Mail from 'assets/icons/LandingPage/Mail.svg';
// import Globe from 'assets/icons/LandingPage/Globe.svg';

import ReactGA from 'react-ga4';

export default function Home() {
  const [headerShadow, setHeaderShadow] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const featuresSvgConfig = {
    xmlns: 'http://www.w3.org/2000/svg',
    className: 'w-8 h-8 ',
    strokeWidth: '0',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  const featuresList = [
    {
      icon: <Speed {...featuresSvgConfig} />,
      title: 'Speed',
      desc: 'Schedd fetches your daily schedule before time. No more waiting for Amizone to load during peak traffic.'
    },

    {
      icon: <Notification {...featuresSvgConfig} />,
      title: 'Notifications',
      desc: 'Get notified of your next lecture 5 minutes earlier, or if you have been marked absent in a lecture.'
    },
    {
      icon: <Sync {...featuresSvgConfig} />,
      title: 'Persistent Logins',
      desc: 'Once logged in, credentials are stored on your device to fetch data on consequent requests. No more logging in every time.'
    },
    {
      icon: <Tool {...featuresSvgConfig} />,
      title: 'Suite of Tools',
      desc: 'Check the potential increase/decrease in attendance if you attend/miss the next lecture, plus other tools.'
    },
    {
      icon: <Offline {...featuresSvgConfig} />,
      title: 'Offline Support',
      desc: 'Schedd works offline as well.'
    },
    {
      icon: <Privacy {...featuresSvgConfig} />,
      title: 'Privacy',
      desc: 'All your personal data is stored on your device.'
    }
  ];

  const socialLinks = [
    {
      link: 'https://twitter.com/omeiirr',
      icon: <Twitter width={24} height={24} />,
      handleClick: () =>
        ReactGA.event('landing__twitterHandle', {
          event_category: 'USER'
        })
    },
    {
      link: 'https://github.com/omeiirr',
      icon: <GitHub width={24} height={24} />,
      handleClick: () =>
        ReactGA.event('landing__githubHandle', {
          event_category: 'USER'
        })
    },
    {
      link: 'https://linkedin.com/in/omeir-fawaz',
      icon: <LinkedIn width={24} height={24} />,
      handleClick: () =>
        ReactGA.event('landing__linkedinHandle', {
          event_category: 'USER'
        })
    },
    {
      link: 'mailto:omeirf.02@gmail.com',
      icon: <Mail width={24} height={24} />,
      handleClick: () =>
        ReactGA.event('landing__emailHandle', {
          event_category: 'USER'
        })
    }
    // {
    //   link: 'https://omeiirr.github.io/Portfolio',
    //   icon: <Globe width={24} height={24} />,
    //   handleClick: () =>
    //     ReactGA.event('landing__portfolioHandle', {
    //       event_category: 'USER'
    //     })
    // }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) setHeaderShadow(true);
      else setHeaderShadow(false);
      if (window.scrollY > 270) setShowCTA(true);
      else setShowCTA(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Schedd</title>
      </Head>
      <header
        className={`sticky top-0 z-10 flex items-center justify-between w-full px-4 py-6  mb-6 bg-white transition  duration-300 h-16 sm:px-8 ${
          headerShadow ? 'shadow-md' : ''
        }`}
      >
        <LogoWithText
          className='cursor-pointer fill-primary-600'
          width={100}
          onClick={() => {
            document.documentElement.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            ReactGA.event('landing__logoClick', {
              event_category: 'USER'
            });
          }}
        />
        <div
          className={`
          flex items-center justify-between max-w-sm gap-4 transition-all duration-200 
          ${!showCTA ? 'opacity-0' : 'opacity-100'} 
          `}
        >
          <Link href='/login' passHref>
            <button
              className='flex items-center w-full px-3 py-2 text-center text-white transition-all duration-200 rounded-md bg-primary-600 sm:mb-0 hover:bg-primary-700 '
              disabled={!showCTA}
              onClick={() => {
                ReactGA.event('landing__loginWithAmizone', {
                  event_category: 'USER'
                });
              }}
            >
              Login with Amizone
            </button>
          </Link>
        </div>
      </header>
      <div className='px-4 py-8 pt-0 bg-white sm:px-8'>
        <section>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
            <span className='block'>Amizone, </span>
            <span className='text-primary-600 xl:inline'>made easier</span>
          </h1>
          <p className='mx-auto mt-4 text-base text-gray-500'>
            Navigate classes, get attendance-related notifications, offline support, <br />
            and much more.
          </p>

          <div className='flex items-center justify-between max-w-sm gap-4 mt-6 '>
            <Link href='/login' passHref>
              <button
                className='flex items-center w-full px-6 py-3 text-gray-500 transition-all duration-200 bg-gray-100 rounded-md shadow-below hover:bg-gray-200 hover:text-gray-600'
                onClick={() => {
                  ReactGA.event('landing__tryDemo', {
                    event_category: 'USER'
                  });
                }}
              >
                Try a Demo
              </button>
            </Link>
            <Link href='/login' passHref>
              <button
                className='flex items-center w-full px-6 py-3 text-center text-white transition-all duration-200 rounded-md shadow-below bg-primary-600 shadow-primary-600 sm:mb-0 hover:bg-primary-700'
                onClick={() => {
                  ReactGA.event('landing__getStarted', {
                    event_category: 'USER'
                  });
                }}
              >
                Get Started
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 ml-1 '
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='5' y1='12' x2='19' y2='12'></line>
                  <polyline points='12 5 19 12 12 19'></polyline>
                </svg>
              </button>
            </Link>
          </div>
        </section>
      </div>
      <div className='w-full '>
        <div className='flex items-center w-full h-auto gap-4 px-4 pb-6 mt-4 overflow-hidden overflow-x-scroll '>
          <img
            src='https://pbs.twimg.com/media/FIDK3gIUUAA650x?format=jpg&name=medium'
            className='border-2 shadow-below h-96 rounded-2xl w-60'
            alt='demonstration_slide1'
          />
          <img
            src='https://pbs.twimg.com/media/FIDFei7VkAAJh8J?format=jpg&name=medium'
            className='border-2 shadow-below h-96 rounded-2xl w-60'
            alt='demonstration_slide2'
          />
          <img
            src='https://pbs.twimg.com/media/FIDF4kgVEAAZnZ_?format=jpg&name=medium'
            className='border-2 shadow-below h-96 rounded-2xl w-60'
            alt='demonstration_slide3'
          />
        </div>
      </div>

      {/* <!-- Section 2 --> */}
      <section className='px-4 py-8 bg-white sm:px-8'>
        <div className='container max-w-6xl mx-auto'>
          <h2 className='text-4xl font-bold tracking-tight text-center '>Features</h2>
          <p className='mt-2 text-lg text-center text-gray-600'>Why choose Schedd</p>
          <div className='grid grid-cols-4 gap-8 mt-10 lg:grid-cols-12 xl:px-0'>
            {featuresList.map((feature, idx) => (
              <FeatureBox key={idx} icon={feature.icon} title={feature.title} desc={feature.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Section 3 --> */}
      <section className='text-gray-700 bg-white body-font '>
        <div className='container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row'>
          <a href='#_' className='text-xl font-black leading-none text-gray-900 select-none logo'>
            Schedd.
          </a>
          <p className='mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0'>
            © 2022 - Made by Omeir
          </p>
          <span className='inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start'>
            {socialLinks.map((platform, idx) => (
              <a
                key={idx}
                href={platform.link}
                className='text-gray-400 hover:text-gray-500'
                target='_blank'
                rel='noreferrer'
                onClick={platform.handleClick}
              >
                <span className='w-6 h-6'>{platform.icon}</span>
              </a>
            ))}
          </span>
        </div>
      </section>
    </>
  );
}

const FeatureBox = ({ icon, title, desc }) => {
  return (
    <div className='relative flex flex-col items-center justify-start col-span-6 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 shadow-md rounded-xl'>
      <div className='p-3 text-white rounded-full bg-primary-600'>{icon}</div>
      <h4 className='text-xl font-medium text-gray-700'>{title}</h4>
      <p className='text-base text-center text-gray-500'>{desc}</p>
    </div>
  );
};
