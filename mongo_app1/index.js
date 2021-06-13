const connection = require('./models');
const express = require('express');
const path = require('path');
const expressHandlers = require('express-handlebars');
const usersCtr = require("./controllers/users");


var app = express();

app.use(express.json());

app.set('views', path.join(__dirname, "/views/"));
app.engine("hbs", expressHandlers({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: __dirname + "/views/layouts"
}));


app.set('view engine', "hbs");


app.get('/', function(req, res) {
    res.render("index", {});
});


app.use("/user", usersCtr);

app.listen("3000", function() {
    console.log("Server started");
});