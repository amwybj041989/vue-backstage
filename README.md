# vue-backstage

> 一个基于vue2.0的后台demo

## 技术栈:
> * vue: "^2.2.2"
> * vue-router: "^2.2.0"
> * vue-amap: "^0.1.4"
> * element-ui: "^1.2.3"
> * vuex: "^2.2.1"
> * echarts: "^3.4.0"
> * axios: "^0.15.3"
> * react-cookie: "^1.0.4"
> * scss

## 关键命令

``` bash
# 加载模块
npm install

# 运行测试环境，已配置热更新
npm run dev

# 打包用于生产环境
npm run build

# 打包生产并查看软件包分析器报告
npm run build --report

# 运行单元测试
npm run unit

# 运行e2e测试
npm run e2e

# 运行所有测试
npm test
```

## 个人拙见
> 我发现vuex对于表单字段的双向绑定的实现实在太麻烦，太啰嗦，尤其是对我编辑一个表单的应用场景时，所以编辑表单组件我都准备采用组件内部状态，没有按照『Vuex 的思维』去执行
