// Checks the hexadecimal code of attendanceColor and returns text

const getAttendanceStatus = (color) => {
  switch (color.toLowerCase()) {
    case '#3a87ad':
      return 'Unmarked';

    case '#4fcc4f':
      return 'Present';

    case '#f00':
      return 'Absent';

    default:
      return 'Unmarked';
  }
};

export default getAttendanceStatus;
