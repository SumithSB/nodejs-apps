const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userModel = mongoose.model('users');


router.get("/add", function(req, res) {
    res.render("addUser");
});


router.post("/add", function(req, res) {

    var user = new userModel();
    user.name = req.body.name;
    user.age = req.body.age;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.save(function(err, doc) {
        if (!err) {
            res.redirect("/user/list");
            // res.status(200);
            // res.send({
            //     result: doc,
            //     status: "Success"
            // });
        } else {
            res.send("Error occurred");
        }
    });
});


router.get("/list", function(req, res) {
    userModel.find(function(err, docs) {
        if (!err) {

            // res.render("list", { data: docs });
            res.status(200).send({
                result: docs,
                status: "Success"
            });
        } else {
            res.send("Error");
        }
    }).lean();

});


module.exports = router;