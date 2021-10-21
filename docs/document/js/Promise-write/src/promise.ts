const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  status = PENDING;
  callbacks = [];

  constructor(excutor) {
    if (typeof excutor === "function") {
      excutor(this.resolve, this.reject);
    } else {
      throw new Error("only accept function");
    }
  }

  resolve = (result) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        typeof handle[0] === "function" && handle[0](result);
      });
    }, 0);
  };

  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        typeof handle[1] === "function" && handle[1](reason);
      });
    }, 0);
  };

  then(onFulfilled?, onRejected?) {
    const handle = [];

    if (typeof onFulfilled === "function") {
      handle[0] = onFulfilled;
    }
    if (typeof onRejected === "function") {
      handle[1] = onRejected;
    }
    if (typeof onFulfilled === "function" || typeof onRejected === "function") {
      handle[2] = new MyPromise(() => {});
    }
    this.callbacks.push(handle);
    return handle[2];
  }

  resolveWith(x) {}
}

export default MyPromise;
