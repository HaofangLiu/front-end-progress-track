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
