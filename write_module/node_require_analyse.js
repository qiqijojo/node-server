// node - 官方模块加载流程分析：例：require('./a-1.js');

this.require(path) // this:Module    path: '/a-2.js'

// Module.require方法内部实现：去加载模块 Module._load(path)


// Module._load(path, this) 做了两件事
// （1）将path转换为绝对路径
// （2）Module._cache(绝对路径): 查看有无缓存
// 有缓存，取缓存中的exports，
// 无缓存，创建一个module对象 let module = new Module(绝对路径, this)，并缓存起来 Module._cache[绝对路径] = module;

function Module(id, parent) { // parent就是this
    this.id = id; // 绝对路径
    this.exports = {}; // 将来要暴露出去的对象
}

/**----------------------------tryModuleLoad方法------------------------------------ */
// 用tryModuleLoad方法去尝试加载模块，
// （1）获取绝对路径的扩展名
// （2）根据不同后缀查找不同方法并执行对应的方法，来加载模块,做了以下事
// 加载模块：1. 先读取文件 2. js文件需要编译，调用Module._compile(content) ，接着 __compole调用了 Module.wrap(content)方法



/**-----------------------_compile方法-------------------------------- */
var wrapper = Module.wrap(content) // 做了以下事

NativeModule.wrap = function(content) {
    return NativeModule.wrapper[0] + content + NativeModule.wrapper[1];
}
NativeModule.wrapper = [
    '(function(exports, require, module, __filename, __dirname) {',
    '/n});'
];

// 包裹完成后，执行包裹后的代码，拿到执行结果(String ---> Function)
var compileWrapper = vm.runInThisContext(wrapper); // 仅仅是匿名函数，并没有执行

var args = [this.exports, require, this, filename, dirname]
var result = compileWrapper.call(this.exports, args); // 调用call（新版本）  和  apply（老版本）意思都是执行compileWapper这个函数
return result;

/**-----------------------_compile方法-------------------------------- */

/**--------------------------------tryModuleLoad方法------------------------------------ */

