const mysql = require('mysql');
const express = require('express');

var app = express();

app.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    database: "sumith",
    multipleStatements: true

});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.log("connection failed");
    }
});

app.listen(3000);