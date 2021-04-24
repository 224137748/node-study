module.exports = function (req) {
  return new Promise((resolve, reject) => {
    let data = [];
    let size = 0;
    req.on("data", (stream) => {
      data.push(stream);
      size += stream.length;
    });
    req.on("end", () => {
      data = Buffer.concat(data, size);
      resolve(data.toString());
    });
  });
};
