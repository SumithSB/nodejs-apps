const mysqlConnection = require("../../config/database");


module.exports = {
    create: (data, callback) => {
        mysqlConnection.query(`insert into users(firstName,lastName,gender,phone,email,password) values(?,?,?,?,?,?)`, [
                data.firstName,
                data.lastName,
                data.gender,
                data.phone,
                data.email,
                data.password
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },

    getUsers: callback => {
        mysqlConnection.query(
            `select id,firstName,lastName,gender,email,phone from users`, [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getUserById: (id, callback) => {
        mysqlConnection.query(
            `select id,firstName,lastName,gender,email,phone from users where id = ?`, [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    updateUser: (data, callback) => {
        mysqlConnection.query(`update users set firstName=?,lastName=?,gender=?,email=?,password=?,phone=? where id=?`, [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.phone,
                data.id
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },


    deleteUser: (data, callback) => {
        mysqlConnection.query(`delete from users where id=?`, [data.id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },

    userLogin: (email, callback) => {
        mysqlConnection.query(`select * from users where email = ?`, [email],
            (err, results, fields) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0]);
            }
        );

    }


}