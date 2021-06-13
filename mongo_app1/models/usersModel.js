var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Required"
    },
    age: {
        type: String,
        required: "Required"
    },
    phone: {
        type: String,
        required: "Required"
    },
    email: {
        type: String,
        required: "Required"
    }
});

mongoose.model("users", userSchema);