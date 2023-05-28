let dummyScheduleToday = [
  {
    attendance: {
      attended: 17,
      total: 17,
      unattended: 0,
      percent: 100
    },
    courseTitle: 'Cloud Computing',
    courseCode: 'CSE424',
    facultyName: 'Prof A',
    start: '9/15/2020 9:15:00 AM',
    end: '9/15/2020 10:10:00 AM',
    roomNumber: 'E3 - 210',
    attendanceColor: '#4fcc4f',
    allDay: false
  },
  {
    attendance: {
      attended: 22,
      total: 23,
      unattended: 1,
      percent: 95
    },
    courseTitle: 'Operating Systems',
    courseCode: 'CSE425',
    facultyName: 'Prof B',
    start: '9/15/2020 10:15:00 AM',
    end: '9/15/2020 11:10:00 AM',
    roomNumber: 'E3 - G10',
    attendanceColor: '#4fcc4f',
    allDay: false
  },
  {
    attendance: {
      attended: 20,
      total: 21,
      unattended: 1,
      percent: 95
    },
    courseTitle: 'Algorithms',
    courseCode: 'CSE426',
    facultyName: 'Prof C',
    start: '9/15/2020 12:15:00 AM',
    end: '9/15/2020 01:10:00 PM',
    roomNumber: 'E3 - G10',
    attendanceColor: '#f00',
    allDay: false
  },
  {
    attendance: {
      attended: 24,
      total: 24,
      unattended: 0,
      percent: 100
    },
    courseTitle: 'Computer Networks',
    courseCode: 'CSE427',
    facultyName: 'Prof D',
    start: '9/15/2020 02:15:00 PM',
    end: '9/15/2020 03:10:00 PM',
    roomNumber: 'E3 - G10',
    attendanceColor: '#3a87ad',
    allDay: false
  },
  {
    attendance: {
      attended: 22,
      total: 24,
      unattended: 2,
      percent: 91
    },
    courseTitle: 'Object-Oriented Programming',
    courseCode: 'CSE428',
    facultyName: 'Prof E',
    start: '9/15/2020 03:15:00 PM',
    end: '9/15/2020 04:10:00 PM',
    roomNumber: 'E3 - 210',
    attendanceColor: '#3a87ad',
    allDay: false
  }
];

export default function handler(req, res) {
  res.status(200).json(dummyScheduleToday);
}
