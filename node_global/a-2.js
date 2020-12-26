const a1Module = require('./a-1');

// exports导出方式
// console.log(a1Module);
// console.log(a1Module.str);
// console.log(a1Module.fn(2, 3));

// global导出的获取方式
// console.log(str);
// console.log(fn(1, 2));


/**
 * 直接赋值方式：exports 和 module.exports有区别
 * console.log(a1Module);
 */
console.log(a1Module);
/**
 * exports = name; 
 * {}
 */
/**
 * module.exports = name; 
 * jojo
 */
function A() {
    this.a = 1
}
A.prototype.b = function() {
    console.log('this-b', this) // A { a: 1 }
    return 3 + this.a // 4可以拿到this
}
A.c = function() {
    console.log('this-c', this) // [Function: A] { c: [Function (anonymous)] }
    return 5 + this.a // NaN 因为拿不到this.a
}
var AA = new A()
console.log(A) // [Function: A]
console.log(AA) // { c: [Function (anonymous)] }
console.log('调用b', AA.b()) // 仅实例可调用
// console.log('调用b', A.b()) // 构造函数自己调用不了
// console.log('调用c', AA.c()) // 实例调用不了
console.log('调用c', A.c()) // 仅构造函数自己调用
