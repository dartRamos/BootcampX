const { Pool } = require('pg');

const cohort = process.argv[2];
const values = [`%${cohort}%`];

const pool = new Pool ({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'bootcampx',
});

pool.query(`
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;
`, values) // Pass the values array here.
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error("query error", err.stack));