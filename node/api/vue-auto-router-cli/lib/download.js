const { promisify } = require("util");
const download = require("download-git-repo");
// 下载的动画
const ora = require("ora");
const clone = async (repo, target) => {
  const process = ora(`下载...${repo}`);
};

module.exports = clone;
