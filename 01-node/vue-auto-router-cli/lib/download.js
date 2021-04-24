const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
// 下载的动画
const ora = require("ora");
const clone = async (repo, target) => {
  const process = ora(`下载...${repo}`);
  process.start();
  await download(repo, target);
  process.succeed();
};

module.exports = clone;
