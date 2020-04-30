var User = require("./user.js");

function del(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.remove(wherestr, function(err, res){
        err ? console.log("Error:" + err) : console.log("Res:" + res);
    })
}

del();