#Replace new assets to dist file

```bash
  npm i --save-dev assets-replace-webpack-plugin
```

```bash
  yarn add --dev assets-replace-webpack-plugin
```


***webpack.config.js***
```js
const AssetsReplaceWebpackPlugin = require('assets-replace-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new AssetsReplaceWebpackPlugin([
        'an_abolute_file',
        'an_abolute_file'
    ])
  ]
}
```
before this plugin work,you file may like:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="{path}/static/main.abchash99.css">
</head>
<body>
    <script src="{path}/static/main.abchash99.js"></script>
</body>
</html>
```
if new assets is:
- main.15acb.css
- main.15acb.js

when plugin works done,file will look like:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="{path}/static/main.15acb.css">
</head>
<body>
    <script src="{path}/static/main.15acb.js"></script>
</body>
</html>
```

### Params
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[``](#)**|`{Array}`|``|an array contains absolute file|
