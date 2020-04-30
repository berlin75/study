function Hello(){
	var name;
	this.setname = function(thyname){
		name = thyname;
	};
	this.sayhello = function(){
		console.log('hello ' + name);
	}
}
module.exports = Hello;