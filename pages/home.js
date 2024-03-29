import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
  const [errorMsg, setErrorMsg] = useState(null);

  const [scheduleUpdatedAt, setScheduleUpdatedAt] = useState(new Date());
  const [timeLapsed, setTimeLapsed] = useState(null);

  const router = useRouter();

  const fetchDailySchedule = () => {
    setLectures([{}, {}, {}, {}, {}, {}]);
    setIsLoaded(false);
    setErrorMsg(null);
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/today`, {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      })

      .then((res) => {
        // console.log(res.data);
        setErrorMsg(null);
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

      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
        setErrorMsg('Unable to fetch data. Please try again later.');
      });

    ReactGA.event('fetch_daily_schedule', {
      event_category: 'USER'
      // event_label: "name",
    });
  };
  useEffect(() => {
    if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
      router.push('/login');
    }
    fetchDailySchedule();
  }, []);

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
      <div>
        <header className='p-4 sm:p-8'>
          <p className='text-lg text-gray-600'>Hey there 👋</p>
          <h4 className='text-2xl font-medium font-heading '>
            {dayjs(new Date()).format('ddd, D MMM')}
          </h4>
        </header>
        <main className='min-h-screen p-4 pt-0 sm:px-8 '>
          <div className='flex items-center justify-between mt-4 mb-2'>
            <h4 className='text-2xl font-medium font-heading '>Schedule</h4>

            <div className='flex items-center gap-1'>
              <p className='text-sm'>Updated {timeLapsed}</p>
              <Refresh
                {...svgConfig}
                onClick={() => {
                  // don't allow to fire function if previous request is not finished
                  if (isLoaded) {
                    setIsLoaded(false);
                    fetchDailySchedule();
                    ReactGA.event('refresh_daily_schedule', {
                      event_category: 'USER'
                      // event_label: "name",
                    });
                  }
                }}
                className='cursor-pointer'
              />
            </div>
          </div>
          {errorMsg && <p>{errorMsg} </p>}
          {lectures.length <= 0 && <p>Yay! You have no classes today</p>}
          {!errorMsg &&
            lectures.length > 0 &&
            lectures.map((lecture, idx) => {
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
