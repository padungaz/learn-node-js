require('dotenv').config()
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const mysql = require('mysql2');

const app = express()
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

// config template engine
configViewEngine(app)

// test connection
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'hoidanit'
});

connection.query(
    'select * from Users u',
    function (err, results, fields) {
        console.log("results", results); // results contains rows returned by server
        console.log("fields", fields); // fields contains extra meta data about results, if available
    }
);

// with placeholder
//   connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function(err, results) {
//       console.log(results);
//     }
//   );

// defile router
app.use('/', webRoutes)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})