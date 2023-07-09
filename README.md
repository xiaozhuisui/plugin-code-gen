### 插件使用指南
npm install @umijs/plugin-code-gen

在umirc 或者 config添加以下配置 并且注释代表详细说明


```
bsCodeGenerate: {
 list: {
    // swaggerURL地址
    url:  'http://mep-api-dev.ur.com.cn/oms-ops/v2/api-docs',
    // locale 中英文菜单那个 后续再研究方案怎么进行增量生成 目前先补上
    locale:  'xxx列表',
    // page下的路径
    filePath:  '/aaa/bbb',
    // 详情路径 比如跳往详情
    routePath:  '/a/b/form',
    // 分页的接口路径
    path:  '/itemSkuRelation',
    // 新增的接口路径 默认是post
    addPath:  '/itemSkuRelation',
    // 编辑的接口路径 默认请求方法是patch 列表页一般不走全量更新的put
    editPath:  '/itemSkuRelation/{id}',
    // 'patch'|'put'
    editMethodName:  'patch',
    // 删除的接口路径 默认请求方法是delete
    deletePath:  '/itemSkuRelation/{ids}',
 },
  // 用来做新增 编辑 提交
  form: {
    // 虽然有些是公共的可以提取 但是为了保持独立性
    url:  'http://mep-api-dev.ur.com.cn/oms-ops/v2/api-docs',
    // 跳回列表后刷新的地址
    routePath:  '/a/b/list',
    //获取单据详情的接口 一般通过主键id获取
    detailPath:  '/itemSkuRelation/{id}',
    // 提交地址 根据restful 规范 一般认为 新增 编辑 就是差个id的区别 与detail做区分
    postPath:  '/itemSkuRelation',
    //生成文件地址
    filePath:  '/a/b',
    locale:'xxx表单'
 },
},
```
