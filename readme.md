## baseDo

### inspired by [dvajs](https://github.com/dvajs)



- why baseDo?

   前端发展到今天，所有的开发人员达成了基本的共识，那就是数据层和视图层的分离，以react为代表的视图层解决方案以其简洁的api、平滑的学习曲线和庞大的社区支持深入人心，然而以redux为核心的数据层解决方案在实践中仍然存在这样那样的问题：

        - 概念太多，并且概念之间是物理独立的，在不同的文件中。
        - 编辑成本高，完成一个数据操作需要在不同的文件中进行切换。 
        - 抽象出独立的数据模型的成本较高，数据是业务逻辑的核心，因此，在业务开发中，数据模型的快速简洁的建立优先级最高。

   除了解决上面的问题，我们还想更贪婪些:

        - 我们已经深深的爱上了Rxjs
        - 我们觉得像angular2那样以注解的方式暴露api很酷

   因此，我们在redux和redux-observable的上层封装了baseDo,baseDO是所有数据对象的基类，它有同步和异步的数据行为，并且内置了基本的增、删、改、查行为.所有的api都是以注解的方式提供。

- how to use ?

   - tnpm i @ali/basedao
   - 提供的api注解
        - reducer
            这个最容易理解，当我们把每个dao对象理解为数据库中的一个表的时候，reducer就代表这个表所支持的操作，以及对不同操作的不同处理逻辑。
            该注解作用到reducer函数上，reducer函数的写法与一般reducer保持一致。
        - epic
            这个注解理解起来稍微费劲点，因为我们这套解决方案强依赖于rxjs,所以我们使用redux-observable来管理和处理异步逻辑，而其用来处理异步逻辑的基本单位是epic，因此，我们也是引入epic这个基本单元。
            epic的基本理念是：每次action被包装为obserable对象，每个个epic监听特定的异步action，然后再处理异步逻辑，最后返回一个action即可.
        - fetch
            这个注解你可以把它理解为语法糖，不管前端如何发展，去后端取数是个永远也绕不开的话题。因此，我们也对这种需求提出了一个高层次的抽象。
            该注解用在dao对象的属性上，接受一个配置对象，该配置对象的具体要求后面会讲到。
   
```js
import { reducer, epic, store } from '@ali/basedao';
/**
*   age: string
*   name: string
**/
class People {
    @reducer("people_reducer")
    reducer(state, action) { 
        const { type, payload } = action;
        switch(type){
            case 'rename':
                return {
                    ...state,
                    ...payload
                };
            case 'reage':
                return {
                    ...state,
                    ...payload
                };
            default:
                return state;
        }
     }
     /**名称无所谓**/
    @fetch({
        filter_type: '@@pleace_holder@@',
        sucess_action_type: '@@pleace_holder@@',
        error_action_type: '@@pleace_holder@@',
        url: '@@pleace_holder@@',
        isSuccess: response => {
            return response && response.suceess;
        },
        isError: response => {
            return response && response.error;
        },
        result: response => {
            return response && response.body;
        }
    })
    rename:string;
    @epic("people_epic")
    epic(action) { 
        return action$.filter(action => action.type === 'PING')
            .mapTo({ type: 'PONG' });
     }
}


const s = store();


```

- todo list
   - 补充测试用例

- version plan
   - v1 基本功能实现
  