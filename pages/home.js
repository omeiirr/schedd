import React, { useState, useEffect } from 'react';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import LectureCard from 'components/LectureCard';
import Refresh from '/assets/icons/Home/Refresh.svg';
import { ChakraProvider, Skeleton } from '@chakra-ui/react';
import ReactGA from 'react-ga4';
import Head from 'next/head';

const Home = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchDailySchedule = () => {
    setIsLoaded(false);

    setTimeout(() => {
      setLectures([
        {
          attendanceStatus: 'Present',
          lectureName: 'Discrete Mathematics',
          from: '10:15',
          to: '11:10',
          room: 'E3-G10',
          currentAttendance: '96.8'
        },
        {
          attendanceStatus: 'Absent',
          lectureName: 'Cloud Computing',
          from: '11:15',
          to: '12:10',
          room: 'E3-G10',
          currentAttendance: '92.4'
        },
        {
          attendanceStatus: 'Present',
          lectureName: '[CSE303] Analysis and Design of Algorithms',
          from: '1:10',
          to: '2:15',
          room: 'E3-G10',
          currentAttendance: '89.2'
        },
        {
          lectureName: '[IT404] Operating Systems',
          from: '4:10',
          to: '5:15',
          room: 'E3-G10',
          currentAttendance: '94.9',
          posImpact: '95.3',
          negImpact: '94.1'
        }
      ]);
      setIsLoaded(true);
    }, 500);

    ReactGA.event('fetch_daily_schedule', {
      event_category: 'USER'
      // event_label: "name",
    });
  };
  useEffect(() => {
    fetchDailySchedule();
  }, []);

  const today = new Date().toDateString();
  const day = today.split(' ')[0];
  const month = today.split(' ')[1];
  const date = today.split(' ')[2];

  const dateToDisplay = `${day}, ${date} ${month}`;

  const svgConfig = {
    fill: '#000',
    height: '20px',
    width: '20px'
  };

  return (
    <>
      <Head>
        <title>Home - Schedd</title>
      </Head>
      <div className='h-screen' style={{ boxSizing: 'border-box' }}>
        <header className='p-4 sm:p-8'>
          <p className='text-lg text-gray-600'>Hi Omeir 👋</p>
          <h4 className='text-2xl font-medium font-heading '>{dateToDisplay}</h4>
        </header>
        <main className='h-full p-4 pt-0 sm:px-8 '>
          <div className='flex items-center justify-between mt-4 mb-2'>
            <h4 className='text-2xl font-medium font-heading '>Schedule</h4>

            <div className='flex items-center gap-1'>
              <p className='text-sm'>Updated today, 3:26 PM</p>
              <Refresh
                {...svgConfig}
                onClick={() => {
                  fetchDailySchedule();
                  ReactGA.event('refresh_daily_schedule', {
                    event_category: 'USER'
                    // event_label: "name",
                  });
                }}
                className='cursor-pointer'
              />
            </div>
          </div>
          {lectures.map((lecture, idx) => {
            return (
              <ChakraProvider key={idx}>
                <Skeleton isLoaded={isLoaded} style={{ borderRadius: '0.5rem' }}>
                  <LectureCard {...lecture} />
                </Skeleton>
              </ChakraProvider>
            );
          })}
        </main>
        <NavigationBar />
      </div>
    </>
  );
};

export default Home;
