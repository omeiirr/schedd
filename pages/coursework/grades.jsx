import { useState, useEffect } from 'react';
import Head from 'next/head';

// Components
import Header from 'components/Header';

// Functions
import useFetchGrades from 'hooks/useFetchGrades';

// Libraries
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Grades = () => {
  const [grades, loading, error] = useFetchGrades();
  const [chartData, setChartData] = useState({});
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // console.log(grades);
    setChartData({
      labels: grades?.map((grade) => grade.semester),
      datasets: [
        {
          label: 'SGPA',
          data: grades?.map((grade) => grade.sgpa),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'CGPA',
          data: grades?.map((grade) => grade.cgpa),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    });
  }, [grades]);

  const options = {
    responsive: true,
    animation: {
      duration: 500
      //   ease: 'easeInOutCubic'
    },
    scales: {
      x: {
        // min: 10,
        title: {
          //   color: 'red',
          display: true,
          text: 'Semester'
        }
        // stepSize: 0.1,
        // min: 0,
        // suggestedMin: 0,
        // max: 100,
        // suggestedMax: 100
        // min: 10
      },
      y: {
        // min: 0,
        // suggestedMin: 200,
        // max: 10
        // reverse: true,
        // suggestedMax: 100,
        // ticks: {
        //   //   precision: 10,
        //   stepSize: 1,
        //   stepValue: 1,
        //   min: 0,
        //   max: 13
        // },
        // grid: {
        //   display: false,
        //   stepSize: 1
        //   ticks: {
        //     padding: 40
        //   }
        // }
      }
      //   yAxes:[
      //       {
      //           display: true,

      //       }
      //   ]
      //   y: {
      //     title: {
      //       //   color: 'red',
      //       display: true,
      //       text: 'Score'
      //     }
      //   }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'My Grades'
      }
    }
  };

  return (
    <>
      <Head>
        <title>My Grades - Schedd</title>
      </Head>
      <div>
        <Header title='My Grades' />
        <main className='p-4 '>
          {loading && (
            <p className='grid h-32 animate-pulse bg-slate-200 rounded-xl place-items-center '>
              Loading. . .
            </p>
          )}

          {error && <p>Unable to fetch data. Please try again later.</p>}

          {!loading && !error && grades && grades.length > 0 && (
            <div>
              <Line options={options} data={chartData} />
              <table className='mt-6 bg-sky-600  w-full  rounded-lg shadow-below'>
                <thead
                  className='shadow-black text-center text-xs font-medium text-white uppercase'
                  style={{ letterSpacing: '1px' }}
                >
                  <td className='p-2 py-4 pl-4'>Sem</td>
                  <td className='p-2 py-4 text-left '>SGPA</td>
                  <td className='p-2 py-4 text-left'>CGPA</td>
                  <td className='p-2 py-4 pr-4'>Back</td>
                </thead>
                <tbody className='bg-white'>
                  {grades.map((grade, idx) => {
                    return (
                      <tr key={idx} className='text-xs font-medium text-gray-500'>
                        <td className='p-2 text-center'>{grade.semester}</td>
                        <td className='p-2 font-bold text-left'>
                          {grade.sgpa}
                          <span
                            className={`p-2 font-bold ${
                              grade.sgpaChange > 0 ? ' text-green-500' : ' text-red-500'
                            }`}
                          >
                            {grade.sgpaChange > 0 && <span className='pr-1'> &#x25B2;</span>}
                            {grade.sgpaChange < 0 && <span className='pr-1'> &#x25BC;</span>}

                            {grade.sgpaChange && '(' + grade.sgpaChange + '%)'}
                          </span>
                        </td>

                        <td className='p-2 font-bold text-left'>
                          {grade.cgpa || '____'}

                          <span
                            className={`p-2 font-bold ${
                              grade.sgpaChange > 0 ? ' text-green-500' : ' text-red-500'
                            }`}
                          >
                            {grade.cgpaChange > 0 && <span className='pr-1'> &#x25B2;</span>}
                            {grade.cgpaChange < 0 && <span className='pr-1'> &#x25BC;</span>}

                            {grade.cgpaChange && '(' + grade.cgpaChange + '%)'}
                          </span>
                        </td>
                        <td className='p-4 text-center'>{grade.backPapers || 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Grades;
