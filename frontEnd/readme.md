基础模板
----------------
#### 新增页面
在 base 目录下新增 html 时，在 webpack.config (开发&正式环境)配置 entry
```
webpackConfig = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js')
  }
}
```