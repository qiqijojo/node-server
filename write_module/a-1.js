// 此处解释为何可以给module.exports赋值，而不能给exports赋值

/** 
 * 正确写法
 */
exports.name = "jojo";
module.exports.name = "jojo";
module.exports = "jojo";

/** 
 * 错误写法
 */
// exports = "jojo";
// console.log(module)
// // WQModule {
// //     id: '/Users/jojo/learn-code/node/write_module/a-1.js',
// //     exports: {}
// // }
// console.log(module.exports) // {}
// console.log(exports) // jojo
