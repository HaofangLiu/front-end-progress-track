// 写一个方法求给定1485个元素中取33个元素的组合有多少种（大数据处理，小心CPU爆炸）

// 从n个数选k个组合算法。

const arr = [1,2,3,4,5,6,7,8];

// 首先利用数组的长度，模拟出所有可能的组合的二进制，以此遍历（从0～Ng个1）
// 利用按位与的操作来筛选， &1 的结果=0 ｜｜ 1
// 当等于1时，就可以存进数组，当数组有三个时则可以认为筛选出了一组
// 当该二进制数中有三个一时，则可以认为有存在一组筛选出来，就可以存进结果Thanks

const combination = (arrayLength, numberOfrequire,array) => {
    const res = []
    for(let i = 0; i < Math.pow(2,arrayLength); i++){
        let num = 0;
        let tempArr = [];
        for(let j = 0; j < arrayLength;j++){
            if((i >> j) & 1){
                num++;
                tempArr.push(array[j])
            }
        }
        if(numberOfrequire === num){
            res.push(tempArr);
        }
    }
    console.log(res);
}

combination(arr.length, 3, arr);
