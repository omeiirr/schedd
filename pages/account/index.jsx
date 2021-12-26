import { useLayoutEffect, useState } from 'react';

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

const svgConfig = {
  fill: '#a3a3a3',
  height: '28px',
  width: '28px'
};

const Account = () => {
  const [appVersion, setAppVersion] = useState('');
  useLayoutEffect(() => {
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
      link: '/account/share'
    },
    {
      icon: <Git {...svgConfig} />,
      title: 'Contribute',
      description: 'Interested to help? Check out our guide',
      link: '/account/contribute'
    },
    {
      icon: <Heart {...svgConfig} />,
      title: 'Sponsor',
      tags: [{ content: 'Coming soon', colortheme: 'yellow' }],
      description: 'Loving the app? Show some support!',
      link: '/account/sponsor'
    },
    {
      icon: <Info {...svgConfig} />,
      title: 'About',
      description: 'Motivation, stuff in works, and future plans',
      link: '/account/about'
    },
    {
      icon: <Email {...svgConfig} />,
      title: 'Contact',
      description: 'Send us your questions or suggestions',
      link: '/account/contact'
    },
    {
      icon: <Bug {...svgConfig} />,
      title: 'Report a bug',
      description: 'Help us improve your experience',
      link: '/account/report'
    },
    {
      icon: <InstallMobile {...svgConfig} />,
      title: 'Install PWA',
      description: 'What is a Progressive Web Application?',
      link: '/account/report'
    },
    {
      icon: <Logout {...svgConfig} />,
      title: 'Logout',
      description: 'This action will erase all app data ',
      link: '/'
    }
  ];

  return (
    <div className='h-screen'>
      <header className='p-4 sm:p-8'>
        <h4 className='text-3xl font-medium font-heading '>Omeir Fawaz</h4>
        <p className='text-gray-400 text-md'>B.Tech CSE</p>
      </header>
      <main className='p-4 pt-0 sm:px-8'>
        {options.map((item, idx) => {
          return (
            <RowItem
              key={idx}
              icon={item.icon}
              title={item.title}
              tags={item.tags}
              description={item.description}
              link={item.link}
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
              className='pl-1 font-semibold text-blue-600 underline from-blue-50 decoration-dotted decoration-blue-500 of'
            >
              Omeir {''}
            </a>
          </span>
        </div>
      </main>
      <NavigationBar />
    </div>
  );
};

export default Account;
