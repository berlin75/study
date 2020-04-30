var mongoose = require('./db');
var Schema = mongoose.Schema;
var lastMod = require('./lastMod');
var playerSchema = new Schema({name: String});
playerSchema.plugin(lastMod);
var player = mongoose.model('player', playerSchema);
var p1 = new player({name: 'playername'})
p1.save((err, doc) => {
	if(err) return console.log(err);
	console.log(doc)
	// { __v: 0,lastMod: 2017-12-12T08:21:26.889Z,name: 'playername',_id: 5a2f91860e188e73e08c6faa }
})