var User = require("./user.js");

function findByIdAndUpdate(){
    var id = '5a266410bbe6d42ad00c3ae6';
    var updatestr = {'userpwd': 'abcd'};
    
    User.findByIdAndUpdate(id, updatestr, function(err, res){
        err ? console.log("Error:", err) : console.log("Res:", res);
    })
}

findByIdAndUpdate();