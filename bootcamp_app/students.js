const { Pool } = require('pg');

const cohort = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohort}%`, limit]; // Define the parameterized values array.

const pool = new Pool ({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'bootcampx',
});

pool
  .query(
    `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values) // Pass the values array here.
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`
      );
    });
  }).catch(err => console.error(`query error`, err.stack));