var User = require("./user.js");

function getByRegex(){
    var whereStr = {'username':{$regex:/m/i}};
    User.find(whereStr, function(err, res){
        err ? console.log("Error:", err) : console.log("Res:", res);
    })
}

getByRegex();