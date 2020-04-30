var util = require('util'); 
function Base() { 
    this.name = 'base'; 
    this.sayHello = () => console.log('Hello ' + this.name); 
} 
Base.prototype.age = 18;
Base.prototype.showName = function() { 
    console.log(this.name);
}; 
function Sub() { 
    this.name = 'sub'; 
} 
util.inherits(Sub, Base); 
var objBase = new Base(); 
objBase.showName();        // base
objBase.sayHello();        // Hello base
console.log(objBase);      // Base { name: 'base', sayHello: [Function] }
var objSub = new Sub(); 
objSub.showName();          // sub
console.log(objSub.age);    // 18
console.log(objSub);        // Sub { name: 'sub' }
objSub.sayHello();          // TypeError