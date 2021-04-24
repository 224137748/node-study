const fs = require("fs");
const { promisify } = require("util");

const data = fs.readFileSync("./config.json");

// fs.readFile("./config.json", (err, data) => {
//   if (err) {
//     throw err;
//     console.log(err);
//   }
//   console.log(data.toString());
// });

const readfile = promisify(fs.readFile);

readfile("./confi2g.json")
  .then((res) => {
    console.log(res.toString());
  })
  .catch((err) => {
    console.log("err -========", err);
  });
