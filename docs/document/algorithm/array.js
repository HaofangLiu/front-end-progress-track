const arr = [1, 2, 3, 4, 5];

arr.push(6);

console.log(arr.push(6));

console.log(arr.pop());

console.log(arr.shift());
console.log(arr.unshift(0));
console.log(arr.join([',']));
console.log(arr)
console.log(arr.slice(1, 3)); 
console.log(arr.concat(1, 2)); 
console.log(arr)


class Stack {
    constructor(){
        this.item = [];
    }

    push(item) {
        this.item.push(item);
    }

    pop() {
        return this.item.pop();
    }

    peek(){
        return this.item[this.item.length - 1];
    }

    isEmpty() {
        return this.item.length === 0;
    }
    size() {
        return this.item.length;
    }
    clear() {
        this.item = [];
    }
    toString() {
        return this.item.join(',');
    }
    print() {
        console.log(this.toString());
    }
    reverse() {
        this.item.reverse();
    }
    sort(compareFunction) {
        this.item.sort(compareFunction);
    }
    indexOf(item) {
        return this.item.indexOf(item);
    }
}
