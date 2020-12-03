[html] 你有使用过ins标签吗？说说它的用途
[css] css变量和预处理器中的变量有什么不同？
[js] 使用js实现一个并发限制的promise，并保证最多同时运行三个任务

1. ins需要与del标签一同使用，分别表示插入和删除,表现为下划线和删除

2. CSS变量不同于预处理器变量，css变量只能用于属性值

```css
$name:color;
$primary-color:green;
$i:1;
.box{
    #{$name}:$primary-color;
}

.child-#{$i}{
    color:$primary-color;
}
```
但是，换成CSS变量，下面这种用法会抛出不合法的属性名异常
```css
:root{
   --name:color;
   --primary-color:green;
}

.box{
    var(--name):var(--primary-color);
}
```


3. js promise
```javascript
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
});
class Scheduler {
    constructor() {
        this.awaitArr = [];
        this.count = 0;
    }
    async add(promiseCreator) {

        if (this.count >= 2) {
            await new Promise(resolve => {
                this.awaitArr.push(resolve);
            });
        }
        this.count++;
        const res = await promiseCreator();
        this.count--;

        if (this.awaitArr.length) {
            this.awaitArr.shift()();
        }
        return res;
    }
}
const scheduler = new Scheduler()
const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(order))
}
```