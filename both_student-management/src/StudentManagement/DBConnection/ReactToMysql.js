import mysql from 'mysql'

export default mysql.createConnection({
    host: 'localhost',
    user: 'studentinfo',
    password: 'root',
    database: 'studentmanagement',
  });

  