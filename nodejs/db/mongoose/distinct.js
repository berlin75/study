var User = require("./user.js");

function distinct(){
    var wherestr = {};
    var feild = {"username": 1};
    User.distinct("username", wherestr, function(err, res){
        err ? console.log("Error:", err) : console.log("Res:", res);
    })
}

distinct();