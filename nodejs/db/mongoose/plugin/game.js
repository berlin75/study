var mongoose = require('./db');
var Schema = mongoose.Schema;
var lastMod = require('./lastMod');
var gameSchema = new Schema({name: String});
gameSchema.plugin(lastMod, { index: true });
var game = mongoose.model('game', gameSchema);
var g1 = new game({name: 'gamename'})
g1.save((err, doc) => {
	if(err) return console.log(err);
	console.log(doc)  
	// { __v: 0,lastMod: 2017-12-12T08:20:56.939Z,name: 'gamename',_id: 5a2f916816aafe6c7ce91f02 }
})