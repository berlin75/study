var User = require("./user.js");

function update(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'aaaa'};
    
    User.update(wherestr, updatestr, function(err, res){
        err ? console.log("Error:", err) : console.log("Res:", res);
    })
}

update();