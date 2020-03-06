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
