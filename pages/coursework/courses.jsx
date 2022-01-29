import { useState } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import useFetchCourses from 'hooks/useFetchCourses';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import parseHTMLEntities from 'functions/parseHTMLEntities';
ChartJS.register(ArcElement, Tooltip, Legend);

const attendanceTierColors = [
  {
    tier: 'Below 75%',
    color: '#fca5a5'
  },
  {
    tier: '75 - 80%',
    color: '#fdba74'
  },
  {
    tier: '80 - 85%',
    color: '#fef08a'
  },
  {
    tier: '85 - 90%',
    color: '#fde047'
  },
  {
    tier: '90 - 95%',
    color: '#bef264'
  },
  {
    tier: 'Above 95%',
    color: '#86efac'
  },
  {
    tier: 'Not available',
    color: '#d1d5db'
  }
]; // increaing order of percentage (red to green)

const Courses = () => {
  const [courses, loading, error] = useFetchCourses();

  return (
    <>
      <Head>
        <title>My Courses - Schedd</title>
      </Head>
      <div>
        <Header title='My Courses' />
        <main className='p-4 '>
          <div className='flex items-center gap-2 pb-2 mb-6 overflow-x-auto whitespace-nowrap'>
            {attendanceTierColors.map((color, idx) => {
              return (
                <div
                  key={idx}
                  className='px-2 py-1 text-xs font-semibold rounded-xl'
                  style={{ backgroundColor: color.color, width: 'fit-content' }}
                >
                  {color.tier}
                </div>
              );
            })}
          </div>

          {error && <p>Unable to fetch data. Please try again later.</p>}

          {loading && (
            <p className='grid h-32 animate-pulse bg-slate-200 rounded-xl place-items-center '>
              Loading. . .
            </p>
          )}
          {!loading &&
            !error &&
            courses &&
            courses.length > 0 &&
            courses.map((course, idx) => {
              return <CourseCard key={idx} course={course} />;
            })}
        </main>
      </div>
    </>
  );
};

const CourseCard = ({ course }) => {
  const doughnutChartData = {
    // labels: ['Attended', 'Missed'],
    datasets: [
      {
        // label: 'Attendance',
        data: [course.attendance.attended, course.attendance.unattended],
        // backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        // backgroundColor: ['#16a34a', '#ef4444'],
        backgroundColor: ['#0ea5e9', '#f472b6'],

        borderWidth: 0,
        radius: '100%',
        spacing: 1,
        borderJoinStyle: 'bevel',
        borderAlign: 'inner',
        cutout: '50%',
        circumference: 180,
        rotation: 270
        // borderWidth: 1
      }
    ]
  };

  const [whitespaceBreak, setWhitespaceBreak] = useState(false);
  return (
    <div
      className='flex items-center justify-start w-full h-32 gap-4 px-4 mb-4 text-sm rounded-lg shadow-lg bg-primary-200'
      style={{
        backgroundColor: determineAttendanceTierColor(
          calculateAttendancePercentage(course.attendance.attended, course.attendance.total)
        )
      }}
    >
      <div className='min-w-0'>
        <p className='font-semibold'>{course.code}</p>
        <h4
          className='overflow-hidden text-xl text-ellipsis'
          style={{ whiteSpace: whitespaceBreak ? 'break-spaces' : 'nowrap' }}
          onClick={() => setWhitespaceBreak(!whitespaceBreak)}
        >
          {parseHTMLEntities(course.name)}
        </h4>
        <p>{course.type}</p>
      </div>
      {course.attendance.attended && (
        <div className='flex flex-col items-center justify-center w-24 pb-4 ml-auto'>
          <Doughnut data={doughnutChartData} />
          <p className='mt-[-0.6rem]'>
            {course.attendance.attended} / {course.attendance.total}{' '}
            <span className='font-semibold'>
              ({calculateAttendancePercentage(course.attendance.attended, course.attendance.total)}
              %)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const calculateAttendancePercentage = (attended, total) => {
  const percent = (attended * 100) / total;
  return parseFloat(percent).toFixed(0);
};

const determineAttendanceTierColor = (percentage) => {
  switch (true) {
    case percentage < 75:
      return attendanceTierColors[0].color;
    case percentage >= 75 && percentage < 80:
      return attendanceTierColors[1].color;
    case percentage >= 80 && percentage < 85:
      return attendanceTierColors[2].color;
    case percentage >= 85 && percentage < 90:
      return attendanceTierColors[3].color;
    case percentage >= 90 && percentage < 95:
      return attendanceTierColors[4].color;
    case percentage >= 95:
      return attendanceTierColors[5].color;

    default:
      return attendanceTierColors[6].color;
  }
};
export default Courses;
