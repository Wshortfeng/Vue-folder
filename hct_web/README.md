# Good dishes

> ## 好菜通

 该项目主要是一个好菜通后台管理系统，vue+sass+element搭建完成，技术含量不高。

## 项目架构

```bash

├── index.html
├── main.js #主js
├── static  # 别人的js,css(必须绝对路径)
│   └── ...
├── assets  # 自己写的css
│   └── ...
├── components # 主要放置对应小组件
│   ├── player.vue #视频播放组件
│   └── ...
├── api # 调用api
│   ├── home.js   # 首页
│   ├── alarmsetup.js   # 报警设置
│   ├── camerasetup.js   # 摄像机设置
│   ├── clothcontrolsetup.js  # 布控设置
│   ├── status.js   # 状态查询
│   ├── systemsetup.js  # 系统设置
│   ├── home.js  # 首页
│   └── index.js #主文件
├── utils # 调用工具类
│   ├── filter.js  # 过滤器
│   ├── requset.js  # 封装请求函数
│   ├── server.js  # 服务器地址
│   ├── toaster.js  # 消息
│   └── utils.js #函数
├── views # html
│   ├── views  # 页面
│   └── user #用户相关
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── user.js      # 用户模块
        └── ...
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# install element
npm i element-ui -S

#build less
#npm install less less-loader --save

#install sass
npm install node-sass --save-dev
npm install sass-loader --save-dev
npm install style-loader --save-dev

#install axios
npm install axios

#install qs
npm install qs

#install js-md5
npm install --save js-md5

#install vuex
npm install vuex --save

#install jquery
#npm install jquery --save-dev

#install jquery.nicescroll
#npm install jquery.nicescroll --save

#install babel-polyfill (兼容ie)
# npm install --save-dev babel-polyfill

#install font-awesome(图标库)
#npm install font-awesome --save-dev

#install quill-editor
#npm install vue-quill-editor -S
#npm install vue-quill-editor-upload --save

#npm install uglifyjs-webpack-plugin --save-dev(js代码压缩)
npm install uglifyjs-webpack-plugin --save-dev

#npm install --save nprogress(进度条)
npm install --save nprogress

#npm install vue-video-player -S（视频组件）
npm install vue-video-player -S
```
