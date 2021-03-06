import { useLayoutEffect, useState } from 'react';
import Head from 'next/head';

// Icons
import Settings from 'assets/icons/Account/Settings.svg';
import Share from 'assets/icons/Account/Share.svg';
import Git from 'assets/icons/Account/Git.svg';
import Heart from 'assets/icons/Account/Heart.svg';
import Info from 'assets/icons/Account/Info.svg';
import Email from 'assets/icons/Account/Email.svg';
import Bug from 'assets/icons/Account/Bug.svg';
import InstallMobile from 'assets/icons/Account/InstallMobile.svg';
import Logout from 'assets/icons/Account/Logout.svg';

// Components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import RowItem from 'components/RowItem';

// Libraries
import axios from 'axios';

// Functions
import shareLink from 'functions/shareLink';
import handleLogout from 'functions/handleLogout';
import useDetectPWA from 'hooks/useDetectPWA';

const svgConfig = {
  fill: '#a3a3a3',
  height: '28px',
  width: '28px'
};

const Account = () => {
  const [appVersion, setAppVersion] = useState('');
  const [isPwaInstalled] = useDetectPWA();

  useLayoutEffect(() => {
    // setAppVersion('0.1.0');
    axios
      .get(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/repos/omeiirr/schedd/releases/latest`)

      .then((res) => {
        if (res.status === 200) {
          setAppVersion(res.data.name);
        }
      })
      .catch((err) => console.log(err.response));
  }, []);

  const options = [
    {
      icon: <Settings {...svgConfig} />,
      title: 'Settings',
      description: 'Manage your account settings',
      link: '/account/settings'
    },
    {
      icon: <Share {...svgConfig} />,
      title: 'Share with friends',
      description: 'Invite your friends to collaborate',
      handleClick: () => shareLink()
    },
    {
      icon: <Git {...svgConfig} />,
      title: 'Contribute',
      description: 'Interested to help? Check out our guide',
      link: '/account/contribute'
    },
    // {
    //   icon: <Heart {...svgConfig} />,
    //   title: 'Sponsor',
    //   tags: [{ content: 'Coming soon', colortheme: 'yellow' }],
    //   description: 'Loving the app? Show some support!',
    //   link: '/account/sponsor'
    // },
    {
      icon: <Info {...svgConfig} />,
      title: 'About',
      description: 'Motivation, stuff in works, and future plans',
      link: '/account/about',
      tags: [{ content: 'Coming soon', colortheme: 'yellow' }]
    },
    {
      icon: <Email {...svgConfig} />,
      title: 'Contact',
      description: 'Send us your questions or suggestions',
      link: '/account/contact',
      tags: [{ content: 'Coming soon', colortheme: 'yellow' }]
    },
    // {
    //   icon: <Bug {...svgConfig} />,
    //   title: 'Report a bug',
    //   description: 'Help us improve your experience',
    //   link: '/account/report'
    // },
    {
      icon: <InstallMobile {...svgConfig} />,
      title: 'Install PWA',
      description:
        isPwaInstalled === false
          ? 'What is a Progressive Web Application?'
          : 'PWA is already installed',
      link: '/account/pwa',
      tags: [{ content: 'New', colortheme: 'green' }]
    },
    {
      icon: <Logout {...svgConfig} />,
      title: 'Logout',
      description: 'This action will erase all app data ',
      handleClick: () => handleLogout()
    }
  ];

  return (
    <>
      <Head>
        <title>Account - Schedd</title>
      </Head>
      <div className='h-screen'>
        <header className='p-4 sm:p-8'>
          <h4 className='text-3xl font-medium font-heading '>My Account</h4>
          {/* <p className='text-gray-400 text-md'>B.Tech CSE</p> */}
        </header>
        <main className='min-h-screen p-4 pt-0 sm:px-8'>
          {options.map((item, idx) => {
            return (
              <RowItem
                key={idx}
                icon={item.icon}
                title={item.title}
                tags={item.tags}
                description={item.description}
                link={item.link}
                handleClick={item.handleClick}
              />
            );
          })}

          <div className='flex justify-between mt-6'>
            <span>App version: {appVersion}</span>
            <span>
              Made by
              <a
                href='https://twitter.com/omeiirr'
                target='_blank'
                rel='noreferrer'
                className='pl-1 external-link'
              >
                Omeir {''}
              </a>
            </span>
          </div>
        </main>
        <NavigationBar />
      </div>
    </>
  );
};

export default Account;
