# `(ง° ͜ʖ°)ง 📦 📦 📦`

# 初始化

## 安装依赖

# 创建新包

# 发布测试包

# 发布正式包

# 模块

## 搜索路径

### webpack + web + commonJS

```javascript
const test = require('test')
// 优先级依然是: browser = browser+mjs > module > browser+cjs > main
```

### webpack + node + ESM/commonJS
```javascript
const test = require('test')
// 优先级依然是: module > main
```

### node + commonJS

```javascript
const test = require('test')
// 只有 main 字段有效。
```

### node + ESM

```javascript
import test from 'test'
// 只有 main 字段有效。
```