const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.green(content));

const init = async (name) => {
  clear();

  // 打印欢迎页面
  const data = await figlet("cli welcome");
  log(data);
};

module.exports = init;
