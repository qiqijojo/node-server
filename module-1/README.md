### 注意：
- 在这里需要将`server.js`提取出来，不能放在module-1文件加下，否则`readFile`的时候路径`module-1${path}`就有点问题，页面出不来，提取出来之后就正常了。
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
