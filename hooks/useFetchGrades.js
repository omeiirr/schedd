import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = () => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/grades`, {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setError(null);
          setLoading(false);
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

          for (let i = 1; i < tempGradesArray.length; ++i) {
            let tempSgpaChange =
              ((parseFloat(tempGradesArray[i].sgpa) - parseFloat(tempGradesArray[i - 1].sgpa)) /
                parseFloat(tempGradesArray[i - 1].sgpa)) *
              100;

            tempGradesArray[i].sgpaChange = parseFloat(tempSgpaChange).toFixed(2);
          }

          for (let i = 2; i < tempGradesArray.length; ++i) {
            let tempCgpaChange =
              ((parseFloat(tempGradesArray[i].cgpa) - parseFloat(tempGradesArray[i - 1].cgpa)) /
                parseFloat(tempGradesArray[i - 1].cgpa)) *
              100;

            tempGradesArray[i].cgpaChange = parseFloat(tempCgpaChange).toFixed(2);
          }
          setGrades(tempGradesArray);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  return [grades, loading, error];
};

export default useFetchGrades;
