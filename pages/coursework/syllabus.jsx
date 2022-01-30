import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/Header';

const Syllabus = () => {
  const DEFAULT_SYLLABUS_LINK =
    'https://drive.google.com/file/d/1AYaZ6MNFPH9HGHcClJqFdSAYFntEJI-E/view?usp=sharing';
  const [syllabusLink, setSyllabusLink] = useState(DEFAULT_SYLLABUS_LINK);

  useEffect(() => {
    const localStorageSyllabusLink = localStorage.getItem('syllabusLink');
    if (localStorageSyllabusLink) setSyllabusLink(localStorageSyllabusLink);
  }, []);

  const updateSyllabusLink = () => {
    localStorage.setItem('syllabusLink', syllabusLink);
  };

  return (
    <>
      <Head>
        <title>Consolidated Syllabus - Schedd</title>
      </Head>
      <div>
        <Header title='Consolidated Syllabus' />
        <main className='p-4 '>
          <div className='flex flex-col '>
            <p className='mb-10 text-sm text-justify'>
              The syllabus below is suitable for B.Tech (CSE) students currently in their 6th
              semester. You can update the link with a syllabus suitable to your subjects.
            </p>
            <a href={syllabusLink} target='_blank' rel='noreferrer'>
              <button
                className='w-full px-4 py-2 mb-10 font-semibold text-center text-white transition-all duration-300 rounded-lg shadow-md bg-primary-500 shadow-primary-500 disabled:shadow-gray-300 disabled:text-gray-400 disabled:bg-gray-200'
                disabled={!syllabusLink}
              >
                Open Syllabus
              </button>
            </a>
            <p className='text-sm'>
              Save link to your own syllabus, or,
              <span
                className='pl-1 underline text-primary-500 decoration-primary-500 decoration-dashed'
                onClick={() => setSyllabusLink(DEFAULT_SYLLABUS_LINK)}
              >
                reset to default
              </span>
            </p>
            <div className='flex items-center gap-4 mt-4'>
              <input
                className='block w-full px-3 py-2 text-gray-700 transition-all duration-500 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-primary-300 '
                onChange={(e) => setSyllabusLink(e.target.value)}
                value={syllabusLink}
              />

              <button
                className='px-4 py-2 text-center min-w-[80px] text-white rounded-lg shadow-md bg-primary-500 shadow-primary-500'
                onClick={updateSyllabusLink}
              >
                Update
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Syllabus;
