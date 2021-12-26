import NavigationBar from 'components/NavigationBar/NavigationBar';

import Share from 'assets/icons/Account/Share.svg';
import Settings from 'assets/icons/Account/Settings.svg';
import BulletList from 'assets/icons/BulletList.svg';
import RowItem from 'components/RowItem';
const Coursework = () => {
  const svgConfig = {
    fill: '#a3a3a3',
    height: '28px',
    width: '28px'
  };
  const options = [
    {
      icon: <Settings {...svgConfig} />,
      title: 'My Courses',
      //   description: 'Manage your account settings',
      link: '/coursework/courses'
    },
    {
      icon: <Share {...svgConfig} />,
      title: 'My Faculty',
      //   description: 'Invite your friends to collaborate',
      link: '/coursework/faculty'
    },
    {
      icon: <Settings {...svgConfig} />,
      title: 'My Grades',
      //   description: 'Manage your coursework settings',
      link: '/coursework/grades'
    },
    {
      icon: <Share {...svgConfig} />,
      title: 'Weekly Timetable',
      link: '/coursework/weekly-timetable'
    },
    {
      icon: <BulletList {...svgConfig} />,
      title: 'Consolidated Syllabus',
      description: 'Syllabus of all your subjects, in one place',
      link: '/coursework/syllabus'
    },
    {
      icon: <Settings {...svgConfig} />,
      title: 'Attendance Estimate',
      description: 'How many classes can you safely miss?',
      link: '/coursework/attendance-estimate'
    },
    {
      icon: <Share {...svgConfig} />,
      title: 'Examination Result',
      description: 'Check the latest results',
      link: '/coursework/latest-results'
    }
  ];

  return (
    <div className='flex flex-col h-screen'>
      <header className='p-4 sm:p-8'>
        <h4 className='text-3xl font-medium font-heading '>My Coursework</h4>
        <p className='text-gray-400 text-md'>B.Tech CSE</p>
      </header>
      <main className='flex-1 p-4 pt-0 sm:px-8'>
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
  );
};

export default Coursework;
