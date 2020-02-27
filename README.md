## 项目结构
```
|-- dist                // 打包文件
|-- node_module         // 项目依赖包
|-- public              // 静态资源入口
|-- src                 // 源代码
|   |-- api             // 网络请求api
|   |-- assets          // 图片等静态资源
|   |-- components      // 公共组件
|   |-- config          // 公共配置
|   |-- http            // 网络请求
|   |-- mixins          // vue公共mixin
|   |-- mock            // 数据模拟
|   |-- page            // 基础布局
|   |-- router          // 路由 vue-router
|   |-- store           // 数据管理 vuex
|   |-- styles          // 公共样式
|   |-- util            // 公共方法
|   |-- views           // view业务页面
|   |-- App.vue         // vue入口页面
|   |-- log.js          // 全局错误捕获
|   |-- main.js         // vue入口
|   |-- permission.js   // 全局权限
|-- .gitignore          // git 忽略项
|-- babel.config.js     // babel-loader 配置
|-- vue.config.js       // vue-cli@3.0+ 配置文件 详见：https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
```

## 运行
```
克隆项目
git clone https://github.com/NaturalWind/vue-admin-day.git

进入项目目录
cd vue-admin-day

安装依赖
npm install

运行项目
npm run dev
```