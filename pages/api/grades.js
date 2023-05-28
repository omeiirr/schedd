let dummyGrades = [
  {
    backPapers: '0',
    cgpa: '',
    semester: '1',
    sgpa: '8.22'
  },
  {
    backPapers: '0',
    cgpa: '8.17',
    semester: '2',
    sgpa: '8.13'
  },
  {
    backPapers: '0',
    cgpa: '8.32',
    semester: '3',
    sgpa: '8.58'
  },
  {
    backPapers: '0',
    cgpa: '8.41',
    semester: '4',
    sgpa: '8.67'
  },
  {
    backPapers: '0',
    cgpa: '8.50',
    semester: '5',
    sgpa: '8.8'
  }
];

export default function handler(req, res) {
  res.status(200).json(dummyGrades);
}
