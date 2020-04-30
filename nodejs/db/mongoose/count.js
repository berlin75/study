var User = require("./user.js");

function getCountByConditions(){
    var wherestr = {};
    User.count(wherestr, function(err, res){
        err ? console.log("Error:", err) : console.log("Res:", res);
    })
}
getCountByConditions();