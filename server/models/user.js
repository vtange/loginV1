var mongoose = require("mongoose");

console.log("access user.js")

module.exports = mongoose.model("User", {
    username : String,
    password : String
});