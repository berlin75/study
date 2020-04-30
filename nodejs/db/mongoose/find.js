var User = require("./user.js");

function getByConditions(){
    var whedocstr = {'username' : 'Tracy McGrady'};
    var opt = {"username": 1 ,"_id": 0};

    User.findOne({name: 'lily'}, {name: 1}, (err, doc) => {
        console.log('doc.name', doc, doc.name, doc.toObject().name, doc.toJSON().name, JSON.stringify(doc).name)
        // doc.name { _id: 5a2ce3480cb0825b48d60386, name: 'lily' } undefined lily lily undefined
        console.log('json', JSON.parse(JSON.stringify(doc)).name);
        // json lily
        console.log('toObject', doc.toObject());
        // toObject { _id: 5a2ce3480cb0825b48d60386, name: 'lily' }
        console.log('toJSON', doc.toJSON());
        // toJSON { _id: 5a2ce3480cb0825b48d60386, name: 'lily' }
        console.log('JSON.stringify', JSON.stringify(doc));
        // JSON.stringify {"_id":"5a2ce3480cb0825b48d60386","name":"lily"}
    })

    User.find(whedocstr, opt, function(err, docs){
        if(err) return console.log("Error:", err);
        console.log(docs, docs[0].username);
        // [ { username: 'Tracy McGrady' } ] 'Tracy McGrady'

        var doc = docs[0].toObject();
        doc.isPraise = doc ? 5 : 0;
        console.log('doc5', doc, typeof doc, doc.isPraise, doc.hasOwnProperty('isPraise'));
        // doc5 { username: 'Tracy McGrady', isPraise: 5 } object 5 true

        doc = docs[0].toJSON();
        doc.isPraise = doc ? 5 : 0;
        console.log('doc6', doc, typeof doc, doc.isPraise, doc.hasOwnProperty('isPraise'));
        // doc6 { username: 'Tracy McGrady', isPraise: 5 } object 5 true

        doc = docs[0].toString();
        console.log('doc7', doc, typeof doc);
        // doc7 { username: 'Tracy McGrady' } string
    })

    /* lean将document转成jsobject */
    User.findOne({username: 'Tracy McGrady'}, {username: 1 ,_id: 0}).exec((err, doc) => {
    	doc.isPraise = doc ? 5 : 0;
    	console.log('doc1', doc, doc.isPraise, doc.hasOwnProperty('isPraise')); 
    	// { username: 'Tracy McGrady' } 5 true
    })

    User.findOne({username: 'Tracy McGrady'}, {username: 1 ,_id: 0}, (err, doc) => {
    	doc.isPraise = doc ? 5 : 0;
    	console.log('doc2', doc, doc.isPraise, doc.hasOwnProperty('isPraise')); 
    	// { username: 'Tracy McGrady' } 5 true
    })

    User.findOne({username: 'Tracy McGrady'}, {username: 1 ,_id: 0}).lean().exec((err, doc) => {
    	doc.isPraise = doc ? 5 : 0;
    	console.log('doc3', doc, doc.isPraise, doc.hasOwnProperty('isPraise'));
    	// { username: 'Tracy McGrady', isPraise: 5 } 5 true
    })

    User.findOne({username: 'Tracy McGrady'}, {username: 1 ,_id: 0}, {lean: true}, (err, doc) => {
    	doc.isPraise = doc ? 5 : 0;
    	console.log('doc4', doc, doc.isPraise, doc.hasOwnProperty('isPraise'));
    	// { username: 'Tracy McGrady', isPraise: 5 } 5 true
    })

}

getByConditions();