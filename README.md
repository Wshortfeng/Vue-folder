# vue项目

#### vue学习
{https://cn.vuejs.org/}

#### 软件架构
```bash
Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

应用层级的状态应该集中到单个 store 对象中。

提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。

异步逻辑都应该封装到 action 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```


#### 安装使用教程

``` bash
# 查看版本
$ npm -v
2.3.0

#升级 npm
cnpm install npm -g

# 最新稳定版
$ cnpm install vue

# 全局安装 vue-cli
$ cnpm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 这里需要进行一些配置，默认回车即可
This will install Vue 2.x version of the template.

For Vue 1.x use: vue init webpack#1.0 my-project

? Project name my-project
? Project description A Vue.js project
? Author runoob <test@runoob.com>
? Vue build standalone
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes

   vue-cli · Generated "my-project".

   To get started:

     cd my-project
     npm install
     npm run dev

   Documentation can be found at https://vuejs-templates.github.io/webpack
进入项目，安装并运行：
$ cd my-project
$ cnpm install
$ cnpm run dev
 DONE  Compiled successfully in 4388ms

> Listening at http://localhost:8080
>npm run build
```
#### vue组件开发
> 1.父子组件传值
``` bash
    1) 父组件向子组件进行传值
    父组件：
    <template>
      <div>
        父组件:
        <input type="text" v-model="name">
        <br>
        <br>
        <!-- 引入子组件 -->
        <child :inputName="name"></child>
      </div>
    </template>
    <script>
      import child from './child'
      export default {
        components: {
          child
        },
        data () {
          return {
            name: ''
          }
        }
      }
    </script>

    子组件：
    <template>
      <div>
        子组件:
        <span>{{inputName}}</span>
      </div>
    </template>
    <script>
      export default {
        // 接受父组件的值
        props: {
          inputName: String,
          required: true
        }
      }
    </script>



     2)子组件向父组件传值
     子组件：
     <template>
      <div>
        子组件:
        <span>{{childValue}}</span>
        <!-- 定义一个子组件传值的方法 -->
        <input type="button" value="点击触发" @click="childClick">
      </div>
    </template>
    <script>
      export default {
        data () {
          return {
            childValue: '我是子组件的数据'
          }
        },
        methods: {
          childClick () {
            // childByValue是在父组件on监听的方法
            // 第二个参数this.childValue是需要传的值
            this.$emit('childByValue', this.childValue)
          }
        }
      }
    </script>

    父组件：
    <template>
      <div>
        父组件:
        <span>{{name}}</span>
        <br>
        <br>
        <!-- 引入子组件 定义一个on的方法监听子组件的状态-->
        <child v-on:childByValue="childByValue"></child>
      </div>
    </template>
    <script>
      import child from './child'
      export default {
        components: {
          child
        },
        data () {
          return {
            name: ''
          }
        },
        methods: {
          childByValue: function (childValue) {
            // childValue就是子组件传过来的值
            this.name = childValue
          }
        }
      }
    </script>
   ```
   > 2.非父子组件传值
   ```bash
   组件A：
      <template>
        <div>
          A组件:
          <span>{{elementValue}}</span>
          <input type="button" value="点击触发" @click="elementByValue">
        </div>
      </template>
      <script>
        // 引入公共的bug，来做为中间传达的工具
        import Bus from './bus.js'
        export default {
          data () {
            return {
              elementValue: 4
            }
          },
          methods: {
            elementByValue: function () {
              Bus.$emit('val', this.elementValue)
            }
          }
        }
      </script>


      组件B：
      <template>
        <div>
          B组件:
          <input type="button" value="点击触发" @click="getData">
          <span>{{name}}</span>
        </div>
      </template>
      <script>
        import Bus from './bus.js'
        export default {
          data () {
            return {
              name: 0
            }
          },
          mounted: function () {
            var vm = this
            // 用$on事件来接收参数
            Bus.$on('val', (data) => {
              console.log(data)
              vm.name = data
            })
          },
          methods: {
            getData: function () {
              this.name++
            }
          }
        }
      </script>
   ```
  #### vue-router路由  https://router.vuejs.org/zh/guide/#html
   > main.js
   ```bash
    import Vue from 'vue'
    import Layout from './components/layout'
    import VueRouter from 'vue-router'
    import VueResource from 'vue-resource'
    import IndexPage from './pages/index'
    import DetailPage from './pages/detail'
    import OrderListPage from './pages/orderList'
    import DetailAnaPage from './pages/detail/analysis'
    import DetailCouPage from './pages/detail/count'
    import DetailForPage from './pages/detail/forecast'
    import DetailPubPage from './pages/detail/publish'
    Vue.use(VueRouter)
    Vue.use(VueResource)
    let router = new VueRouter({
      mode: 'history',
      routes: [
        {
          path: '/',
          component: IndexPage
        },
        {
          path: '/orderList',
          component: OrderListPage
        },
        {
          path: '/detail',
          component: DetailPage,
          redirect: '/detail/analysis',
          children: [
            {
              path: 'analysis',
              component: DetailAnaPage
            },
            {
              path: 'count',
              component: DetailCouPage
            },
            {
              path: 'forecast',
              component: DetailForPage
            },
            {
              path: 'publish',
              component: DetailPubPage
            }
          ]
        }
      ]
    })
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      template: '<Layout/>',
      components: { Layout }
    })
   ```
   >layout.vue
   ```bash
   <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
   ```
    >index.vue
   ```bash
    <div class="index-right">
        <slide-show :slides="slides" :inv="invTime"></slide-show>
        <div class="index-board-list">
          <div
          class="index-board-item"
          v-for="(item, index) in boardList"
          :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
            <div class="index-board-item-inner" >
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div class="index-board-button">
                <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   ```




#### vuex全局状态管理 https://vuex.vuejs.org/zh/
   >State
   ```bash
     1.数据存放的地方

     Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
     const app = new Vue({
      el: '#app',
      // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
      store,
      components: { Counter },
      template: `
        <div class="app">
          <counter></counter>
        </div>
      `
    })
    通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。让我们更新下 Counter 的实现：
    const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count () {
          return this.$store.state.count
        }
      }
    }
   ```

   >Getter
   ```bash
   const store = new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
      },
      getters: {
        doneTodos: state => {
          return state.todos.filter(todo => todo.done)
        }
      }
    })
    # 通过属性访问
    Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：

    store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
    Getter 也可以接受其他 getter 作为第二个参数：

    getters: {
      // ...
      doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
      }
    }
    store.getters.doneTodosCount // -> 1
    我们可以很容易地在任何组件中使用它：

    computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodosCount
      }
    }
   ```

   >Mutation(同步方法)
   ```bash
     更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

      const store = new Vuex.Store({
        state: {
          count: 1
        },
        mutations: {
          increment (state) {
            // 变更状态
            state.count++
          }
        }
      })
      你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

      store.commit('increment')
      # 提交载荷（Payload）
      你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：

      // ...
      mutations: {
        increment (state, n) {
          state.count += n
        }
      }
      store.commit('increment', 10)
      在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

      // ...
      mutations: {
        increment (state, payload) {
          state.count += payload.amount
        }
      }
      store.commit('increment', {
        amount: 10
      })
   ```

   >Action(异步方法)
  ```bash
  Action 类似于 mutation，不同在于：

      Action 提交的是 mutation，而不是直接变更状态。
      Action 可以包含任意异步操作。
      让我们来注册一个简单的 action：

      const store = new Vuex.Store({
        state: {
          count: 0
        },
        mutations: {
          increment (state) {
            state.count++
          }
        },
        actions: {
          increment (context) {
            context.commit('increment')
          }
        }
      })
      Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

      实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：

      actions: {
        increment ({ commit }) {
          commit('increment')
        }
      }
      # 分发 Action
      Action 通过 store.dispatch 方法触发：

      store.dispatch('increment')
      乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：

      actions: {
        incrementAsync ({ commit }) {
          setTimeout(() => {
            commit('increment')
          }, 1000)
        }
      }
      Actions 支持同样的载荷方式和对象方式进行分发：

      // 以载荷形式分发
      store.dispatch('incrementAsync', {
        amount: 10
      })

      // 以对象形式分发
      store.dispatch({
        type: 'incrementAsync',
        amount: 10
      })
      来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 mutation：

      actions: {
        checkout ({ commit, state }, products) {
          // 把当前购物车的物品备份起来
          const savedCartItems = [...state.cart.added]
          // 发出结账请求，然后乐观地清空购物车
          commit(types.CHECKOUT_REQUEST)
          // 购物 API 接受一个成功回调和一个失败回调
          shop.buyProducts(
            products,
            // 成功操作
            () => commit(types.CHECKOUT_SUCCESS),
            // 失败操作
            () => commit(types.CHECKOUT_FAILURE, savedCartItems)
          )
        }
      }
  ```
   >Module
   ```bash
   由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

    为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

    const moduleA = {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }

    const moduleB = {
      state: { ... },
      mutations: { ... },
      actions: { ... }
    }

    const store = new Vuex.Store({
      modules: {
        a: moduleA,
        b: moduleB
      }
    })

    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态
   ```
#### 前后端交互
>utils 工具文件夹
```bash
  config.js
  // 服务器端地址
  export const server = 'http://localhost:3000'


  request.js
   封装请求函数到一个文件内
   import axios from 'axios'
    import {server} from './config'
    /**
    * 向服务器端发送get请求
    * @param {string} url 请求的地址
    * @param {object} payload 配置参数
    * @param {boolean} [isLocal=true] 是否请求的是本地服务
    * @returns Promise
    */
    export function get(url,payload,isLocal=true){
      if(isLocal){
        url = server + url;
      }
      return axios.get(url,payload)
    }

    /**
    * 发送post请求
    * @param {string} url  请求的地址
    * @param {object} data 传递的参数
    * @param {boolean} [isLocal=true]  是否是本地服务器
    * @returns Promise
    */
    export function post(url,data,isLocal=true){
      if(isLocal){
        url = server + url
        console.log(url)
      }
      return axios.post(url,data)
    }

```
>server 请求文件夹
```bash
import { get, post } from '../utils/request';
/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */
export function save(data){
  return post('/api/v1/new/create',data)
}

export function login(data) {
  return post('/api/v1/new/login',data)
}

export function update(name,data) {
  return post(`/api/v1/new/update/${name}`,data)
}

export function getBook(name){
  return get(`/api/v1/new/book/${name}`)
}

export function delBook(data){
  return post('/api/v1/new/delbook',data)
}

```
#### ui组件（element-UI,Mint-ui,vux)


