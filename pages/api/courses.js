let dummyCourses = [
  {
    code: 'CSE424',
    name: 'Cloud Computing',
    type: 'Elective',
    attendance: {
      attended: 17,
      total: 17,
      unattended: 0,
      percent: 100
    }
  },
  {
    code: 'CSE425',
    name: 'Operating Systems',
    type: 'Compulsory',
    attendance: {
      attended: 22,
      total: 23,
      unattended: 1,
      percent: 95
    }
  },
  {
    code: 'CSE426',
    name: 'Algorithms',
    type: 'Compulsory',
    attendance: {
      attended: 20,
      total: 21,
      unattended: 1,
      percent: 95
    }
  },
  {
    code: 'CSE427',
    name: 'Computer Networks',
    type: 'Compulsory',
    attendance: {
      attended: 24,
      total: 24,
      unattended: 0,
      percent: 100
    }
  },
  {
    code: 'CSE428',
    name: 'Object-Oriented Programming',
    type: 'Compulsory',
    attendance: {
      attended: 22,
      total: 24,
      unattended: 2,
      percent: 91
    }
  }
];

export default function handler(req, res) {
  res.status(200).json(dummyCourses);
}
