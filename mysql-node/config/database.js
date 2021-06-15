const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true

});


mysqlConnection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.log(err.message);
        console.log("connection failed");
    }
});

module.exports = mysqlConnection;