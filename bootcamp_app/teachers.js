
const { Client } = require('pg');

const client = new Client({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const teachersName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${teachersName}%`, limit];


// SELECT count(assistance_requests.*) as total_assistances, teachers.name
// FROM assistance_requests
// JOIN teachers ON teachers.id = teacher_id
// WHERE name = 'Waylon Boehm'
// GROUP BY teachers.name;

client.connect();

client.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the  ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));

setTimeout(() => {client.end()},3000);
