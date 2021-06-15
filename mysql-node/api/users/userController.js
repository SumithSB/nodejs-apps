const { create, getUserById, getUsers, updateUser, deleteUser, userLogin } = require("./userService");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require('jsonwebtoken');
const userService = require("./userService");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    result: {
                        message: "Database connection error!"
                    },
                    status: "FAILURE"
                });
            }
            return res.status(201).json({
                result: {
                    message: "User created successfully!",
                    data: results
                },
                status: "SUCCESS"
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {

                return res.status(404).json({
                    result: {
                        message: "User not found"
                    },
                    status: "FAILURE"
                });
            }

            return res.status(200).json({
                result: {
                    message: "User found successfully!",
                    data: results[0]
                },
                status: "SUCCESS"
            });
        });

    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                result: {
                    message: "Users list found",
                    data: results
                },
                status: "SUCCESS"
            });
        });
    },


    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                res.status(400).json({
                    result: {
                        message: "Failed to update user"
                    },
                    status: "FAILURE"
                });
            }
            return res.status(200).json({
                result: {
                    message: "User details updated successfully"
                },
                status: "SUCCESS"
            });
        });
    },


    deleteUser: (req, res) => {
        const data = res.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    result: {
                        message: "User not found"
                    },
                    status: "FAILURE"
                });
            }
            return res.res.status(200).json({
                result: {
                    message: "User deleted successfully"
                },
                status: "SUCCESS"
            });

        });
    },

    userLogin: (req, res) => {
        const body = req.body;
        userLogin(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    result: {
                        message: "Invalid email or password"
                    },
                    status: "FAILURE"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jwt = sign({ result: results }, "mysecretkeyman", { expiresIn: "1h" });
                return res.status(200).json({
                    result: jwt,
                    status: "SUCCESS"
                });
            } else {
                return res.status(200).json({
                    result: "Invalid email or password",
                    status: "FAILURE"
                });
            }
        });

    }

}