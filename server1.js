let http = require('http');
let url = require('url');
let querystring = require('querystring');
let fs = require('fs');

let user = {
    admin: 123456
}
http.createServer((req, res) => {
    let path, getData, postData;
    if (req.method == 'GET') {
        let { pathname, query } = url.parse(req.url, true);
        path = pathname;
        getData = query;
        completeFunc();
    } else if (req.method == 'POST') {
        path = req.url;
        let arr = [];
        req.on('data', buffer => {
            arr.push(buffer);
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
            fs.readFile(`module-1${path}`, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('404 not found');
                } else {
                    res.end(data);
                }
            })
        }
    }
}).listen(8080);