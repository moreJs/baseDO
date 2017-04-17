### baseDo

- 背景

   我们在基于 redux 和 redux-observable 做数据层解决方案的时候，面临最大的问题是，代码和逻辑分离，我们通常会写多个reducer和epic，然后在不同的js文件中进行切换，整个逻辑不连贯，很容易被打断。

- 意义

   因此，我们提出了 baseDO 的概念，baseDO对象整合 action 和 reducer 和 epic ，使得我们对单个数据对象的逻辑可以进行内聚。同时提供一些基本的增、删、改、查等常用接口.

- how to use ?

   - tnpm i @ali/basedao
   - 主要提供 reducer 和 epic 两个注解。开发者只需要将数据对象中的reducer 和 epic 进行相应的注解即可，reducer 和 epic 写法和以前保持一致。通过 store 方法即可获取 store 对象

```js
import { reducer, epic, store } from '@ali/basedao';

class T1{
    @reducer("r1")
    r1() { console.log("r1") }
    @epic("e1")
    e1() { console.log("e1") }
}

class T2{
    @reducer("r2")
    r2() {
        console.log("r1");
    }
    @epic("e2")
    e2() {
        console.log("e2");
    }
}

const a = store();


```

- todo list
   - 补充测试用例

- version plan
   - v1 基本功能实现
  