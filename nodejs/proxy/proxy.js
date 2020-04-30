var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

// console.log(require('util').inspect(fproxy, true));
console.log(fproxy(1, 2));                             // 1
console.log(new fproxy(1, 2));                         // {value: 2}
console.log(fproxy.prototype === Object.prototype);    // true
console.log(fproxy.foo === "Hello, foo");              // true


var proxy1 = new Proxy({}, {
    get: function(target, property) { 
        return 35;
    }
});
console.log(proxy1.time)   // 35
console.log(proxy1.name)   // 35
console.log(proxy1.title)  // 35
console.log(require('util').inspect(proxy1, true));


var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
console.log(target.a)         // b

let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo          // "GET foo"
