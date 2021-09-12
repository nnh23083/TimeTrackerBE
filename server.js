const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { urlencoded, json } = require('body-parser');
app.use(urlencoded({ extended: true }));
app.use(json());

require('./src/routes/users')(app);

// mysql
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TimeTrackerDB'
});
db.connect((err) => {
    if (!!err) throw err;
    console.log('Connected to db. ');
});

//start port
app.listen('8081', (err) => {
    if (!!err) throw err;
    console.log('Server started. ');
});