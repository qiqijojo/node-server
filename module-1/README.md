### 注意：
- 在这里需要将`server.js`提取出来，不能放在module-1文件夹下，否则`readFile`的时候路径`module-1${path}`就有点问题，页面出不来，提取出来之后就正常了。
```
fs.readFile(`module-1${path}`, (err, data) => {
    if (err) {
        res.writeHead(404);
        res.end('404 not found');
    } else {
        res.end(data);
    }
})
```
- 从github克隆下来后，由于用到了jquery，因此需要手动在module-1目录下安装jquery。
- 运行npm start后，打开浏览器输入`localhost:8080/home.html`或者`localhost:8080/index.html`即可，输入`localhost:8080`会报404 not found，因为域名后面没有path。
