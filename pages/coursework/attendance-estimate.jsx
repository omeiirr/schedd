import Head from 'next/head';
import Header from 'components/Header';
import { useEffect, useState } from 'react';
import Counter from 'components/Counter';
import Info from 'assets/icons/Account/Info.svg';

const AttendanceEstimate = () => {
  const [credits, setCredits] = useState(0);
  const [classes, setClasses] = useState(0);

  const creditsToClassesMapping = {
    0: 0,
    1: 10,
    2: 15,
    3: 30,
    4: 65,
    5: 75,
    6: 85
  };

  const selectAttendanceTierColor = {
    75: '#fdba74',
    80: '#fef08a',
    85: '#fde047',
    90: '#bef264',
    95: '#86efac'
  };

  useEffect(() => {
    setClasses(creditsToClassesMapping[credits]);
  }, [credits]);

  return (
    <>
      <Head>
        <title>Attendance Estimate - Schedd</title>
      </Head>
      <div>
        <Header title='Attendance Estimate' />
        <main className='p-4'>
          <div className='flex items-center justify-between gap-4'>
            <h4 className=''>Select course credits (1 to 6)</h4>

            <Counter
              value={credits}
              handleIncrement={() => setCredits(credits + 1)}
              handleDecrement={() => setCredits(credits - 1)}
              min={0}
              max={6}
            />
          </div>
          <div className='flex items-center justify-between my-6'>
            <span className='w-2/5 border-b '></span>
            <p className='text-xs text-center text-gray-500 uppercase'>or</p>
            <span className='w-2/5 border-b '></span>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <h4 className=' whitespace-nowrap'>Select total number of classes</h4>
            <input
              type='number'
              min={0}
              max={200}
              className='block w-full max-w-[80px] min-w-0 px-3 py-1  text-gray-700 transition-all duration-500 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-primary-300 '
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
            />
          </div>
          <p
            className={`px-3 py-2 mt-8 text-sm  text-justify rounded-lg shadow-md text-primary-600 flex items-start gap-2 transition-opacity duration-300 bg-primary-100 ${
              classes > 0 ? 'opacity-100' : 'opacity-0'
            } `}
          >
            <span>
              <Info width={20} height={20} className='fill-primary-600' />
            </span>
            The number of classes per credits may vary across subjects and batches. <br /> Provide
            your own estimate for the total number of classes for more accurate results.
          </p>
          <div
            className={`mt-8 transition-opacity duration-500 text-sm ${
              classes > 0 ? 'opacity-100' : 'opacity-0'
            } `}
          >
            <p className='mb-2 text-lg font-semibold'>Estimates</p>
            You can miss a maximum of. . .
            {calculateAttendance(classes).map((tier, idx) => {
              return (
                <p key={idx} className='py-2 '>
                  <span
                    style={{
                      backgroundColor: selectAttendanceTierColor[tier.abovePercentage]
                    }}
                    className='px-3 py-0 rounded-sm '
                  >
                    {tier.missedClasses} classes
                  </span>
                  <span className='mx-2'>for attendance</span>
                  <span
                    style={{
                      backgroundColor: selectAttendanceTierColor[tier.abovePercentage]
                    }}
                    className='px-3 py-0 mx-1 rounded-sm'
                  >
                    above {tier.abovePercentage}%
                  </span>
                </p>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};

const calculateAttendance = (totalClasses) => {
  return [
    {
      abovePercentage: 95,
      missedClasses: totalClasses - Math.ceil(totalClasses * 0.95)
    },
    {
      abovePercentage: 90,
      missedClasses: totalClasses - Math.ceil(totalClasses * 0.9)
    },
    {
      abovePercentage: 85,
      missedClasses: totalClasses - Math.ceil(totalClasses * 0.85)
    },
    {
      abovePercentage: 80,
      missedClasses: totalClasses - Math.ceil(totalClasses * 0.8)
    },
    {
      abovePercentage: 75,
      missedClasses: totalClasses - Math.ceil(totalClasses * 0.75)
    }
  ];
};

export default AttendanceEstimate;
