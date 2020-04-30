var man = {
	name: 'heiying',
	$age: null,              // 特殊的key,防止暴露
	get age(){               // age属性
		if(this.$age == undefined) return new Date().getFullYear() - 1988 
		else return this.$age;
	},
	set age(val){
		val = +val;          //转换为数值
		if(!isNaN(val) && val > 0 && val < 150)  this.$age = +val 
		else throw new Error(`Incorrect val = ${val}`)
	},
	proxy: proxy
}

var proxy = new Proxy(man, {
    get: function(target, property){
        return 35;
    }
});


console.log(proxy.class);

console.log(man.age);        // 29
man.age = 100;         
console.log(man.age);        // 100
man.age = 'abc';             // Incorrect val = NAN