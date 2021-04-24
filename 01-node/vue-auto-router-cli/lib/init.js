const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const { spawn } = require("child_process");
const log = (content) => console.log(chalk.green(content));
const clone = require("./download");
const open = require("open");

const spawnPromise = async (...args) => {
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    proc.on("close", () => {
      resolve();
    });
  });
};

const init = async (name) => {
  clear();

  // 打印欢迎页面
  const data = await figlet("cli welcome");
  log(data);

  log("创建项目: " + name);
  await clone("github:su37josephxia/vue-template", name);

  log("安装依赖");
  await spawnPromise("cnpm", ["install"], {
    cwd: `./${name}`,
  });

  log(
    chalk.green(`
  ## 安装完成
  To get Start:
  ===========================
  cd ${name}
  npm run server
  ===========================
  `)
  );

  open(`http://localhost:8080`);

  await spawnPromise("npm", ["run", "serve"], {
    cwd: `./${name}`,
  });
};

module.exports = init;
