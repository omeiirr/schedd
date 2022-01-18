const getAttendanceInsights = (attendedClasses, totalClasses) => {
  let attendanceInsights = {
    currentAttendance: (attendedClasses / totalClasses) * 100,
    potentialIncrease: ((attendedClasses + 1) / (totalClasses + 1)) * 100,
    potentialDecrease: (attendedClasses / (totalClasses + 1)) * 100
  };

  return attendanceInsights;
};

export default getAttendanceInsights;
