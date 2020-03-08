/* ------------------通过理解官方require加载模块的流程，自己也按照流程写了一个wqRequire，感觉也是可以共用了-_- 嘻嘻嘻----------------------- */

const path = require('path');
const fs = require('fs');
const vm = require('vm');


class WQModule {
    constructor(id) {
        this.id = id;
        this.exports = {};
    }
}
WQModule._cache = {};
WQModule._tryModuleLoad = (module) => {
    // 6. 根据扩展类型执行相应的函数
    let extName = path.extname(module.id);
    WQModule._extensions[extName](module);
}
WQModule._extensions = {
    '.js': (module) => {
        // 1. 读取js代码
        let content = fs.readFileSync(module.id);

        // 2. 将js代码包裹到函数中
            /*
             * strScript
                '(function(exports, require, module, __filename, __dirname) {
                    exports.name = "jojo";
                \n});'
            */
        let strScript = wrapper[0] + content +wrapper[1];

        // 3. 将字符串转换为js代码
        let jsScript = vm.runInThisContext(strScript);

        // 4. 执行转换之后的js代码
        // （1）如果所引入的文件是以module.exports导出的，则需要传module，如下：
        jsScript.call(module.exports, module.exports, wqRequire, module); // 第一个参数则是改变函数的this指向，后面的参数是为了函数运行而传的：function(exports, require, module, __filename, __dirname)

        // （2）如果所引入的文件是以exports方式导出的，则只需要传前两个参数，如下：
        // jsScript.call(module, module.exports);
    },
    '.json': (module) => {
        // 读取文件
        let content = fs.readFileSync(module.id);
        module.exports = JSON.parse(content);
    }
};
let wrapper = [
    '(function(exports, require, module, __filename, __dirname) {',
    '\n});'
];
function wqRequire(filePath) {
    // 1. 将传入的相对路径转换为绝对路径
    let absPath = path.join(__dirname, filePath);
    // 2. 尝试从缓存中获取模块
    if (WQModule._cache[absPath]) {
        return WQModule._cache[absPath].exports;
    } else { 3. // 如果没有缓存，就自己创建一个module对象
        let module = new WQModule(absPath);
        WQModule._cache[absPath] = module;

        // 4. 加载模块
        WQModule._tryModuleLoad(module);
        // 5. 返回模块的exports
        return module.exports;
    }
}
let mySelfModule = wqRequire('./a-1.js');
console.log(mySelfModule);




// 总结：
/**
 * （1）将其模块路径join为绝对路径
 * （2）以绝对路径作为缓存的key，查找缓存里是否存在词key，存在：则结束，直接取缓存里的exports；不存在：则继续往下（3）
 * （3）提前定义好Module类，然后以当前绝对路径作为key创建一个缓存（为了后面其他文件引入相同的模块的时候，也要执行步骤2）
 * （4）获取当前模块的扩展名，以扩展名来决定执行相应的函数.（.json: 看（5）；.js: 看（6））
 * （5）当前模块为json对象格式，则只需使用fs读取该文件内容，然后将JSON.parse(content)赋值给module.exports即可完成，简单。如：module.exports = JSON.parse(content);
 * （6）当前模块为js文件，则也需要使用fs读取该文件内容，并将内容作为函数体包裹在一个匿名函数内，是以字符串拼接而成，因此，此时是一个字符串；
 * （7）将字符串代码使用vm进行转换为js代码，此时是一个匿名函数；
 * （8）然后执行该匿名函数，使用call()运行，并且传参即可；
 * （9）最后直接在require中return module.exports即可，require最后的结果就是文件相应的值了。
 */

 // 通过学习这个的收获：
 /**
  * （1）让我敢于写一个class了，知道怎么用了
  * （2）明白了call()、apply()、bind()的用法及作用
  * （3）理解了匿名函数是需要通过（2）里面的方法调用才能执行
  * （4）深入理解了require一个模块的流程，明白了是如何把一个模块里面的内容获取到的。
  */