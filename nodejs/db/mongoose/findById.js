var User = require("./user.js");

function getById(){
    var id = '5a26b5af5953432aac9187e1';
    User.findById(id, function(err, res){
        err ? console.log("Error:", err) : console.log("Res:", res);
    })
}

getById();