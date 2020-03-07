
// 字符串代码执行

/**   ============eval  和  new Function方式================= */


/**
 * (1)
 * eval：存在依赖关系，可以访问到外界数据，不安全
 */
// let name = 'jojo';
// let str = "console.log(name)";
// eval(str); // jojo


/**
 * (2)
 * new Function：可访问外部数据，不安全
 */
// global.name = 'jojo'; // 在浏览器访问不行；在node中测试是可以访问的，不安全
// let name = 'jojo'; // 在node中访问不到；在浏览器中测试是可以访问的，不安全
// let str = "console.log(name)";
// let str = "console.log('aa')";
// let fn = new Function(str); // 利用构造函数，str已经被作为函数体放进function里了
// fn()


// 由于eval和newFunction执行字符串代码都不是很安全，因此有了以下的方式。

/**   ===================vm虚拟机======================= */

const vm = require('vm');


/**
 * (1)
 * runInThisContext：提供了一个安全的环境给我们执行字符串中的代码
 * runInThisContext提供的环境不能访问本地的变量，但能访问全局的变量（也就是global上的变量）
 */
// let name = 'jojo';
// let str = "console.log(name)";
// vm.runInThisContext(str); // name is not defined

// global.name = 'jojo';
// let str = "console.log(name)";
// vm.runInThisContext(str); // jojo


/**
 * (2)
 * runInNewContext：提供了一个安全的环境给我们执行字符串中的代码
 * runInNewContext提供的环境不能访问本地的变量，也不能访问全局的变量（也就是global上的变量）
 */
let name = 'jojo';
let str = "console.log(name)";
vm.runInNewContext(str); // name is not defined

// global.name = 'jojo';
// let str = "console.log(name)";
// vm.runInNewContext(str); // name is not defined
