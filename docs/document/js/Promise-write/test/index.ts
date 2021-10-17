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
  // it("", () => {

  // })
});
