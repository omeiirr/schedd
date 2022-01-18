import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import LectureCard from 'components/LectureCard';
import Refresh from '/assets/icons/Home/Refresh.svg';
import { ChakraProvider, Skeleton } from '@chakra-ui/react';

// Functions
import getAttendanceStatus from 'functions/Home/getAttendanceStatus';
import getAttendanceInsights from 'functions/Home/getAttendanceInsights';

// Libraries
import axios from 'axios';
import ReactGA from 'react-ga4';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Home = () => {
  const [lectures, setLectures] = useState([{}, {}, {}, {}, {}, {}]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scheduleUpdatedAt, setScheduleUpdatedAt] = useState(new Date());
  const [timeLapsed, setTimeLapsed] = useState(null);

  const fetchDailySchedule = () => {
    setIsLoaded(false);

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/today`, {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      })

      .then((res) => {
        // console.log(res.data);

        let tempLecturesArray = [];

        res.data.map((lecture, idx) => {
          let tempLectureObj = {
            attendanceStatus: getAttendanceStatus(lecture.attendanceColor),
            lectureName: lecture.courseTitle,
            from: lecture.start,
            to: lecture.end,
            room: lecture.roomNumber,
            currentAttendance: getAttendanceInsights(
              lecture.attendance.attended,
              lecture.attendance.total
            )['currentAttendance'],
            posImpact: getAttendanceInsights(lecture.attendance.attended, lecture.attendance.total)[
              'potentialIncrease'
            ],
            negImpact: getAttendanceInsights(lecture.attendance.attended, lecture.attendance.total)[
              'potentialDecrease'
            ]
          };
          tempLecturesArray.push(tempLectureObj);
        });
        setLectures(tempLecturesArray);
        setIsLoaded(true);
        setScheduleUpdatedAt(new Date());
      })

      .catch((err) => console.log(err));

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

  useEffect(() => {
    setTimeLapsed(dayjs(scheduleUpdatedAt).fromNow());
  }, [scheduleUpdatedAt]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLapsed(dayjs(scheduleUpdatedAt).fromNow());

      console.log('interval');
    }, 1000 * 60); // every minute
    return () => clearInterval(timer);
  });

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
              <p className='text-sm'>Updated {timeLapsed}</p>
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
