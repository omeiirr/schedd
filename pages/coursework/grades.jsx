import { useState, useEffect } from 'react';
import Head from 'next/head';

// Components
import Header from 'components/Header';

// Libraries
import axios from 'axios';
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
  const [grades, setGrades] = useState();
  const [chartData, setChartData] = useState({});

  const fetchGrades = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/grades`, {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let tempGradesArray = [];

          res.data.map((grade) => {
            let tempGradeObj = {
              semester: grade.semester,
              sgpa: grade.sgpa,
              cgpa: grade.cgpa,
              backPapers: grade.backPapers
            };
            tempGradesArray.push(tempGradeObj);
          });

          for (let i = 2; i < tempGradesArray.length; ++i) {
            let tempChange =
              ((parseFloat(tempGradesArray[i].cgpa) - parseFloat(tempGradesArray[i - 1].cgpa)) /
                parseFloat(tempGradesArray[i - 1].cgpa)) *
              100;

            tempGradesArray[i].change = parseFloat(tempChange).toFixed(2);
          }
          setGrades(tempGradesArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    console.log(grades);
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
      <Head>My Grades - Schedd</Head>
      <div>
        <Header title='My Grades' />
        <main className='p-4 '>
          {grades && grades.length > 0 ? (
            <div>
              <Line options={options} data={chartData} />
              <table className='mt-6 bg-sky-600  w-full  rounded-lg shadow-below'>
                <thead
                  className='shadow-black text-center text-xs font-medium text-white uppercase'
                  style={{ letterSpacing: '1px' }}
                >
                  <td className='p-2 py-4'>Sem</td>
                  <td className='p-2 py-4'>SGPA</td>
                  <td className='p-2 py-4'>CGPA</td>
                  <td className='p-2 py-4'>CGPA +/-</td>
                  <td className='p-2 py-4'>Back</td>
                </thead>
                <tbody className='bg-white'>
                  {grades.map((grade, idx) => {
                    return (
                      <tr key={idx} className='text-center text-xs font-medium text-gray-500'>
                        <td className='p-2'>{grade.semester}</td>
                        <td className='p-2 font-bold'>{grade.sgpa}</td>
                        <td className='p-2 font-bold'>{grade.cgpa || '____'}</td>
                        <td
                          className={`p-2 font-bold ${
                            grade.change > 0 ? ' text-green-500' : ' text-red-500'
                          }`}
                        >
                          {(grade.change && grade.change + '%') || (
                            <p className='text-gray-500 '>____</p>
                          )}
                        </td>
                        <td className='p-4 '>{grade.backPapers || 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='h-32 animate-pulse bg-slate-200 rounded-xl grid place-items-center '>
              Loading. . .
            </p>
          )}
        </main>
      </div>
    </>
  );
};

export default Grades;
