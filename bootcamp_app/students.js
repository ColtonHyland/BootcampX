const { Client } = require('pg');

const client = new Client({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

client.connect();

client.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the  ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));

setTimeout(() => {client.end()},3000);

// query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3] || 5};
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//   })
// }).catch(err => console.error('query error', err.stack));

// // callback
// client.query('SELECT NOW() as now', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//   }
// })
 
// // promise
// client
//   .query('SELECT NOW() as now')
//   .then(res => console.log(res.rows[0]))
//   .catch(e => console.error(e.stack))

//========================

// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['brianc', 'brian.m.carlson@gmail.com']
 
// callback
// client.query(text, values, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//   }
// })
 
// // promise
// client
//   .query(text, values)
//   .then(res => {
//     console.log(res.rows[0])
//     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//   })
//   .catch(e => console.error(e.stack))
 
// // async/await
// try {
//   const res = await client.query(text, values)
//   console.log(res.rows[0])
//   // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
// } catch (err) {
//   console.log(err.stack)
// }

//=============

// const query = {
//   // give the query a unique name
//   name: 'fetch-user',
//   text: 'SELECT * FROM user WHERE id = $1',
//   values: [1],
// }
 
// // callback
// client.query(query, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//   }
// })
 
// // promise
// client
//   .query(query)
//   .then(res => console.log(res.rows[0]))
//   .catch(e => console.error(e.stack))