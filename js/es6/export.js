function Person(x,y){  
    this.x = x;  
    this.y = y;  
}  
  
Person.prototype.toString = function (){  
    return (this.x + "的年龄是" +this.y+"岁");  
}  
export {Person}; 