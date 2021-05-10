const delay = (data, tick) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(data);
  }, tick);
});


module.exports = {
  getName() {
    return delay('jerry', 3000);
  },
  getAge() {
    return 18;
  }
};