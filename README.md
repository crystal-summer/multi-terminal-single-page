# multi-terminal-single-page

## 多端单页面应用
多端单页面应用，遵循一个页面一个端原则创建文件夹和文件，创建文件的规则写在配置文件夹config里。
* 在config/fileName文件 新增一个文件名(相当于新建一个页面文件)
* 在根目录创建进程文件，规定当前进程对象(eg:.env.gov .env.govDev)
* 在package.json 文件创建script脚本命令，包括启动命令和打包命令 (eg:"vue-cli-service serve --mode govDev“)
* 在config/template创建模板文件
* 运行npm run create 或者node ./index.js，新建的文件夹和文件即生成

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run govDev // 政务端运行
npm run entDev // 企业端运行
npm run h5Dev // 移动端运行
```
政务端页面：http://localhost:9601/gov.html#/login
企业端页面：http://localhost:9602/ent.html#/login
移动端页面：http://localhost:9603/h5.html#/login

### Compiles and minifies for production
```
npm run gov // 政务端打包
npm run ent // 企业端打包
npm run h5 // 移动端打包
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
