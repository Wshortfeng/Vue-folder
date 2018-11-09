# labelcloud

> 医疗标注云(平台方)

## 项目架构

```bash

├── index.html
├── main.js
├── static  # 别人的js,css(必须绝对路径)
│   └── ...
├── assets  # 自己写的css
│   └── ...
├── components # 主要放置对应小组件
│   ├── XXX.vue
│   └── ...
├── api # 调用api
│   ├── admin  # 标注方
│   └── user.js #用户相关请求
├── utils # 调用工具类
│   └── ...
├── views # html
│   ├── views  # 页面
│   └── user #用户相关
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── user.js      # 用户模块
        └── admin.js     # 管理模块
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
npm install less less-loader --save

#install axios
npm install axios

#install qs
npm install qs

#install js-md5
npm install --save js-md5

#install vuex
npm install vuex --save

#install jquery
npm install jquery --save-dev

#install jquery.nicescroll
npm install jquery.nicescroll --save

#install babel-polyfill (兼容ie)
npm install --save-dev babel-polyfill

#install font-awesome(图标库)
npm install font-awesome --save-dev

#install quill-editor
npm install vue-quill-editor -S
npm install vue-quill-editor-upload --save

#npm install uglifyjs-webpack-plugin --save-dev(js代码压缩)
npm install uglifyjs-webpack-plugin --save-dev
```
