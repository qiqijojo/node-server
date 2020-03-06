
// console.log(__dirname); // /Users/jojo/learn-code/node/node_global
// console.log(__filename);// /Users/jojo/learn-code/node/node_global/test.js

/*
setInterval(() => {
    console.log('重复')
}, 1000);

setTimeout(() => {
    console.log('只执行一次')
}, 1000);
*/
/** ================Buffer================= */
// let buf = Buffer.alloc(5);
// let buf = Buffer.from('abc');
// let buf2 = Buffer.from([101, 105, 109]);
// buf.write('abcdef', 2, 1);
// console.log(buf);
// console.log(buf2.toString());

// let buf = Buffer.from('abcdefg');
// let buf1 = buf.slice(2, 4);
// console.log(buf, buf1);


// console.log(Buffer.isEncoding('UTF-8'));
// console.log(Buffer.isEncoding('gbk'));


// console.log(Buffer.isBuffer({}));
// console.log(Buffer.isBuffer(Buffer.alloc(8)));

// console.log(Buffer.byteLength(Buffer.from('abc')));
// console.log(Buffer.from('哈哈哈').length);
// let buf1 = Buffer.from('哈哈哈');
// let buf2 = Buffer.from('aaa');
// let res = Buffer.concat([buf1, buf2]); 
// console.log(res.toString());

/** --------------------------path----------------------- */

// const path = require('path');

// console.log(process.env.PATH);
// console.log(path.isAbsolute('/a/b/c'), path.sep, path.delimiter); // sep：操作系统路径分隔符； delimiter：操作系统环境变量分隔符


// console.log(path.parse('/a/b/c/index.html'));
// let obj = { root: '/',
// dir: '/a/b/c',
// base: 'index.html',
// ext: '.html',
// name: 'index' }
// console.log(path.format(obj));

// console.log(path.join('/a/b', '/index', '../'));
// console.log(path.normalize('/a/b/c////index'));

// console.log(path.relative('/a/b/c/aaa/bbb', '/a/b/ccc/ddd')); // 用于计算相对路径

// console.log(path.resolve('/a/b/c/aaa/bbb', './ccc'))
// console.log(path.resolve('/a/b/c/aaa/bbb', '../ccc'))
// console.log(path.resolve('/a/b/c/aaa/bbb', '/ccc'))


/** ========================fs查看文件状态===================== */

// const fs = require('fs');

/**
console.log(1);
fs.stat(__filename, (err, stats) => { // 成功找到文件夹或者文件，stats才有值
    console.log(3);
    console.log('err:', err)
    console.log('stats:', stats)
    if (stats.isFile()) {
        console.log('找到的这是一个文件'); // __filename：/Users/jojo/learn-code/node/node_global/test.js
    } else if (stats.isDirectory()) {
        console.log('找到的这是一个文件夹'); // /Users/jojo/learn-code/node/
    }
});
console.log(2);
 */

// console.log(fs.statSync(__filename));

/** ========================fs读取文件===================== */

/**
const fs = require('fs');
const path = require('path');

let file = path.resolve(__dirname, 'data.txt');
fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
        console.log('读取文件失败');
    } else {
        console.log(data.toString());
        console.log(data); // 添加utf-8之后和toString一样的效果
    }
})
// console.log(fs.readFileSync(file, 'utf-8'));
*/

/** ========================fs写入文件===================== */

// const fs = require('fs');
// const path = require('path');

// let file = path.resolve(__dirname, 'data.txt');

// // fs.appendFile(file, '你好呀', 'utf-8', (err) => { // 写入文件
// fs.writeFile(file, '你好呀', 'utf-8', (err) => { // 追加写入文件
// // let buf = Buffer.from('abc');
// // fs.writeFile(file, buf, 'utf-8', (err) => {
//     if (err) {
//         console.log('写入文件失败')
//     } else {
//         console.log('写入文件成功');
//     }
// })

// // console.log(fs.writeFileSync(file, '哈哈', 'utf-8')) // undefined：表示写入成功

/** ========================fs读取流（大文件）===================== */
/*
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt'); // 拼接路径
let readStream = fs.createReadStream(file, { encoding: 'utf-8', highWaterMark: 1 }); // 创建一个读取流
// 添加事件监听
readStream.on('open', () => {
    console.log('表示数据流和文件建立关系成功');
})
readStream.on('error', () => {
    console.log('表示数据流和文件建立关系失败');
})
readStream.on('data', () => {
    console.log('表示通过读取流从文件中读取到了数据');
})
readStream.on('close', () => {
    console.log('表示数据流断开了和文件的关系，并且数据已经读取完毕了');
}) */

