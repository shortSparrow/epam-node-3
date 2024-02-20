const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");

const writableStream = fs.createWriteStream(
  path.join(__dirname, "nodejs-hw1-ex2.txt")
);

csv()
  .fromFile(path.join(__dirname, "nodejs-hw1-ex1.csv"))
  .subscribe(
    (json) => {
      const output = JSON.stringify(json);
      console.log("output: ", output);
      writableStream.write(output + "\n", "utf8", (err) => {
        if (err) {
          console.log(err);
        }
      });
    },
    (error) => {
      console.log(error);
    },
    () => {
      writableStream.end();
    }
  );
