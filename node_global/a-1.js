let name = 'jojo';

function sum(a, b) {
    return a + b;
}
/**
 * 添加属性的方式：方式1和方式2有一样的效果
 **/
//（1）
// exports.str = name;
// exports.fn = sum;

//（2）
// module.exports.str = name;
// module.exports.fn = sum;


/**
 * 直接赋值方式：exports 和 module.exports有区别 ------- 建议不要直接赋值
 **/
// exports = name;
// module.exports = name;


 //（3）
// global.str = name;
// global.fn = sum;
