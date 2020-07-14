# `(ง° ͜ʖ°)ง 📦 📦 📦`

# 初始化
> * 未安装依赖前
```bash
  npm install
```
> * 已经安装过了依赖后
```bash
npm run init
```
> PS: 注意检查deps, 手动增删

# 创建新包
```bash
    npm run create
```
> * 按照提示选择模板，输入package的名称
>
> * 如果开发类库型package，推荐使用rollup模板（但开发有痛点)
>
> * 如果开发复杂业务package，使用webpack模板


# 发布测试包

> 此时你应该是再开发分支，开发完毕后，你可以这样做：
```bash
    git add .
    git commit -m 'add: some feature lib' 
    npm run release:dev
```
> 从npm仓库install该package，并集成进行测试(`非必要，应该在单元测试中保证`)
>
> 验证后，提交mr/pr

# 发布正式包

> maintainers 接受mr/pr后:

```bash
    git pull
    npm run release
```
> 从npm仓库install该package，并集成进行测试(`非必要，应该在单元测试中保证`)

