var User = require("./user.js");

User.remove({username : 'test date'}).exec(() => insert())

function insert() {
    var user = new User({
        username : 'test date',                     //用户账号
        userpwd: 'test date',                       //密码
        userage: 35,                                //年龄
        // logindate : new Date()                      //最近登录时间
    });
    console.log(user);
    user.save(function (err, doc){
        err ? console.log("Error:", err) : console.log("Res:", doc);

        console.log(typeof doc.logindate, doc.logindate);  // object 2017-12-13T08:21:23.425Z
        console.time('change')
        var time = toEast8(doc.logindate) 
        console.timeEnd('change')         // 3.383ms
        console.log(typeof time, time);   // object 2017-12-13T16:21:23.425Z

        var plus = doc.logindate + 8*60*60*1000;
        console.log('plus', typeof plus, plus)   //string Wed Dec 13 2017 16:21:23 GMT+0800 (中国标准时间)28800000
    });
}

function toEast8(utc){
    return new Date(new Date(utc).getTime() + 8*60*60*1000)
}