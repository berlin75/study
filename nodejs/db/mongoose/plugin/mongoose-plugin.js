var mongoose = require('./db');
var Schema = mongoose.Schema;
mongoose.plugin(require('./lastMod'));

var game1Schema = new Schema({name: String});
var player1Schema = new Schema({name: String});
// `lastModifiedPlugin` gets attached to both schemas
var game1 = mongoose.model('game1', game1Schema);
var player1 = mongoose.model('player1', player1Schema);

var g1 = new game1({name: 'gamename'})
g1.save((err, doc) => {
	if(err) return console.log(err);
	console.log(doc)  
	// { __v: 0,lastMod: 2017-12-12T08:40:27.503Z,name: 'gamename',_id: 5a2f95fbf85e9f5b20abe54a }91f02 }
})

var p1 = new player1({name: 'playername'})
p1.save((err, doc) => {
	if(err) return console.log(err);
	console.log(doc)  
	// { __v: 0,lastMod: 2017-12-12T08:40:27.533Z,name: 'playername',_id: 5a2f95fbf85e9f5b20abe54b }
})