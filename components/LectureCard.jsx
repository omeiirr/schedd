import { useState, useEffect } from 'react';

// Icons
import Location from 'assets/icons/Home/Location.svg';
import Clock from 'assets/icons/Home/Clock.svg';
import TrendingUp from 'assets/icons/Home/TrendingUp.svg';
import BarChart from 'assets/icons/Home/BarChart.svg';
import TrendingDown from 'assets/icons/Home/TrendingDown.svg';

// Libraries
import dayjs from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
dayjs.extend(IsBetween);

const LectureCard = ({
  attendanceStatus = 'Unmarked',
  lectureName,
  from,
  to,
  room,
  currentAttendance,
  posImpact,
  negImpact
}) => {
  const svgConfig = {
    // fill: '#000',
    height: '20px',
    width: '20px'
  };

  const colors = {
    Unmarked: {
      bg: 'bg-amber-200',
      border: 'border-amber-400',
      shadow: 'shadow-lg shadow-amber-400/80'
    },
    Present: {
      bg: 'bg-green-200',
      border: 'border-green-500',
      shadow: 'shadow-lg shadow-green-500/80'
    },
    Absent: {
      bg: 'bg-red-200',
      border: 'border-red-400',
      shadow: 'shadow-lg shadow-red-400/80'
    }
  };

  const [isCurrentlyOngoing, setIsCurrentlyOngoing] = useState(false);

  useEffect(() => {
    setIsCurrentlyOngoing(dayjs().isBetween(from, to, null, '[]')); // to customise card according to current time
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsCurrentlyOngoing(dayjs().isBetween(from, to, null, '[]')); // to customise card according to current time
    }, 1000 * 60); // every minute
    return () => clearInterval(timer);
  });

  return (
    <div
      className={`flex justify-between items-center mb-5 rounded-lg p-4 border-l-8 transition-all duration-1000 ${
        colors[attendanceStatus].bg
      }  ${colors[attendanceStatus].border}  ${
        isCurrentlyOngoing && colors[attendanceStatus].shadow
      }`}
    >
      <div className='min-w-0 '>
        <h5
          className={`text-gray-800 font-semibold overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {lectureName}
        </h5>
        <p className={`text-gray-800 flex items-center gap-2 `}>
          <Clock {...svgConfig} />
          {dayjs(from).format('h:mm')} - {dayjs(to).format('h:mm A')}
        </p>
        <p className={` text-gray-800 flex items-center gap-2 `}>
          <Location {...svgConfig} /> {room}
        </p>
      </div>

      {
        <div className='flex flex-col whitespace-nowrap'>
          {(attendanceStatus === 'Unmarked' || attendanceStatus === 'default') && (
            <p className='flex items-center gap-2 text-sm font-semibold text-green-500 '>
              <TrendingUp {...svgConfig} className='fill-green-500' />
              {posImpact === 100 ? 100 : parseFloat(posImpact).toFixed(1)}%
            </p>
          )}
          <p className='flex items-center text-lg font-semibold '>
            <BarChart {...svgConfig} width={24} height={24} />
            <span className='ml-1'>
              {currentAttendance === 100 ? 100 : parseFloat(currentAttendance).toFixed(1)}%
            </span>
          </p>
          {(attendanceStatus === 'Unmarked' || attendanceStatus === 'default') && (
            <p className='flex items-center gap-2 text-sm font-semibold text-red-500'>
              <TrendingDown {...svgConfig} className='fill-red-500' />
              {parseFloat(negImpact).toFixed(1)}%
            </p>
          )}
        </div>
      }
    </div>
  );
};

export default LectureCard;
