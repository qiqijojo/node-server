let http = require('http');
let url = require('url');
let querystring = require('querystring');
let fs = require('fs');
let pathModule = require('path');

let user = {
    admin: 123456
}
http.createServer((req, res) => { // 只要浏览器一发请求，就会走这个回调函数
    let path, getData, postData;
    if (req.method === 'GET') {
        let { pathname, query } = url.parse(req.url, true); // 加true，则会一直将query属性的值,将字符串格式转换为对象格式
        path = pathname;
        getData = query;
        completeFunc();
    } else if (req.method === 'POST') {
        path = req.url;
        let arr = [];
        // 注意点：在nodejs中，post请求的参数不能我们不能一次性拿到，必须分批获取
        req.on('data', buffer => { // 这里使用buffer方式获取，也可以用字符串获取
            arr.push(buffer);  // 也可以字符串获取：a += buffer   ----->   username=dd&password=dd，在下面end事件中可以直接querystring.parse即可
        })
        req.on('end', () => {
            postData = querystring.parse(Buffer.concat(arr).toString());
            completeFunc();
        })
    }
    function completeFunc() {
        if (path == '/login') {
            res.writeHead(200, {
                "content-type": "text/plain;charset=utf-8"
            })
            let { username, password } = getData;
            if (!user[username]) {
                res.end(JSON.stringify({
                    code: 1,
                    msg: '用户名不存在'
                }))
            } else if (user[username] != password) {
                res.end(JSON.stringify({
                    code: 1,
                    msg: '密码错误'
                }))
            } else {
                res.end(JSON.stringify({
                    code: 0,
                    msg: '登录成功'
                }))
            }
        } else if (path == '/register') {
            res.writeHead(200, {
                "content-type": "text/plain;charset=utf-8"
            })
            let { username, password } = postData;
            if (user[username]) {
                res.end(JSON.stringify({
                    code: 1,
                    msg: '用户名已存在'
                }))
            } else {
                user[username] = password;
                res.end(JSON.stringify({
                    code: 0,
                    msg: '注册成功'
                }))
            }
        } else {
            // 既不是登陆，又不是注册，那就是访问静态文件，如：localhost:8080/index.html
            let urlPath = pathModule.join(__dirname, path); // get请求path指的就是上面的静态文件index.html
            /*
            1. 注意点：加载其他的资源，不能写utf-8，比如图片，会加载不出来，可在页面输入localhost:8080/image.png查看验证
            2. 如果服务器在响应数据的时候没有指定相应头，那么在有的浏览器上，响应的数据可能无法显示
            * */
            fs.readFile(urlPath, (err, data) => {
                if (err) {
                    // writeHead方法的作用：（1）告诉浏览器返回状态码，成功还是失败；（2）告诉浏览器返回的数据是什么类型的，返回的数据用什么字符集来解析
                    res.writeHead(404, {
                        'content-type': 'text/plain;charset=utf-8'
                    });
                    res.end('页面不存在：404 not found');
                } else {
                    res.writeHead(200, {
                        'content-type': 'text/html;charset=utf-8'
                    })
                    res.end(data);   // end方法的作用：结束本次请求并且返回数据
                }
            })
        }
    }
}).listen(8080);