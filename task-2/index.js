const EventEmitter = require("../task-1/eventEmitter");

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    const callback = (data) => {
      this.emit("data", data);
    };
    asyncFunc(...args, callback).then(() => {
      this.emit("end");
    });
  }
}

const fetchFromUrl = (url, cb) => {
  return fetch(url)
    .then((data) => data.json())
    .then((value) => cb(value));
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("data", (data) => console.log("Data: ", data));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