/** ========================fs写入流（大文件）===================== */

/*
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt'); // 拼接路径
let writeStream = fs.createWriteStream(file, { encoding: 'utf-8' }); // 创建一个写入流
// 添加事件监听
writeStream.on('open', () => {
    console.log('表示数据流和文件建立关系成功');
})
writeStream.on('error', () => {
    console.log('表示数据流和文件建立关系失败');
})
writeStream.on('close', () => {
    console.log('表示数据流断开了和文件的关系');
})
let str = 'www.com是谁';
let index = 0;
let timer = setInterval(() => {
    writeStream.write(str[index]);
    console.log('本次写入了：', str[index]);
    index++;
    if (index === str.length) {
        clearInterval(timer);
        writeStream.end();
    }

}, 1000);
*/

/** ========================fs拷贝文件===================== */
/*
const fs = require('fs');
const path = require('path');

const readPath = path.join(__dirname, 'image.png'); // 拼接读取文件路径
const writePath = path.join(__dirname, 'newImage.png');
let readStream = fs.createReadStream(readPath); // 创建一个读取流，不设置可选参数，默认是64kb
let writeStream = fs.createWriteStream(writePath); // 创建一个写入流

// 监听读取流事件
readStream.on('open', () => {
    console.log('表示数据流和文件建立关系成功');
})
readStream.on('error', () => {
    console.log('表示数据流和文件建立关系失败');
})
readStream.on('data', (data) => {
    console.log('表示通过读取流从文件中读取到了数据');
    writeStream.write(data); // 讲读取成功的数据写入文件
})
readStream.on('close', () => {
    console.log('表示数据流断开了和文件的关系，并且数据已经读取完毕了');
    writeStream.end(); // 读取文件完毕，则关闭写入流
})

// 监听写入流事件
writeStream.on('open', () => {
    console.log('表示数据流和文件建立关系成功');
})
writeStream.on('error', () => {
    console.log('表示数据流和文件建立关系失败');
})
writeStream.on('close', () => {
    console.log('表示数据流断开了和文件的关系');
})
*/

/** ========================pipe拷贝文件===================== */

/*
const fs = require('fs');
const path = require('path');

let readPath = path.resolve(__dirname, 'image.png');
let writePath = path.resolve(__dirname, 'newImage.jpg');
let readStream = fs.createReadStream(readPath);
let writeStream = fs.createWriteStream(writePath);
// 利用读取流的管道方法快速的实现文件拷贝
readStream.pipe(writeStream);
*/


/** ========================目录操作===================== */

// const fs = require('fs');
// const path = require('path');

// 创建目录
/*
const mkPath = path.resolve(__dirname, 'mkdir');
fs.mkdir(mkPath, (err) => {
    if (err) {
        console.log('创建目录失败', err); // 断网的情况下会出现error  或者   创建同名的目录也会报错
    } else {
        console.log('创建目录成功');
    }
}); */

// 删除目录
/*
const deletePath = path.resolve(__dirname, 'mkdir');
fs.rmdir(deletePath, (err) => {
    if (err) {
        console.log('删除目录失败', err); // 断网的情况下会出现error    或者   删除同名的目录也会报错
    } else {
        console.log('删除目录成功');
    }
});
*/

// 读取目录
// fs.readdir(__dirname, (err, files) => {
//     if (err) {
//         console.log('读取目录失败', err); // 断网的情况下会出现error
//     } else {
//         // console.log('读取目录成功', files);
//         files.map(item => {
//             let filePath = path.resolve(__dirname, item);

//             /*

//             // （1）异步获取文件状态，文件顺序会一致
//             fs.stat(filePath, (err, fileObj) => {
//                 if (fileObj.isFile()) {
//                     console.log('这是一个文件', item);
//                 } else if (fileObj.isDirectory()) {
//                     console.log('这是一个文件夹', item);
//                 }
//             }); */

//             /*

//             // （2）同步获取文件状态，文件顺序一致
//             let stats = fs.statSync(filePath);
//             if (stats.isFile()) {
//                 console.log('这是一个文件', item);
//             } else if (stats.isDirectory()) {
//                 console.log('这是一个文件夹', item);
//             } */
//         })
//     }
// });