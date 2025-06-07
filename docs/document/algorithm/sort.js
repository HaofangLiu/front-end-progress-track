//recursion
console.log("aaa");
const fabonacii = () => {
  const fib = (n) => {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  };

  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(fib(i));
  }

  return result;
};

const swap = (array, a, b) => {
  let temp = array[b];
  array[b] = array[a];
  array[a] = temp;
};

const sample_data = [3, 5, 8, 4, 2, 6, 7, 1, 9];

const bubbleSort = (arr) => {
  const length = arr.length;
  if (!length) return arr;

  for (let i = 1; i < length; i++) {
    let hasSort = true;
    for (let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        hasSort = false;
      }
    }
    if (hasSort) {
      break;
    }
  }

  return arr;
};

const bubbleSort2 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

// console.log(bubbleSort(sample_data));
// console.log(bubbleSort2(sample_data));

//selection sort
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndec = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndec]) {
        minIndec = j;
      }
    }
    if (i !== minIndec) {
      swap(arr, i, minIndec);
    }
  }

  return arr;
};

// console.log(selectionSort(sample_data));
// console.log(bubbleSort2(sample_data));
[3,6,1,8]
const insertionSort = (arr) => {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j ] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j+1] = current
  }
};
