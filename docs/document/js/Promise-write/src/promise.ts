const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  status = PENDING;
  success = null;
  fail = null;

  constructor(excutor) {
    if (typeof excutor === "function") {
      excutor(this.resolve, this.reject);
    } else {
      throw new Error("only accept function");
    }
  }

  resolve = () => {
    setTimeout(() => {
      this.success();
    }, 0);
  };

  reject = () => {
    setTimeout(() => {
      this.fail();
    }, 0);
  };

  then(success, fail) {
    this.success = success;
    this.fail = fail;
  }
}

export default MyPromise;
