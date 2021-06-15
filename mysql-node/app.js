require("dotenv").config();
const express = require('express');
const userRouter = require("./api/users/userRouter");


var app = express();
app.use(express.json());
app.use("/api/users", userRouter);


app.listen(process.env.PORT, () => {
    console.log("Server up and running on PORT: ", process.env.PORT);
});