import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`, {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setError(null);
          setLoading(false);
        }

        let tempCoursesArr = [];
        res.data.map((course) => {
          let tempCourseObj = {
            code: course.code,
            name: course.name,
            type: course.type,
            attendance: {
              total: course.attendance.total,
              attended: course.attendance.attended,
              unattended: course.attendance.unattended,
              percent: course.attendance.percent
            }
          };
          tempCoursesArr.push(tempCourseObj);
        });
        setCourses(tempCoursesArr);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };
  return [courses, loading, error];
};

export default useFetchCourses;
