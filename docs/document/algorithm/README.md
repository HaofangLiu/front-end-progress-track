# 算法

## 时间复杂度与空间复杂度
大O表示法： 一种度量来计算算法的效率， 一般来说按最复杂的情况来判断它的量级

### 时间复杂度
我们用时间复杂度衡量算法的性能是否高效

通过一下步骤来计算时间复杂度
- 计算程序中每条语句的执行次数， 并相加， 得到语句的总执行次数， 即语句频度或时间频度， 记为T(n)
- 用常数1取代T(n)中的所有加法常数
- 只保留T(n)中的最高阶项
- 如果最高阶项存在且不是1， 则去除与这个项相乘的常数

常见的时间复杂度
- O(1) 常数阶
- O(logn) 对数阶
- O(n) 线性阶
- O(nlogn) 线性对数阶
- O(n^2) 平方阶
- O(n^3) 立方阶
- O(2^n) 指数阶
- O(n!) 阶乘阶

按照时间复杂度从小到大的顺序排列
O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(n^3) < O(2^n) < O(n!)



933 最近请求次数  队列
349 两个数组的交集 SET
237 删除链表中的节点 链表没有prev 考虑从given node 入手
206 反转链表 引入null节点
144 二叉树的前序遍历 递归
141 环形链表 双指针
83 删除排序链表中的重复元素 暴力
20 有效的括号 map + stack
76 最小覆盖子串 滑窗+map
3 无重复字符的最长子串 map
1 两数之和 map
104 二叉树的最大深度 dfs
102 二叉树的层次遍历 bfs
94 二叉树的中序遍历  递归或者栈
112 路径总和 I bfs
112 路径总和 II bfs
215 数组中的第K个最大元素 最小堆


深度优先遍历dfs：尽可能深的搜索树的分支 （根->children->根->children...）
广度优先遍历bfs：尽可能广的搜索树的分支  利用队列(根压入队列 -> 队头出队并访问 -> 队头的children压入队列 -> 队头的children出队并访问 -> 队头的children的children压入队列 -> 队头的children的children出队并访问...)


js堆
用数组广度优先遍历排列所有节点
左侧节点位置是2n+1
右侧节点位置是2n+2
父节点位置是Math.floor((n-1)/2)

最小堆 
class MinHeap {
    constructor() {
        this.heap = [];
    }
    size() {
        return this.heap.length;
    }
    peek() {
        return this.heap[0];
    }
    swap(i1, i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2]
        this.heap[i2] = temp
    }
    getParent(index) {
        return Math.floor((index - 1) / 2)
    }
    shiftUp(index) {
        if (index === 0) return
        const parentIndex = this.getParent(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index)
            this.shiftUp(parentIndex)
        }
    }
    insert(val) {
        this.heap.push(val);
        this.shiftUp(this.heap.length - 1)
    }
    getLeft(index) {
        return index * 2 + 1
    }
    getRight(index) {
        return index * 2 + 2
    }
    shiftDown(index) {
        const left = this.getLeft(index);
        const right = this.getRight(index);
        if (this.heap[index] > this.heap[left]) {
            this.swap(index, left);
            this.shiftDown(left)
        }
        if (this.heap[index] > this.heap[right]) {
            this.swap(index, right);
            this.shiftDown(right)
        }
    }
    removeTop() {
        this.heap[0] = this.heap.pop();
        this.shiftDown(0)
    }
}
最大堆
