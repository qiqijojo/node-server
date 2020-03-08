
// 学习并掌握浏览器和node的event Loop的运行机制，以及对比两者的区别



/*
setTimeout(() => {
    console.log('s1')
}, 0)
console.log('同步1')
Promise.resolve().then(() => {
    console.log('p1')
})
console.log('同步2')
process.nextTick(() => {
    console.log('sss')
})
*/

/*
注意点: 如下代码输出的结果是随机的
        在NodeJS中指定的延迟时间是有一定的误差的, 所以导致了输出结果随机的问题
* */
/*
setTimeout(function () {
    console.log("setTimeout");
}, 0);
setImmediate(function () {
    console.log("setImmediate");
});
 */

const path = require("path");
const fs = require("fs");
// 放在读取文件里面，执行顺序是固定的
/*
    setImmediate
    setTimeout
*/
fs.readFile(path.join(__dirname, "a.js"), function () {
    setTimeout(function () {
        console.log("setTimeout");
    }, 0);
    setImmediate(function () {
        console.log("setImmediate");
    });
});
