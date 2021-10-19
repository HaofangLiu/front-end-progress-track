import * as chai from "chai";
import MyPromise from "../src/promise";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);

const assert = chai.assert;

describe("MyPromise", () => {
  it("是一个类", () => {
    // assert(typeof MyPromise === "function");
    // assert(typeof MyPromise.prototype === "object");
    assert.isFunction(MyPromise);
    assert.isObject(MyPromise.prototype);
  });
  it("MyPromise应该接受一个函数", () => {
    assert.throw(() => {
      // @ts-ignore
      new MyPromise();
    });

    assert.throw(() => {
      // @ts-ignore
      new MyPromise(1);
    });

    assert.throw(() => {
      // @ts-ignore
      new MyPromise(true);
    });
  });
  it("MyPromise应该包含一个then", () => {
    const p1 = new MyPromise(() => {});
    assert.isFunction(p1.then);
  });
  it("MyPromise内部的函数应该立即执行", () => {
    let fn = sinon.fake();
    new MyPromise(fn);
    // @ts-ignore
    assert(fn.called);
  });

  it("new Promise 中接受resolve,reject两个函数", (done) => {
    const p1 = new MyPromise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });

  // 用done来进行异步测试
  it("promise.then(success)会在执行resolve的时候执行", (done) => {
    const success = sinon.fake();
    const p1 = new MyPromise((resolve, reject) => {
      assert.isFalse(success.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      }, 0);
    });
    // @ts-ignore
    p1.then(success, (err) => {
      console.log(err);
    });
  });
  it("promise.then(null,reject)会在执行reject的时候执行", (done) => {
    const fail = sinon.fake();
    const p1 = new MyPromise((resolve, reject) => {
      assert.isFalse(fail.called);
      reject();
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      }, 0);
    });
    // @ts-ignore
    p1.then(sinon.fake(), fail);
  });
  it("then接受onFulfilled和onRejected，都是可选参数，并且必须是函数", () => {
    const promise = new MyPromise(() => {});
    promise.then(false, null);
    assert(1 === 1);
  });
  it("onFulfilled必须在promise完成（fulfilled）后调用，并把promise的值作为它的第一个参数", (done) => {
    const onFulfilled = sinon.fake();
    const onRejected = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(onFulfilled.called);
      resolve(23333);
      setTimeout(() => {
        assert(promise.status === "fulfilled");
        assert.isTrue(onFulfilled.called);
        assert(onFulfilled.calledWith(23333));
        done();
      }, 0);
    });
    promise.then(onFulfilled, onRejected);
  });
  it("resovle只能调用一遍", (done) => {
    const onFulfilled = sinon.fake();
    const onRejected = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      resolve(23333);
      resolve(1);
      setTimeout(() => {
        assert(promise.status === "fulfilled");
        assert.isTrue(onFulfilled.calledOnce);
        done();
      }, 0);
    });
    promise.then(onFulfilled, onRejected);
  });
  it("reject只能调用一遍", (done) => {
    const onFulfilled = sinon.fake();
    const onRejected = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject(23333);
      reject(1);
      setTimeout(() => {
        assert(promise.status === "rejected");
        assert.isTrue(onRejected.calledOnce);
        done();
      }, 0);
    });
    promise.then(onFulfilled, onRejected);
  });
  it("在我的代码执行完成之前，不能调用后面的两个函数-onFulfilled", () => {
    const onFulfilled = sinon.fake();
    const onRejected = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    promise.then(onFulfilled, onRejected);
    assert.isFalse(onFulfilled.calledOnce);
    setTimeout(() => {
      assert.isTrue(onFulfilled.calledOnce);
    }, 0);
  });
  it("在我的代码执行完成之前，不能调用后面的两个函数-onRejected", () => {
    const onFulfilled = sinon.fake();
    const onRejected = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    promise.then(onFulfilled, onRejected);
    assert.isFalse(onRejected.calledOnce);
    setTimeout(() => {
      assert.isTrue(onRejected.calledOnce);
    }, 0);
  });
  it("then在promise中可以多次调用", (done) => {
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    const cbs = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(cbs[0]);
    promise.then(cbs[1]);
    promise.then(cbs[2]);
    setTimeout(() => {
      assert(cbs[0].called);
      assert(cbs[1].called);
      assert(cbs[1].calledAfter(cbs[0]));
      assert(cbs[2].called);
      assert(cbs[2].calledAfter(cbs[1]));
      done();
    }, 0);
  });
  // it("", () => {});
  // it("", () => {});
  // it("", () => {});
  // it("", () => {});
  // it("", () => {})
});
