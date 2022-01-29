// Components
import Head from 'next/head';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import RowItem from 'components/RowItem';

// Icons
import OpenBook from 'assets/icons/Coursework/OpenBook.svg';
import Groups from 'assets/icons/Coursework/Groups.svg';
import Board from 'assets/icons/Coursework/Grades.svg';
import Calendar from 'assets/icons/Coursework/CalendarToday.svg';
import ReceiptLong from 'assets/icons/Coursework/ReceiptLong.svg';
import Hand from 'assets/icons/Coursework/BackHand.svg';
import Grading from 'assets/icons/Coursework/Grading.svg';

const Coursework = () => {
  const svgConfig = {
    fill: '#a3a3a3',
    height: '28px',
    width: '28px'
  };
  const options = [
    {
      icon: <OpenBook {...svgConfig} />,
      title: 'My Courses',
      link: '/coursework/courses'
    },
    {
      icon: <Groups {...svgConfig} />,
      title: 'My Faculty',
      link: '/coursework/faculty'
    },
    {
      icon: <Board {...svgConfig} />,
      title: 'My Grades',
      link: '/coursework/grades',
      tags: [{ content: 'New', colortheme: 'green' }]
    },
    {
      icon: <Calendar {...svgConfig} />,
      title: 'Weekly Timetable',
      link: '/coursework/weekly-timetable',
      tags: [{ content: 'Coming soon', colortheme: 'yellow' }]
    },
    {
      icon: <ReceiptLong {...svgConfig} />,
      title: 'Consolidated Syllabus',
      description: 'Syllabus of all your subjects, in one place',
      link: '/coursework/syllabus',
      tags: [{ content: 'Coming soon', colortheme: 'yellow' }]
    },
    {
      icon: <Hand {...svgConfig} />,
      title: 'Attendance Estimate',
      description: 'How many classes can you safely miss?',
      tags: [{ content: 'Coming soon', colortheme: 'yellow' }],
      link: '/coursework/attendance-estimate'
    }
    // {
    //   icon: <Grading {...svgConfig} />,
    //   title: 'Examination Result',
    //   description: 'Check the latest results',
    //   link: '/coursework/latest-results'
    // }
  ];

  return (
    <>
      <Head>
        <title>Coursework - Schedd</title>
      </Head>
      <div className='flex flex-col h-screen'>
        <header className='p-4 sm:p-8'>
          <h4 className='text-3xl font-medium font-heading '>My Coursework</h4>
          {/* <p className='text-gray-400 text-md'>B.Tech CSE</p> */}
        </header>
        <main className='flex-1 p-4 pt-0 sm:px-8 min-h-screen '>
          {options.map((item, idx) => {
            //   console.log(item);
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
        </main>
        <NavigationBar />
      </div>
    </>
  );
};

export default Coursework;
