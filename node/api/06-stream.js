const fs = require("fs");

const rds = fs.createReadStream("./1.png");
const wrs = fs.createWriteStream("./2.png");

rds.pipe(wrs);
